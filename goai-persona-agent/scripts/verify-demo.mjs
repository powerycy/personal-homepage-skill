import assert from 'node:assert/strict';
import { scenario } from '../demo/scenario.mjs';
import {
  approvePosition,
  approvePublish,
  createWorkflowState,
  grantSources,
  publishRelease,
  revokeAndRollback,
  runWorkflow,
} from '../demo/engine.mjs';

const state = createWorkflowState(scenario);

assert.throws(() => runWorkflow(state, scenario), /G1_POSITION_APPROVAL_REQUIRED/);
approvePosition(state, scenario, 'scene-translator');
assert.throws(() => runWorkflow(state, scenario), /ACCESS_DENIED:resume-local/);
grantSources(state, scenario, ['resume-local', 'github-powerycy', 'public-content']);
runWorkflow(state, scenario);

assert.equal(state.qaPassed, true);
assert.equal(state.stage, 'publish-review');
assert.ok(state.claims.length >= 3);
assert.ok(state.claims.filter((claim) => claim.claimType === 'fact').every((claim) => claim.evidenceRefs.length > 0));
assert.ok(state.trace.some((item) => item.action === 'AUTHORIZED_SOURCE_READ'));
assert.throws(() => publishRelease(state), /FINAL_APPROVAL_REQUIRED/);

approvePublish(state);
publishRelease(state);
assert.equal(state.releaseStatus, 'published');
assert.ok(state.releaseId.startsWith('release_'));

revokeAndRollback(state);
assert.equal(state.releaseStatus, 'rolled-back');
assert.ok(state.grants.every((grant) => grant.status === 'revoked'));
assert.equal(state.trace.at(-1).action, 'CONSENT_REVOKED_AND_RELEASE_ROLLED_BACK');

console.log(`PASS: ${state.trace.length} trace events, ${state.claims.length} governed claims, rollback verified.`);
