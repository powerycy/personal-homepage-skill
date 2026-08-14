import { useEffect, useState } from 'react'

declare global {
  interface Window {
    __HERO_EXPORTED_EDITS__?: Record<string, string>
  }
}

type EditorTexts = {
  edit: string; editing: string; saved: string; export: string; reset: string
  resetConfirm: string
  placeholderWarning: (count: number) => string
  linkLabel: string; imageLabel: string; save: string; cancel: string
  resourceBanner: string
}

const ZH_TEXTS: EditorTexts = {
  edit: '编辑', editing: '编辑中', saved: '已保存', export: '导出 HTML', reset: '恢复初始',
  resetConfirm: '把所有可编辑文案恢复为初始内容？当前修改将被清除。',
  placeholderWarning: (count) => `还有 ${count} 处占位文案未修改，仍要导出吗？`,
  linkLabel: '链接地址', imageLabel: '图片地址', save: '保存', cancel: '取消',
  resourceBanner: '部分样式或图片资源未能加载，页面可能与预期不同。'
}

const EN_TEXTS: EditorTexts = {
  edit: 'Edit', editing: 'Editing', saved: 'Saved', export: 'Export HTML', reset: 'Reset',
  resetConfirm: 'Restore all editable text to its initial content? Current edits will be discarded.',
  placeholderWarning: (count) => `${count} placeholder texts are still unedited. Export anyway?`,
  linkLabel: 'Link URL', imageLabel: 'Image URL', save: 'Save', cancel: 'Cancel',
  resourceBanner: 'Some styles or images failed to load; the page may look different.'
}

function resolveTexts(): EditorTexts {
  return /^zh/i.test(document.documentElement.lang || 'zh') ? ZH_TEXTS : EN_TEXTS
}

function textNodes(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-edit-id]'))
    .filter((node) => node.tagName !== 'A' && node.tagName !== 'IMG')
}

function attrNodes(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>('a[data-edit-id], img[data-edit-id]'))
}

function attrKey(node: HTMLElement, attribute: string) {
  return `@attr:${node.dataset.editId}:${attribute}`
}

function readStorage(key: string) {
  try {
    return JSON.parse(localStorage.getItem(key) || '{}') as Record<string, string>
  } catch {
    return {}
  }
}

// Whitelist sanitizer: keeps basic inline formatting, unwraps everything else,
// and strips every attribute except safe href values. Prevents pasted markup
// (Word, web pages, editors) and script-carrying payloads from breaking the page.
function sanitizeHtml(html: string) {
  const ALLOWED = new Set(['B', 'STRONG', 'I', 'EM', 'U', 'BR', 'A', 'SPAN'])
  const SAFE_URL = /^(https?:|mailto:)/i
  const root = document.createElement('div')
  root.innerHTML = html
  const clean = (element: Element) => {
    Array.from(element.children).forEach(clean)
    if (!ALLOWED.has(element.tagName)) {
      element.replaceWith(...Array.from(element.childNodes))
      return
    }
    if (element.tagName === 'A') {
      const href = element.getAttribute('href') || ''
      if (!SAFE_URL.test(href)) {
        element.replaceWith(...Array.from(element.childNodes))
        return
      }
      const safe = document.createElement('a')
      safe.setAttribute('href', href)
      safe.append(...Array.from(element.childNodes))
      element.replaceWith(safe)
      return
    }
    while (element.attributes.length) element.removeAttribute(element.attributes[0].name)
  }
  Array.from(root.children).forEach(clean)
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_COMMENT)
  const comments: Comment[] = []
  while (walker.nextNode()) comments.push(walker.currentNode as Comment)
  comments.forEach((comment) => comment.remove())
  return root.innerHTML
}

export default function InlineEditor() {
  const [editing, setEditing] = useState(false)
  const [savedLabel, setSavedLabel] = useState(false)
  const [panelTarget, setPanelTarget] = useState<{ node: HTMLElement; attribute: string; value: string } | null>(null)
  const texts = resolveTexts()

  const baseKey = `hero-homepage-edits:${location.pathname}`
  const version = document.documentElement.dataset.editVersion
  const storageKey = version ? `${baseKey}:${version}` : baseKey

  const flashSaved = () => {
    setSavedLabel(true)
    window.setTimeout(() => setSavedLabel(false), 900)
  }

  const backupOriginals = () => {
    const originalKey = `${baseKey}:original`
    if (localStorage.getItem(originalKey) !== null) return
    const snapshot: Record<string, string> = {}
    textNodes().forEach((node) => { snapshot[node.dataset.editId || ''] = node.innerHTML })
    attrNodes().forEach((node) => {
      ['href', 'src', 'alt'].forEach((name) => {
        if (node.hasAttribute(name)) snapshot[attrKey(node, name)] = node.getAttribute(name) || ''
      })
    })
    try { localStorage.setItem(originalKey, JSON.stringify(snapshot)) } catch { /* storage unavailable */ }
  }

  const save = (showLabel = true) => {
    const edits: Record<string, string> = {}
    textNodes().forEach((node) => { edits[node.dataset.editId || ''] = sanitizeHtml(node.innerHTML) })
    attrNodes().forEach((node) => {
      ['href', 'src', 'alt'].forEach((name) => {
        if (node.hasAttribute(name)) edits[attrKey(node, name)] = node.getAttribute(name) || ''
      })
    })
    try { localStorage.setItem(storageKey, JSON.stringify(edits)) } catch { /* storage unavailable */ }
    if (showLabel) flashSaved()
    return edits
  }

  const applyEdits = (saved: Record<string, string>) => {
    textNodes().forEach((node) => {
      const value = saved[node.dataset.editId || '']
      if (typeof value === 'string') node.innerHTML = value
    })
    attrNodes().forEach((node) => {
      ['href', 'src', 'alt'].forEach((name) => {
        const value = saved[attrKey(node, name)]
        if (typeof value === 'string') node.setAttribute(name, value)
      })
    })
  }

  const resetAll = () => {
    if (!window.confirm(texts.resetConfirm)) return
    applyEdits(readStorage(`${baseKey}:original`))
    localStorage.removeItem(baseKey)
    if (storageKey !== baseKey) localStorage.removeItem(storageKey)
    flashSaved()
  }

  const pendingPlaceholderCount = () => {
    const original = readStorage(`${baseKey}:original`)
    return textNodes().filter((node) => (
      node.dataset.placeholder === 'true' && node.innerHTML === original[node.dataset.editId || '']
    )).length
  }

  const applyEditing = (active: boolean) => {
    document.body.classList.toggle('hero-editing', active)
    textNodes().forEach((node) => { node.contentEditable = String(active) })
    setEditing(active)
  }

  const toggle = () => {
    if (editing) save()
    applyEditing(!editing)
  }

  const resourceBannerScript = () => {
    const message = texts.resourceBanner.replace(/'/g, "\\'")
    return `(function(){var shown=false;window.addEventListener('error',function(event){var t=event.target;if(!t||!t.tagName)return;if(t.tagName==='LINK'||t.tagName==='IMG'||t.tagName==='SCRIPT'){if(shown)return;shown=true;var b=document.createElement('div');b.setAttribute('data-runtime-chrome','');b.style.cssText='position:fixed;left:0;right:0;top:0;z-index:2147483647;background:#b45309;color:#fff;font:600 13px/1.5 system-ui,sans-serif;padding:9px 16px;text-align:center;pointer-events:none;';b.textContent='${message}';(document.body||document.documentElement).appendChild(b);}},true);})();`
  }

  const exportHtml = () => {
    const edits = save(false)
    const pending = pendingPlaceholderCount()
    if (pending > 0 && !window.confirm(texts.placeholderWarning(pending))) return

    const clone = document.documentElement.cloneNode(true) as HTMLElement
    clone.classList.remove('hero-editing')
    clone.removeAttribute('data-edit-version')
    clone.setAttribute('data-edit-version', `export-${Date.now()}`)
    clone.querySelectorAll('[contenteditable]').forEach((node) => node.setAttribute('contenteditable', 'false'))
    clone.querySelectorAll('#hero-exported-edits, .hero-editor__panel, [data-runtime-chrome]').forEach((node) => node.remove())

    // Embed the edit snapshot so the exported file renders identically anywhere,
    // even where localStorage is empty or stale.
    const payload = JSON.stringify(edits).replace(/</g, '\\u003c')
    const embedded = document.createElement('script')
    embedded.id = 'hero-exported-edits'
    embedded.textContent = `window.__HERO_EXPORTED_EDITS__=${payload}`
    clone.querySelector('body')?.appendChild(embedded)

    const banner = document.createElement('script')
    banner.textContent = resourceBannerScript()
    clone.querySelector('body')?.appendChild(banner)

    const blob = new Blob([`<!doctype html>\n${clone.outerHTML}`], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'hero-homepage-edited.html'
    anchor.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  useEffect(() => {
    backupOriginals()
    const saved = { ...readStorage(baseKey), ...readStorage(storageKey), ...(window.__HERO_EXPORTED_EDITS__ || {}) }
    applyEdits(saved)

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const inField = target?.closest('input, textarea, select, [contenteditable="true"]')
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
        event.preventDefault()
        save()
        return
      }
      if (event.key === 'Escape') {
        if (panelTarget) { event.preventDefault(); setPanelTarget(null); return }
        if (editing && !event.isComposing) { event.preventDefault(); toggle() }
        return
      }
      if (!inField && !event.metaKey && !event.ctrlKey && !event.altKey && event.key.toLowerCase() === 'e') {
        event.preventDefault()
        toggle()
        return
      }
      if (editing && event.key === 'Enter') {
        const node = target?.closest('[contenteditable="true"]')
        if (node) {
          event.preventDefault()
          // Insert <br> instead of letting the browser split the element, so headings keep their layout.
          if (/^(P|LI|BLOCKQUOTE|TD|TH|DIV)$/.test(node.tagName)) document.execCommand('insertLineBreak')
        }
      }
    }
    const onInput = (event: Event) => {
      if (!editing) return
      const target = event.target as HTMLElement | null
      if (target?.closest('[contenteditable="true"]')) save(false)
    }
    const onPaste = (event: ClipboardEvent) => {
      if (!editing) return
      const target = event.target as HTMLElement | null
      if (!target?.closest('[contenteditable="true"]')) return
      event.preventDefault()
      const html = event.clipboardData?.getData('text/html') || ''
      const plain = event.clipboardData?.getData('text/plain') || ''
      if (html) document.execCommand('insertHTML', false, sanitizeHtml(html))
      else if (plain) document.execCommand('insertText', false, plain)
    }
    const onDrop = (event: DragEvent) => {
      if (!editing) return
      const target = event.target as HTMLElement | null
      if (!target?.closest('[contenteditable="true"]')) return
      event.preventDefault()
      const html = event.dataTransfer?.getData('text/html') || ''
      const plain = event.dataTransfer?.getData('text/plain') || ''
      if (html) document.execCommand('insertHTML', false, sanitizeHtml(html))
      else if (plain) document.execCommand('insertText', false, plain)
    }
    const onAttrClick = (event: Event) => {
      if (!editing) return
      const target = event.target as HTMLElement | null
      if (target?.closest('.hero-editor')) return
      const node = target?.closest<HTMLElement>('a[data-edit-id], img[data-edit-id]')
      if (!node) return
      event.preventDefault()
      event.stopPropagation()
      const attribute = node.tagName === 'IMG' ? 'src' : 'href'
      setPanelTarget({ node, attribute, value: node.getAttribute(attribute) || '' })
    }
    const onBeforeUnload = () => { if (editing) save(false) }

    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('input', onInput)
    document.addEventListener('paste', onPaste, true)
    document.addEventListener('drop', onDrop, true)
    document.addEventListener('click', onAttrClick, true)
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('input', onInput)
      document.removeEventListener('paste', onPaste, true)
      document.removeEventListener('drop', onDrop, true)
      document.removeEventListener('click', onAttrClick, true)
      window.removeEventListener('beforeunload', onBeforeUnload)
    }
  })

  const applyPanelValue = () => {
    if (!panelTarget) return
    panelTarget.node.setAttribute(panelTarget.attribute, panelTarget.value.trim())
    save(false)
    setPanelTarget(null)
  }

  return (
    <div className="hero-editor" data-editor-chrome>
      <div className="hero-editor__hotzone" aria-hidden="true" />
      <div className="hero-editor__controls">
        <button type="button" className="hero-editor__button" data-editor-control="toggle" aria-pressed={editing} onClick={toggle}>{savedLabel ? texts.saved : editing ? texts.editing : texts.edit}</button>
        <button type="button" className="hero-editor__button" data-editor-control="reset" onClick={resetAll}>{texts.reset}</button>
        <button type="button" className="hero-editor__button" data-editor-control="export" id="exportHtml" onClick={exportHtml}>{texts.export}</button>
      </div>
      {panelTarget && (
        <div className="hero-editor__panel" role="dialog" aria-label={panelTarget.attribute === 'src' ? texts.imageLabel : texts.linkLabel}>
          <label htmlFor="hero-editor-panel-input">{panelTarget.attribute === 'src' ? texts.imageLabel : texts.linkLabel}</label>
          <input
            id="hero-editor-panel-input"
            type="text"
            value={panelTarget.value}
            autoFocus
            onChange={(event) => setPanelTarget({ ...panelTarget, value: event.target.value })}
            onKeyDown={(event) => {
              if (event.key === 'Enter') { event.preventDefault(); applyPanelValue() }
              if (event.key === 'Escape') { event.preventDefault(); setPanelTarget(null) }
            }}
          />
          <button type="button" onClick={applyPanelValue}>{texts.save}</button>
          <button type="button" className="hero-editor__panel-cancel" onClick={() => setPanelTarget(null)}>{texts.cancel}</button>
        </div>
      )}
    </div>
  )
}
