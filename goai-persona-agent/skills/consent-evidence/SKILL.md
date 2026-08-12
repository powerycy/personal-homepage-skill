---
name: consent-evidence
description: 签发和校验数据源授权令牌，在最小权限下采集证据，并维护事实、推断、包装分层的 Claim-Evidence Ledger。
---

# Consent Evidence

## 使用场景

G1 定位确认后，用户需要授权外部个人数据源；或任何 Agent 要引用外部事实时使用。

## 输入

- `case_id`
- `approved_position_id`
- `source_requests[]`：来源、用途、字段范围、访问方式、有效期。
- `claim_requests[]`

## 输出

- `ConsentGrant[]`
- `EvidenceItem[]`：来源 URL、抓取时间、内容摘要、哈希、授权编号。
- `ClaimEvidence[]`
- `AccessTrace[]`

## 调用条件

外部访问必须同时存在 G1 的 `approved_position_id` 和状态为 `active` 的对应 `ConsentGrant`。

## 依赖

OPA 兼容策略接口、Presidio 兼容 PII 检测、Playwright / Firecrawl 只读适配器、GitHub MCP 或 API。

## 失败处理

授权缺失立即 `ACCESS_DENIED`；来源不可访问时不得用搜索摘要代替原证据；冲突证据全部保留并降级可信度；调用幂等键为 `case_id + source + scope + date`。

## 安全边界

默认拒绝、最小范围、只读优先；不得采集未授权的家庭、精确位置、健康或财务信息；授权撤回后停止调用并触发删除 / 保留例外清单。

## 复用价值

可复用于简历核验、专家主页、创作者媒体包、自由职业者作品集和企业员工介绍。
