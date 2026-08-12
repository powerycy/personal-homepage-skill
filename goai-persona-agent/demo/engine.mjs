const iso = () => new Date().toISOString();

function event(state, agent, action, status, detail = {}) {
  const record = {
    seq: state.trace.length + 1,
    traceId: state.traceId,
    at: iso(),
    agent,
    action,
    status,
    detail,
  };
  state.trace.push(record);
  return record;
}

export function createWorkflowState(scenario) {
  return {
    caseId: scenario.caseId,
    traceId: `trace_${scenario.caseId}`,
    version: 1,
    stage: 'position-review',
    approvedPositionId: null,
    grants: [],
    claims: [],
    artifacts: {},
    qaPassed: false,
    publishApproved: false,
    releaseId: null,
    rollbackReleaseId: 'release_empty',
    releaseStatus: 'draft',
    trace: [],
  };
}

export function approvePosition(state, scenario, positionId) {
  const position = scenario.positions.find((item) => item.id === positionId);
  if (!position) throw new Error('Unknown position');
  state.approvedPositionId = position.id;
  state.stage = 'source-consent';
  state.version += 1;
  event(state, 'strategy', 'POSITION_APPROVED', 'success', { positionId, statement: position.statement });
  return state;
}

export function grantSources(state, scenario, sourceIds) {
  if (!state.approvedPositionId) throw new Error('G1_POSITION_APPROVAL_REQUIRED');
  if (!sourceIds.includes('resume-local')) throw new Error('LOCAL_RESUME_REQUIRED');
  const now = iso();
  const expiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  state.grants = sourceIds.map((sourceId) => {
    const source = scenario.sources.find((item) => item.id === sourceId);
    if (!source) throw new Error(`UNKNOWN_SOURCE:${sourceId}`);
    return {
      grantId: `grant_${sourceId}`,
      source: source.id,
      purpose: source.purpose,
      scope: ['public-profile', 'project-proof'],
      accessMode: source.mode,
      status: 'active',
      grantedAt: now,
      expiresAt: expiry,
      policyVersion: 'consent-policy-v1',
    };
  });
  state.stage = 'evidence';
  state.version += 1;
  event(state, 'evidence', 'SOURCE_GRANTS_APPROVED', 'success', { sources: sourceIds, expiresAt: expiry });
  return state;
}

function requireActiveGrant(state, source) {
  const grant = state.grants.find((item) => item.source === source && item.status === 'active');
  if (!grant) throw new Error(`ACCESS_DENIED:${source}`);
  return grant;
}

export function runWorkflow(state, scenario) {
  if (!state.approvedPositionId) throw new Error('G1_POSITION_APPROVAL_REQUIRED');
  requireActiveGrant(state, 'resume-local');
  const external = state.grants.filter((item) => item.accessMode === 'remote-read');
  if (!external.length) throw new Error('G2_EXTERNAL_SOURCE_APPROVAL_REQUIRED');

  event(state, 'discovery', 'PROFILE_GAPS_ANALYZED', 'success', { missing: ['目标受众优先级'], externalAccess: false });
  for (const grant of external) {
    event(state, 'evidence', 'AUTHORIZED_SOURCE_READ', 'success', { source: grant.source, grantId: grant.grantId, mode: 'read-only' });
  }
  state.claims = [
    {
      claimId: 'claim-001',
      text: '具备 8 年品牌、内容与项目运营经验',
      claimType: 'fact',
      status: 'verified',
      evidenceRefs: ['ev-resume-8y'],
      confidence: 0.99,
      publicSafe: true,
      reviewedBy: ['evidence', 'qa'],
    },
    {
      claimId: 'claim-002',
      text: '擅长把传统行业的真实问题翻译成可运行的 AI 产品',
      claimType: 'packaging',
      status: 'qualified',
      evidenceRefs: ['ev-resume-8y', 'ev-github-projects', 'ev-talk-0718'],
      confidence: 0.9,
      publicSafe: true,
      reviewedBy: ['strategy', 'evidence', 'qa'],
    },
    {
      claimId: 'claim-003',
      text: '最适合定位为“AI 场景翻译官 / 开源产品人”',
      claimType: 'inference',
      status: 'qualified',
      evidenceRefs: ['ev-resume-8y', 'ev-github-projects', 'ev-homepage-skill'],
      confidence: 0.86,
      publicSafe: true,
      reviewedBy: ['strategy', 'qa'],
    },
  ];
  event(state, 'strategy', 'BRAND_BRIEF_CREATED', 'success', { positionId: state.approvedPositionId, claimCount: state.claims.length });
  state.artifacts.contentPlan = 'shared/tasks/content/result.md';
  event(state, 'content', 'INFORMATION_ARCHITECTURE_READY', 'success', { sections: ['身份', '方法', '证据', '项目', '内容', '联系'] });
  state.artifacts.designSpec = 'shared/tasks/visual/design-spec.json';
  event(state, 'visual', 'DESIGN_SPEC_READY', 'success', { direction: 'editorial evidence trail', reducedMotion: true });
  state.artifacts.site = 'shared/tasks/frontend/dist/index.html';
  event(state, 'frontend', 'SITE_BUILD_COMPLETED', 'success', { dependency: 'personal-homepage-skill', networkUpload: false });

  const factClaimsValid = state.claims
    .filter((claim) => claim.claimType === 'fact')
    .every((claim) => claim.evidenceRefs.length > 0 && claim.status === 'verified');
  const publicSafe = state.claims.every((claim) => claim.publicSafe);
  state.qaPassed = factClaimsValid && publicSafe;
  state.stage = state.qaPassed ? 'publish-review' : 'qa';
  state.version += 1;
  event(state, 'qa', 'QA_COMPLETED', state.qaPassed ? 'success' : 'failure', {
    factEvidenceCoverage: factClaimsValid ? 1 : 0,
    privacyViolations: publicSafe ? 0 : 1,
    gate: state.qaPassed ? 'PASS' : 'BLOCK',
  });
  return state;
}

export function approvePublish(state) {
  if (!state.qaPassed) throw new Error('QA_PASS_REQUIRED');
  state.publishApproved = true;
  state.version += 1;
  event(state, 'human', 'G3_PUBLISH_APPROVED', 'success', { scope: 'public-homepage' });
  return state;
}

export function publishRelease(state) {
  if (!state.qaPassed || !state.publishApproved) throw new Error('FINAL_APPROVAL_REQUIRED');
  state.rollbackReleaseId = state.releaseId || 'release_empty';
  state.releaseId = `release_${state.version + 1}`;
  state.releaseStatus = 'published';
  state.stage = 'published';
  state.version += 1;
  event(state, 'delivery', 'RELEASE_PUBLISHED', 'success', { releaseId: state.releaseId, rollbackReleaseId: state.rollbackReleaseId });
  return state;
}

export function revokeAndRollback(state) {
  for (const grant of state.grants) {
    grant.status = 'revoked';
    grant.revokedAt = iso();
  }
  const removedRelease = state.releaseId;
  state.releaseId = state.rollbackReleaseId;
  state.releaseStatus = 'rolled-back';
  state.stage = 'rolled-back';
  state.version += 1;
  event(state, 'delivery', 'CONSENT_REVOKED_AND_RELEASE_ROLLED_BACK', 'success', { removedRelease, restoredRelease: state.releaseId });
  return state;
}

export function snapshot(state) {
  return JSON.parse(JSON.stringify(state));
}
