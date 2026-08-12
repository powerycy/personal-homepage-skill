import { useEffect, useState } from 'react'

declare global {
  interface Window {
    __HERO_EXPORTED_EDITS__?: Record<string, string>
  }
}

function editableNodes() {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-edit-id]'))
}

function readStorage(key: string) {
  try {
    return JSON.parse(localStorage.getItem(key) || '{}') as Record<string, string>
  } catch {
    return {}
  }
}

export default function InlineEditor() {
  const [editing, setEditing] = useState(false)
  const [savedLabel, setSavedLabel] = useState(false)

  const baseKey = `hero-homepage-edits:${location.pathname}`
  const version = document.documentElement.dataset.editVersion
  const storageKey = version ? `${baseKey}:${version}` : baseKey

  const save = () => {
    const edits = Object.fromEntries(editableNodes().map((node) => [node.dataset.editId || '', node.innerHTML]))
    localStorage.setItem(storageKey, JSON.stringify(edits))
    setSavedLabel(true)
    window.setTimeout(() => setSavedLabel(false), 900)
    return edits
  }

  const applyEditing = (active: boolean) => {
    document.body.classList.toggle('hero-editing', active)
    editableNodes().forEach((node) => { node.contentEditable = String(active) })
    setEditing(active)
  }

  const toggle = () => {
    if (editing) save()
    applyEditing(!editing)
  }

  const exportHtml = () => {
    const edits = save()
    const clone = document.documentElement.cloneNode(true) as HTMLElement
    clone.classList.remove('hero-editing')
    clone.removeAttribute('data-edit-version')
    clone.setAttribute('data-edit-version', `export-${Date.now()}`)
    clone.querySelectorAll('[contenteditable]').forEach((node) => node.setAttribute('contenteditable', 'false'))
    clone.querySelector('#hero-exported-edits')?.remove()

    const payload = JSON.stringify(edits).replace(/</g, '\\u003c')
    const embedded = document.createElement('script')
    embedded.id = 'hero-exported-edits'
    embedded.textContent = `window.__HERO_EXPORTED_EDITS__=${payload}`
    clone.querySelector('body')?.appendChild(embedded)

    const blob = new Blob([`<!doctype html>\n${clone.outerHTML}`], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'hero-homepage-edited.html'
    anchor.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  useEffect(() => {
    const saved = { ...readStorage(baseKey), ...readStorage(storageKey), ...(window.__HERO_EXPORTED_EDITS__ || {}) }
    editableNodes().forEach((node) => {
      const value = saved[node.dataset.editId || '']
      if (typeof value === 'string') node.innerHTML = value
    })

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.closest('[contenteditable="true"]')) return
      if (event.key.toLowerCase() === 'e' && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault()
        toggle()
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
        event.preventDefault()
        save()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  return (
    <div className="hero-editor" data-editor-chrome>
      <div className="hero-editor__hotzone" aria-hidden="true" />
      <div className="hero-editor__controls">
        <button type="button" className="hero-editor__button" aria-pressed={editing} onClick={toggle}>{savedLabel ? '已保存' : editing ? '编辑中' : '编辑'}</button>
        <button type="button" className="hero-editor__button" onClick={exportHtml}>导出 HTML</button>
      </div>
    </div>
  )
}
