import test from 'node:test'
import assert from 'node:assert/strict'
import {
  addScenario,
  attemptSourceAccess,
  confirmDirection,
  createEmptyWorkspace,
  getActiveScenario,
  grantSources,
  publicDemoWorkspace,
  publishScenario,
  revokeSourceAndRollback,
  runAgentTeam,
  validateClaim,
} from '../packages/personaproof-plugin/src/domain.js'

test('scenario versions share truth without exceeding the limit', () => {
  let workspace = createEmptyWorkspace()
  for (let index = 0; index < 5; index += 1) workspace = addScenario(workspace, { id: `s${index}`, name: `版本${index}`, audience: '公开受众', goal: '清晰表达' })
  assert.equal(workspace.scenarios.length, 5)
  assert.throws(() => addScenario(workspace, { id: 's6', name: '版本6', audience: '受众', goal: '目标' }), /最多/)
})

test('external source access is denied before G2', () => {
  const scenario = getActiveScenario(publicDemoWorkspace())
  const result = attemptSourceAccess(scenario, 'github')
  assert.equal(result.allowed, false)
  assert.equal(result.scenario.trace.at(-1).event, 'tool.denied')
})

test('full governed path includes QA rejection and rollback', () => {
  let scenario = getActiveScenario(publicDemoWorkspace())
  scenario = confirmDirection(scenario, 'scene-translator')
  scenario = grantSources(scenario, ['resume', 'github'])
  scenario = runAgentTeam(scenario)
  assert.equal(scenario.agentRuns.length, 8)
  assert.ok(scenario.trace.some(item => item.event === 'task.rejected'))
  assert.ok(scenario.claims.some(item => item.status === 'rejected'))
  scenario = publishScenario(scenario)
  scenario = revokeSourceAndRollback(scenario, 'github')
  assert.equal(scenario.status, 'rolled-back')
  assert.equal(scenario.gates.G3, 'revoked')
})

test('fact claims require evidence', () => {
  assert.equal(validateClaim({ type: 'fact', evidenceIds: [], confidence: 1 }).valid, false)
  assert.equal(validateClaim({ type: 'fact', evidenceIds: ['e1'], confidence: 1 }).valid, true)
  assert.equal(validateClaim({ type: 'packaging', evidenceIds: [], confidence: .5 }).valid, true)
})
