# 人设有据 PersonaProof

> 经本人授权，把散落的真实经历变成有证据、可审阅、可撤回的个人品牌与主页。

PersonaProof 是面向 C 端个人的个人品牌多 Agent 系统。它不是“输入一句话生成网页”，而是把个人品牌工作拆成洞察访谈、授权与证据、品牌策略、内容架构、视觉设计、前端实现、QA 合规、交付发布八个可审计角色，并在关键节点保留人工同意。

本目录是 GOAI 2026「新智基座 Agent Infra」参赛增量模块。原有 `personal-homepage-skill` 继续负责个人主页的内容结构、视觉规范与前端交付；本模块新增多 Agent 编排、授权能力令牌、Claim-Evidence Ledger、Trace、质量闸门、撤回与回滚。

## 为什么不是网页生成器

系统的核心产物不是一张网页，而是一套可验证的品牌决策包：

- 用户确认过的定位与表达边界；
- 带来源、时间、授权状态和可信等级的证据；
- 区分“事实 / 合理推断 / 包装表达”的主张台账；
- AgentTeams 任务状态、Agent 交接记录和 Skill 调用 Trace；
- 发布前 QA、人工审批、版本清单和一键回滚点；
- 最终才是主页、作品集或个人介绍等交付物。

## AgentTeams 映射

- AgentTeams Manager：接收用户请求，创建 Project Work，规划 DAG，维护人工闸门。
- Brand Lead Worker：团队 Leader，拆解任务、验收 Worker 结果、推进依赖。
- 8 个职能 Worker：洞察访谈、授权证据、品牌策略、内容架构、视觉设计、前端实现、QA 合规、发布交付。
- Matrix / Element：用户查看过程、确认定位、批准数据源和发布。
- TeamHarness：`projectflow` 维护 DAG，`taskflow` 记录交付，`shared/...` 保存可追溯中间产物。
- MinIO：保存版本化产物；OpenTelemetry + AgentScope Studio：记录 Trace / Log；OPA 兼容策略接口：执行同意闸门。

## 本地可验证 Demo

直接打开 `demo/index.html`，依次执行：

1. 确认品牌定位；
2. 批准外部数据源；
3. 运行多 Agent 闭环；
4. 审阅 Claim-Evidence Ledger；
5. 批准并发布；
6. 撤回授权并回滚。

Demo 不访问网络、不上传个人资料，使用已公开且经过授权的示例数据。其目的不是伪装真实 LLM 调用，而是可重复验证同意闸门、状态流转、证据约束和回滚逻辑。

运行确定性验证：

```bash
node goai-persona-agent/scripts/verify-demo.mjs
```

## 目录

```text
agentteams/          AgentTeams v1beta1 Worker / Team 声明
contracts/           ConsentGrant、ClaimEvidence、CaseState Schema
demo/                可点击审计演示
skills/              可分发给 AgentTeams Worker 的核心 Skills
scripts/             确定性验证
```

## 隐私与安全边界

- G1 前只处理用户主动上传的本地资料，不访问外部个人数据。
- G2 必须逐项授权数据源、用途、范围和有效期；默认拒绝。
- 证据采集使用最小权限，只读优先，不保存无关个人信息。
- 所有对外主张必须关联证据，或明确标注为“包装表达 / 合理推断”。
- 发布必须同时满足 QA PASS 与用户最终审批。
- 用户可撤回授权；系统停止后续调用、删除可删除副本并回滚公开版本。
- 任何密钥只以凭据引用名进入任务，不写入 Trace、Matrix 消息或共享文件。

## 已有项目与新增贡献边界

已有基础：`powerycy/personal-homepage-skill` 的个人主页生成规则、视觉模板、前端 QA 与 HTML 导出。

GOAI 新增：AgentTeams 角色与 DAG、授权闸门、证据台账、事实边界、Trace Schema、评测集、发布审批、撤回和回滚。参赛材料会明确披露已有基础和新增范围。
