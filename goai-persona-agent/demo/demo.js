import { scenario } from './scenario.mjs';
import {
  approvePosition,
  approvePublish,
  createWorkflowState,
  grantSources,
  publishRelease,
  revokeAndRollback,
  runWorkflow,
  snapshot,
} from './engine.mjs';

const state = createWorkflowState(scenario);
const $ = (selector) => document.querySelector(selector);

const stages = [
  ['discovery', '洞察访谈'],
  ['evidence', '授权证据'],
  ['strategy', '品牌策略'],
  ['content', '内容架构'],
  ['visual', '视觉设计'],
  ['frontend', '前端实现'],
  ['qa', 'QA 合规'],
  ['delivery', '交付发布'],
];

function renderSteps() {
  const completedAgents = new Set(state.trace.filter((item) => item.status === 'success').map((item) => item.agent));
  $('#workflowSteps').innerHTML = stages.map(([id, label], index) => {
    const done = completedAgents.has(id);
    const active = !done && ((state.stage === 'position-review' && id === 'strategy') || (state.stage === 'source-consent' && id === 'evidence') || (state.stage === 'publish-review' && id === 'delivery'));
    return `<li class="${done ? 'is-done' : ''} ${active ? 'is-active' : ''}"><span>0${index + 1} · ${id.toUpperCase()}</span><b>${label}</b></li>`;
  }).join('');
}

function renderPositions() {
  $('#positionCards').innerHTML = scenario.positions.map((item) => `
    <button class="position-card ${state.approvedPositionId === item.id ? 'is-selected' : ''}" data-position="${item.id}" ${state.approvedPositionId ? 'disabled' : ''}>
      <small>${item.recommended ? 'RECOMMENDED' : 'ALTERNATIVE'}</small>
      <h3>${item.label}</h3>
      <p>${item.statement}</p>
      <p>${item.rationale}</p>
      <span class="choose">${state.approvedPositionId === item.id ? '✓ 已确认' : '选择此方向 →'}</span>
    </button>
  `).join('');
  document.querySelectorAll('[data-position]').forEach((button) => {
    button.addEventListener('click', () => {
      approvePosition(state, scenario, button.dataset.position);
      $('#sourceGate').classList.remove('is-locked');
      $('#approveSources').disabled = false;
      $('#sourceHint').textContent = '授权有效期：7 天；仅用于本案例。';
      renderAll();
      document.querySelector('#sourceGate').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
}

function renderSources() {
  $('#sourceRows').innerHTML = scenario.sources.map((source) => `
    <label class="source-row">
      <input type="checkbox" value="${source.id}" ${source.defaultSelected ? 'checked' : ''} ${state.grants.length ? 'disabled' : ''} />
      <span><b>${source.label}</b><small>${source.purpose}</small></span>
      <span class="mode">${source.mode}</span>
    </label>
  `).join('');
}

function renderLedger() {
  $('#claimCount').textContent = state.claims.length;
  $('#downloadLedger').disabled = state.claims.length === 0;
  if (!state.claims.length) {
    $('#claimLedger').className = 'empty-state';
    $('#claimLedger').textContent = '闭环运行后，主张和证据会出现在这里。';
    return;
  }
  $('#claimLedger').className = 'claim-list';
  $('#claimLedger').innerHTML = state.claims.map((claim) => `
    <article class="claim ${claim.claimType}">
      <div class="claim-head"><span>${claim.claimType.toUpperCase()} · ${claim.status}</span><span>${Math.round(claim.confidence * 100)}%</span></div>
      <p>${claim.text}</p>
      <small>Evidence: ${claim.evidenceRefs.join(' · ')}</small>
    </article>
  `).join('');
}

function renderTrace() {
  $('#traceCount').textContent = state.trace.length;
  $('#downloadTrace').disabled = state.trace.length === 0;
  if (!state.trace.length) {
    $('#traceLog').innerHTML = '<p class="empty-state">尚无执行记录。</p>';
    return;
  }
  $('#traceLog').innerHTML = state.trace.slice().reverse().map((item) => `
    <article class="trace-item">
      <small>#${String(item.seq).padStart(2, '0')} · ${item.agent.toUpperCase()} · ${item.status}</small>
      <b>${item.action}</b>
      <small>${JSON.stringify(item.detail)}</small>
    </article>
  `).join('');
}

function renderStatus() {
  const labels = {
    'position-review': 'G1 · 等待定位确认',
    'source-consent': 'G2 · 等待数据源授权',
    evidence: '执行中 · 证据采集',
    'publish-review': 'G3 · 等待发布确认',
    published: '已发布 · 可回滚',
    'rolled-back': '已撤回 · 已回滚',
  };
  $('#caseStage').textContent = labels[state.stage] || state.stage;
  $('#grantCount').textContent = state.grants.filter((grant) => grant.status === 'active').length;
  $('#runWorkflow').disabled = state.stage !== 'evidence';
  $('#approveSources').disabled = !state.approvedPositionId || state.grants.length > 0;
  $('#qaDot').classList.toggle('pass', state.qaPassed);
  $('#qaStatus').textContent = state.qaPassed ? 'QA PASS · 事实覆盖 100% · 隐私违规 0' : 'QA 未运行';
  $('#publishApproval').disabled = !state.qaPassed || state.publishApproved || state.releaseStatus !== 'draft';
  $('#publishApproval').checked = state.publishApproved;
  $('#publishButton').disabled = !state.publishApproved || state.releaseStatus !== 'draft';
  $('#rollbackButton').disabled = state.releaseStatus !== 'published';
  const releaseText = {
    draft: '当前：草稿，外部不可见。',
    published: `当前：${state.releaseId} 已发布；回滚点 ${state.rollbackReleaseId}。`,
    'rolled-back': `当前：授权已撤回，已恢复 ${state.releaseId}。`,
  };
  $('#releaseStatus').textContent = releaseText[state.releaseStatus];
}

function renderAll() {
  renderSteps();
  renderPositions();
  renderSources();
  renderLedger();
  renderTrace();
  renderStatus();
}

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

$('#approveSources').addEventListener('click', () => {
  const selected = [...document.querySelectorAll('#sourceRows input:checked')].map((input) => input.value);
  grantSources(state, scenario, selected);
  $('#sourceHint').textContent = `已签发 ${state.grants.length} 个能力令牌；可开始执行。`;
  renderAll();
});

$('#runWorkflow').addEventListener('click', () => {
  runWorkflow(state, scenario);
  renderAll();
  $('#claimLedger').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

$('#publishApproval').addEventListener('change', (event) => {
  if (event.target.checked) approvePublish(state);
  renderAll();
});

$('#publishButton').addEventListener('click', () => {
  publishRelease(state);
  renderAll();
});

$('#rollbackButton').addEventListener('click', () => {
  revokeAndRollback(state);
  renderAll();
});

$('#downloadLedger').addEventListener('click', () => downloadJson('personaproof-claim-ledger.json', state.claims));
$('#downloadTrace').addEventListener('click', () => downloadJson('personaproof-trace.json', snapshot(state)));

window.__personaProofDemo = { scenario, state, snapshot: () => snapshot(state) };
renderAll();
