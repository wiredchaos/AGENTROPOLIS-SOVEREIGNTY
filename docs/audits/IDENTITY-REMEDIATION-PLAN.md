# IDENTITY Remediation Plan

**Repository:** `wiredchaos/AGENTROPOLIS-SOVEREIGNTY`  
**Commit reviewed:** `d058371101bf21c60d8a72091c92b8aa65083973`  
**Based on:** `docs/audits/IDENTITY-EVIDENCE-AUDIT.md`, `governance/identity-evidence.yaml`  
**Constraint:** Audit-first. No broad architectural identity implementation in this pass. Registry patch shown below is **proposed only** and was **not applied**.

---

## P0 — Security defects

| ID | Defect | Evidence | Remediation |
|---|---|---|---|
| S0-1 | Timing-unsafe admin bearer compare | `src/sovereignty/server.js` `auth!==\`Bearer ${adminToken}\`` | Replace with `crypto.timingSafeEqual` on buffered secrets; keep localhost bind until hardened |
| S0-2 | Shared static admin token is sole authority | `createAdminServer({adminToken})` | Bind admin actions to human principal + short-lived session; add revoke list |
| S0-3 | Circuit-breaker reset is cosmetic | `/admin/circuit-breaker/reset` audits only | Implement breaker state object; make reset mutate + emit durable receipt, or remove endpoint until real |
| S0-4 | Identity overclaim risk | GitHub description vs empty identity code | Immediately register identity status `EMPTY-SHELL`; do not route federation identity traffic here |

**Do not:** rotate production secrets in-repo during audit follow-up without operator process.  
**Do not:** expose admin server beyond `127.0.0.1` until S0-1–S0-3 land.

---

## P0 — Authority defects

| ID | Defect | Remediation |
|---|---|---|
| A0-1 | No human/org principal model | Stand up dedicated identity authority (new repo or proven sibling); do not bolt principals into sovereignty router |
| A0-2 | No agent accountability chain | Require `agent → principal` binding with fail-closed registration |
| A0-3 | No mandate/delegation controls | Implement issue/cancel/expiry/conflict hard-stop before any agent self-service |
| A0-4 | No emergency human override | Define halt authority outside model providers; wire durable audit + revocation event |

**Hard rule:** Agents must not become root authority. Sovereignty routing must *consume* identity decisions, not mint them.

---

## P1 — Federation compatibility

| ID | Gap | Remediation |
|---|---|---|
| F1-1 | `wiredchaos/agentropolis` / CANON / federation hardening docs absent | Restore or publish authority pack; link from this repo |
| F1-2 | No `agentropolis.receipt.v1` / `audit.v1` / `revocation.v1` | Add schemas in identity authority; sovereignty may emit *routing* receipts later under separate types |
| F1-3 | No principal → agent → mandate path | Implement in identity repo; sovereignty keeps `classification`/`capability` only |
| F1-4 | Issue #85 not found | Open federation identity tracking issue or attach this audit to Issue #1 until #85 exists |

**Sibling audits required (Codex/Cursor next):**

1. `wiredchaos/AGENTROPOLIS-ATG`
2. `wiredchaos/AGENTROPOLIS-PAY-PROTOCOL`
3. `wiredchaos/AGENTROPOLIS-ONTOLOGY`

---

## P1 — Revocation and receipts

| ID | Gap | Remediation |
|---|---|---|
| R1-1 | In-memory `AuditLog` | Durable append-only store + hash chain or signed events |
| R1-2 | No revocation bus | Emit `agentropolis.revocation.v1`; define cache TTL ≤ propagation SLA |
| R1-3 | No session/credential revoke | Identity layer must invalidate sessions/devices/wallets with receipts |
| R1-4 | Downstream unaware | Define subscriber contract for districts/pay/runtime |

---

## P2 — Portability

| ID | Action |
|---|---|
| P2-1 | Keep sovereignty provider-neutral (`local`/`private`/`cloud`) — already directionally correct |
| P2-2 | Ensure future identity layer has IdP adapters (optional) behind neutral principal APIs — **not** core Privy/Clerk/Auth0 lock-in |
| P2-3 | Wallets as linked identifiers only; multi-wallet ↔ one principal; explicit policy for shared wallets |
| P2-4 | Avoid embedding chain-specific root identity in this sovereignty repo |

---

## P2 — Test coverage

Add (in identity authority, not by pretending this repo is identity):

- invalid login, expired/revoked session
- invalid wallet signature, replayed nonce
- unauthorized agent, capability denial
- expired/revoked/conflicting mandate
- emergency halt, wallet compromise
- provider/db outage, rollback

In **this** repo, add only sovereignty-adjacent tests if touching admin auth hardening (timing-safe compare, breaker state).

---

## P3 — Cleanup and documentation

| ID | Action |
|---|---|
| D3-1 | Rewrite GitHub description to sovereignty scope (routing, rights, jurisdictions, registries) |
| D3-2 | README: explicit “Identity is out of scope; see identity evidence audit” |
| D3-3 | Contingency plan: mark identity sections as external dependencies |
| D3-4 | Apply repository registry patch below after human review |
| D3-5 | Comment audit summary on tracking issue (Issue #1 until #85 exists) |

---

## Proposed patch: `governance/repository-registry.yaml`

**Status:** PROPOSED ONLY — **not applied** in this audit PR.  
**Reason:** File does not exist in commit `d058371`. Creating it changes federation registry semantics and should be an explicit governance accept.

### Exact proposed diff

```diff
--- /dev/null
+++ b/governance/repository-registry.yaml
@@ -0,0 +1,68 @@
+# AGENTROPOLIS repository registry (evidence-based)
+# Source audit: docs/audits/IDENTITY-EVIDENCE-AUDIT.md
+# Evidence: governance/identity-evidence.yaml
+# Commit reviewed: d058371101bf21c60d8a72091c92b8aa65083973
+
+version: 1
+updated: "2026-07-19"
+policy: |
+  Status values must be set from code evidence, not repository names or README claims.
+
+repositories:
+  - id: agentropolis-sovereignty
+    github: wiredchaos/AGENTROPOLIS-SOVEREIGNTY
+    commit_reviewed: d058371101bf21c60d8a72091c92b8aa65083973
+    actual_role: sovereignty_control_plane
+    domains:
+      - sovereignty
+      - model_routing
+      - provider_registry
+      - rights_registry
+      - jurisdiction_policy
+    status_by_domain:
+      sovereignty: ACTIVE
+      identity: EMPTY-SHELL
+    proposed_canonical:
+      sovereignty: false
+      identity: false
+    confidence: 0.92
+    evidence:
+      - docs/audits/IDENTITY-EVIDENCE-AUDIT.md
+      - governance/identity-evidence.yaml
+    notes: |
+      Implements SovereigntyRouter, registry validation, in-memory AuditLog,
+      and localhost admin bearer stubs. Does not implement principals, agents,
+      wallets, sessions, mandates, delegation, or federation identity receipts.
+    blockers_for_identity_canonical:
+      - no_principal_model
+      - no_agent_accountability
+      - no_mandate_system
+      - no_revocation_bus
+      - no_receipt_v1
+    next_actions:
+      - audit_sibling_identity_candidates
+      - create_or_select_AGENTROPOLIS-IDENTITY
+      - harden_admin_auth_before_non_localhost
+
+  # Placeholder entries for next evidence passes (status UNKNOWN until audited)
+  - id: agentropolis-atg
+    github: wiredchaos/AGENTROPOLIS-ATG
+    status_by_domain:
+      identity: UNKNOWN
+    notes: Candidate for identity/mandate/receipt protocol audit
+
+  - id: agentropolis-pay-protocol
+    github: wiredchaos/AGENTROPOLIS-PAY-PROTOCOL
+    status_by_domain:
+      identity: UNKNOWN
+    notes: Claims identity/mandate enforcement for payments; needs code audit
+
+  - id: agentropolis-ontology
+    github: wiredchaos/AGENTROPOLIS-ONTOLOGY
+    status_by_domain:
+      identity: UNKNOWN
+    notes: Ontology may define identity entities without runtime authority
+```

### Acceptance criteria before applying

1. Human governance owner reviews scores and `EMPTY-SHELL` identity status.  
2. Confirm no other repo is already registered as identity CANONICAL.  
3. Open/attach federation Issue tracking (Issue #85 or successor).  
4. Apply as a dedicated governance commit after this evidence PR merges or in the same PR if reviewers explicitly approve.

---

## Recommended sequencing

```text
1) Merge evidence artifacts (this PR) — no auth behavior change
2) Apply registry patch after review
3) Codex audits sibling identity candidates
4) Select/create identity CANONICAL only with code evidence
5) Sovereignty consumes identity decisions; remains provider router
6) Harden admin auth + real breaker + durable audit in this repo
```

---

## Out of scope for immediate patches

- Broad identity architecture rewrite inside this repository
- Production authentication behavior changes during audit
- Secret rotation
- File deletion
- Marking this repository CANONICAL for identity
