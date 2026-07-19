# AGENTROPOLIS Identity Evidence Audit

**Repository audited:** `wiredchaos/AGENTROPOLIS-SOVEREIGNTY`  
**Commit reviewed:** `d058371101bf21c60d8a72091c92b8aa65083973`  
**Audit date:** 2026-07-19  
**Auditor:** Cursor cloud agent (Phase 3 federation hardening)  
**Method:** Code-level inspection of all tracked source, schemas, registries, tests, and workflows. README and doctrine docs treated as claims, not evidence.

**Authority documents expected but not present in this checkout:**

| Expected authority | Status in this repo |
|---|---|
| `wiredchaos/agentropolis` | Repository not found (404) |
| `AGENTROPOLIS-CANON.yaml` | Absent |
| `docs/FEDERATION-HARDENING-V1.md` | Absent |
| `governance/repository-registry.yaml` | Absent (proposed patch only; not applied) |

**GitHub Issue #85:** Not found on `wiredchaos/AGENTROPOLIS-SOVEREIGNTY`. Only open issue is `#1` (Build AI Sovereignty Control Plane). Org search did not locate an Identity audit Issue #85.

---

## 1. Executive summary

This repository **cannot serve as the canonical AGENTROPOLIS identity layer**.

Code evidence shows an **AI sovereignty control plane** (model/provider/rights/jurisdiction routing) with a minimal localhost admin bearer check. There is **no implementation** of human principals, organizations, agents-as-identity, wallets, sessions, devices, mandates, delegation, credential issuance, revocation propagation, or federation identity receipts.

GitHub repository description and contingency doctrine *claim* identity ownership; implementation does not.

| Question | Evidence-based answer |
|---|---|
| Canonical identity authority? | **No** |
| Suitable ACTIVE identity service? | **No** |
| What is it actually? | Sovereignty routing + registry validation + in-memory audit stub |
| Identity status recommendation | **EMPTY-SHELL** (for identity role) |
| Sovereignty status (separate) | **ACTIVE / INCUBATING** control plane (not scored as CANONICAL identity) |

---

## 2. Repository role

### Evidence of actual role

| Signal | Path | Observation |
|---|---|---|
| Package name | `package.json` `name: agentropolis-sovereignty` | Sovereignty product, not identity |
| Entry implementation | `src/sovereignty/router.js` `SovereigntyRouter` | Routes inference by classification/capability |
| Registries | `registry/sovereignty/*.json` | hardware, jurisdictions, rights, providers, models |
| Schemas | `schemas/sovereignty/*.schema.json` | Same five domains |
| Admin surface | `src/sovereignty/server.js` `createAdminServer` | Circuit-breaker reset + evaluate stubs |
| CI | `.github/workflows/sovereignty.yml` | Sovereignty-named workflow |
| Docs | `docs/sovereignty-control-plane.md` | Declares sovereignty institution |

### Claimed vs implemented

| Claim source | Claim | Code evidence |
|---|---|---|
| GitHub description | "identity, memory, data, permissions, wallets..." | **Not implemented** in `src/` |
| `docs/AI-SOVEREIGNTY-CONTINGENCY-PLAN.md` | Local identity, exportable identity, agent identity | **Documentation only** |
| `docs/agent-runtime-position.md` | "Backend and MCP services own ... identity" | Explicitly places identity **outside** this repo |
| `README.md` | Canonical sovereignty authority | Partially true for routing/registries; production gaps admitted |

### Role classification (identity audit frame)

**Actual role:** sovereignty control-plane prototype / incubating authority for AI provider routing  
**Not:** canonical identity authority, identity adapter, wallet identity layer, auth UI, profile system, agent registry, credential service, or identity duplicate of another implemented layer  
**Identity-layer verdict:** **EMPTY-SHELL** — identity surface area is documentation aspiration without code

---

## 3. Architecture map

```text
┌─────────────────────────────────────────────────────────────┐
│ registry/sovereignty/{hardware,jurisdictions,rights,        │
│                       providers,models}.json                │
└────────────────────────────┬────────────────────────────────┘
                             │ loadRegistry / validateRegistry
                             ▼
                 ┌───────────────────────┐
                 │ SovereigntyRouter     │  src/sovereignty/router.js
                 │ route(req)            │
                 │ allowed(...)          │
                 └───────────┬───────────┘
                             │ audit?.record(...)
                             ▼
                 ┌───────────────────────┐
                 │ AuditLog (in-memory)  │  src/sovereignty/audit.js
                 └───────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ createAdminServer                                          │
│   Bearer adminToken compare → /admin/* stubs               │
│   src/sovereignty/server.js                                │
└─────────────────────────────────────────────────────────────┘

MISSING FOR IDENTITY:
  principal store · agent registry · wallet linker · session
  store · mandate engine · capability grants · revocation bus
  receipt.v1 · audit.v1 identity events · recovery · MFA
```

Implemented runtime surface is three modules totaling ~31 lines of application logic (`router.js`, `audit.js`, `server.js`) plus registry validation (`registry/validate.js`).

---

## 4. Entity model

### Required identity entities vs code

| Entity | Present? | Location | Notes |
|---|---|---|---|
| human principal | **No** | — | |
| organization | **No** | — | |
| agent (identity) | **No** | — | Contingency plan mentions agents; no entity |
| service account | **No** | — | Admin is shared secret, not an account |
| wallet | **No** | — | |
| device | **No** | — | |
| session | **No** | — | |
| application | **No** | — | |
| district | **No** | — | Doc mention only in `docs/agent-runtime-position.md` |
| role | **No** | — | |
| capability (identity) | **Partial / different** | `models[].capabilities` | Model inference capabilities (`chat`, `tool-use`, …), not principal capabilities |
| credential | **No** | — | Admin bearer is constructor arg, not credential system |
| delegation | **No** | — | |
| mandate | **No** | — | |

### Entities that *do* exist (sovereignty domain)

| Entity | Path | Purpose |
|---|---|---|
| hardware | `registry/sovereignty/hardware.json` | Local/private/cloud boundary |
| jurisdiction | `registry/sovereignty/jurisdictions.json` | approved / prohibited / review |
| rights | `registry/sovereignty/rights.json` | Model license allowedUse + reviewBy |
| provider | `registry/sovereignty/providers.json` | local / private / cloud endpoints |
| model | `registry/sovereignty/models.json` | providerId + rightsId + capabilities |

### Distinction check

| Required distinction | Status |
|---|---|
| human ≠ agent ≠ wallet ≠ session ≠ device ≠ role ≠ capability ≠ mandate | **Not applicable — none implemented** |
| Wallet not treated as complete identity | **N/A — no wallet model** |

---

## 5. Authorization control flow

Target federation path:

`request → authentication → principal resolution → agent resolution → mandate lookup → capability evaluation → policy decision → execution permission → receipt → audit event`

### Stage-by-stage evidence

| Stage | File / symbol | Input | Output | Failure | Tests |
|---|---|---|---|---|---|
| request | `SovereigntyRouter.route` | `{classification, capability?, mode?}` | candidate model/provider or throw | `Error('No sovereignty-compliant route')` | `tests/sovereignty/security.test.js` |
| authentication | `createAdminServer` only | `Authorization: Bearer …` | 200/401/404 | 401 `denied` + `admin.denied` audit | security test covers deny/allow |
| principal resolution | **missing** | — | — | — | missing |
| agent resolution | **missing** | — | — | — | missing |
| mandate lookup | **missing** | — | — | — | missing |
| capability evaluation | `allowed()` + model `capabilities` | classification + capability | boolean | reject route | partial (sovereignty) |
| policy decision | `allowed()` | provider/rights/jurisdiction | allow/deny | throw | implemented & tested |
| execution permission | **not enforced beyond routing choice** | — | returns candidate | — | no execution sandbox |
| receipt | **missing** (`agentropolis.receipt.v1`) | — | — | — | missing |
| audit event | `AuditLog.record` | type + detail | in-memory push | none (always succeeds) | token redaction tested |

### Closest implemented path (sovereignty, not identity)

```text
route(req)
  → filter models by capability
  → join provider, rights, jurisdiction
  → allowed(c, classification, capability)
  → audit route.decision | stress.execution | route.reject
```

Evidence: `src/sovereignty/router.js`.

Admin path:

```text
HTTP request
  → string-equal Bearer token
  → audit admin.denied | circuit_breaker.reset | evaluation.execution
  → text response
```

Evidence: `src/sovereignty/server.js`.

**Note:** `/admin/circuit-breaker/reset` records an audit event but does **not** mutate any circuit-breaker state object (no breaker implementation found).

---

## 6. Human authority

| Control | Status | Evidence |
|---|---|---|
| Every agent has accountable human/org principal | **missing** | No agent entity |
| Agents cannot self-register into authority | **missing** | No registration API |
| Agents cannot mint own permissions | **missing** | No permission minting |
| Agents cannot expand own mandate | **missing** | No mandates |
| Delegated authority bounded | **missing** | |
| Delegation expiry | **missing** | |
| Delegation revocable | **missing** | |
| Conflicting mandates hard-stop | **missing** | |
| Emergency human override | **documentation claim only** | Contingency plan; no code kill-switch beyond admin bearer |
| Agent can become its own root authority | **N/A / open risk at federation level** | No agent model; shared static admin token is a human-authority gap for ops |

**Finding (P0 authority):** Admin authority is a shared static bearer string with no principal binding, rotation policy, dual control, or emergency override model (`src/sovereignty/server.js`).

---

## 7. Revocation flow

| Revocation type | Implemented? | Propagation | Cache survival | Offline survival | Receipt | Downstream event |
|---|---|---|---|---|---|---|
| user | No | — | — | — | No | No |
| agent | No | — | — | — | No | No |
| session | No | — | — | — | No | No |
| wallet unlink | No | — | — | — | No | No |
| capability | No (model capabilities are static JSON) | redeploy registry | N/A | N/A | No | No |
| mandate cancel | No | — | — | — | No | No |
| district access | No | — | — | — | No | No |
| device invalidation | No | — | — | — | No | No |
| credential rotation | No | — | — | — | No | No |
| admin token | Manual process only | Immediate for new process if token changed | In-memory only | N/A | `admin.denied` only | No bus |

Rights "expiry" via `reviewBy` date is registry validation fail-closed (`validate.js`), not identity revocation.

---

## 8. Wallet model

**Absent.** No wallet linking, ownership proofs, nonce/replay protection, chain ID validation, unlinking, compromise response, rotation history, or custodial/noncustodial differentiation in `src/`, `schemas/`, or `registry/`.

Doctrine references wallets in `docs/AI-SOVEREIGNTY-CONTINGENCY-PLAN.md` only.

---

## 9. Session model

**Absent.** No session creation, refresh tokens, expiry, rotation, logout, invalidation, concurrency controls, device binding, suspicious login detection, recovery, MFA, or step-up auth.

Admin auth is a long-lived shared secret comparison with no session object and no revocation list.

**Flag:** Non-revocable (in-process) bearer equality is the only auth mechanism; any holder of the token is fully privileged for admin routes.

---

## 10. Dependency analysis (portability)

| Dependency | Classification | Evidence |
|---|---|---|
| Node.js built-ins (`http`, `fs`, `path`, `url`, `child_process`) | core dependency | `src/**`, `scripts/build-check.mjs` |
| JSON registries on local filesystem | core dependency (single store pattern) | `loadRegistry` in `src/sovereignty/registry/validate.js` |
| Privy / Clerk / Auth0 / Firebase / Supabase Auth | **not present** | grep across repo |
| Base / Ethereum / Solana / Dogecoin / wallets | **not present** | |
| Cloudflare / Hermes / Claw / NemoClaw | **not present** | |
| npm runtime deps | none (`devDependencies: {}`) | `package.json` |
| Cloud provider endpoints in registry | optional adapter fixtures | `registry/sovereignty/providers.json` example URLs |
| Gitleaks (CI) | CI convenience | `.github/workflows/sovereignty.yml` |

**Portability for identity:** Vacuously provider-neutral (no IdP). **Portability for sovereignty:** Designed provider-neutral (`local`/`private`/`cloud`). Neither fact creates an identity layer.

---

## 11. Credentials and secrets

| Check | Result | Location / severity |
|---|---|---|
| Committed production secrets | **Not found** | — |
| Hard-coded private keys | **Not found** | — |
| JWT secrets / JWT validation | **Absent** | missing control |
| Static API keys in source | Test uses `adminToken:'secret'` | `tests/sovereignty/security.test.js` — low (test fixture) |
| Insecure defaults | Admin bind default `127.0.0.1` (good); token required at construct (good) | `server.js` |
| Timing-unsafe token compare | `auth !== \`Bearer ${adminToken}\`` | `server.js` — **medium** |
| Permissive CORS | None configured | N/A for raw http server |
| Cookie settings | No cookies | N/A |
| Unsigned identity claims | No claims system | missing |
| Unvalidated JWT iss/aud | No JWT | missing |
| Token redaction in audit | Implemented | `audit.js` — positive finding |
| Secret scan in CI | Present | gitleaks step in workflow |

No secret values are reproduced in this report.

---

## 12. Receipt and audit coverage

### Implemented audit event types

| Event type | Emitter | Durable? | Matches federation schema? |
|---|---|---|---|
| `admin.denied` | `server.js` | No (memory) | No |
| `circuit_breaker.reset` | `server.js` | No | No |
| `evaluation.execution` | `server.js` | No | No |
| `route.decision` | `router.js` | No | No |
| `route.reject` | `router.js` | No | No |
| `stress.execution` | `router.js` | No | No |

### Required identity actions vs coverage

| Action | Coverage |
|---|---|
| registration / login / logout | **missing** |
| agent creation | **missing** |
| wallet link / unlink | **missing** |
| delegation / capability grant / revoke | **missing** |
| mandate issue / cancel | **missing** |
| credential rotation | **missing** |
| emergency halt | **missing** (stub audit only) |
| recovery action | **missing** |

### Federation schema comparison

| Schema | Present in repo? | Compatible emitter? |
|---|---|---|
| `agentropolis.receipt.v1` | **No** | No |
| `agentropolis.audit.v1` | **No** | No |
| `agentropolis.revocation.v1` | **No** | No |

`AuditLog` stores `{type, detail, at}` only (`src/sovereignty/audit.js`). README admits in-memory persistence is for tests/adapters.

---

## 13. Privacy findings

| Data class | Handled? | Storage | Encryption | Retention / deletion / export | Logging exposure |
|---|---|---|---|---|---|
| legal name, email, phone, address | No | — | — | — | — |
| government IDs / biometrics / health / minors | No | — | — | — | — |
| wallet addresses | No | — | — | — | — |
| IP / device / behavioral / recovery | No | — | — | — | — |
| Authorization header | Yes (admin) | process memory via audit | N/A | process lifetime | Redacted to `[REDACTED]` |

No regulated identity PII pipeline exists. Gap is absence of identity privacy controls for a future identity layer, not mishandling of live PII here.

---

## 14. Recovery findings

| Recovery path | Status |
|---|---|
| Account recovery | missing |
| Lost wallet / device | missing |
| Compromised agent | missing |
| Key rotation | missing |
| Guardian / multisig | missing |
| Emergency admin recovery | missing (rotate process env / restart only) |
| Recovery abuse protections | missing |
| Recovery audit trail | missing |

Contingency plan describes desired recovery/export posture; **no recovery code**.

---

## 15. Test matrix (identity objectives)

| Scenario | Status |
|---|---|
| invalid login | **implemented and tested** (admin bearer deny) |
| expired session | **missing** |
| revoked session | **missing** |
| invalid wallet signature | **missing** |
| replayed nonce | **missing** |
| unauthorized agent | **missing** |
| capability denial | **implemented and tested** (sovereignty route deny) |
| expired delegation | **missing** |
| revoked mandate | **missing** |
| conflicting mandate | **missing** |
| emergency halt | **documentation only** / stub audit |
| wallet compromise | **missing** |
| provider outage | **partial** (no compliant route throws; no HA) |
| database outage | **N/A / missing** (filesystem JSON only) |
| rollback | **missing** |

Existing suite: 7 passing tests in `tests/sovereignty/*.test.js` (verified 2026-07-19). Strong for sovereignty fail-closed routing; near-zero for identity federation controls.

---

## 16. Severity-ranked findings

### P0 — Authority / security

1. **No identity control plane exists** despite identity-facing GitHub description and doctrine references — federation cannot bind agents to humans via this repo.
2. **Shared static admin bearer** with timing-unsafe compare and no principal, session, or revocation list (`src/sovereignty/server.js`).
3. **Circuit-breaker reset is a no-op** beyond audit text — emergency control appearance without mechanism.

### P1 — Federation compatibility

4. No `agentropolis.receipt.v1` / `audit.v1` / `revocation.v1` schemas or emitters.
5. No mandate / delegation / principal / agent resolution path.
6. Authority documents (`AGENTROPOLIS-CANON.yaml`, federation hardening, repository registry) absent from checkout; `wiredchaos/agentropolis` not found.

### P1 — Revocation and receipts

7. In-memory audit only; no durable append-only store; no revocation events.
8. No propagation channel to downstream districts/services.

### P2 — Portability / tests / clarity

9. Repository naming/description overclaims identity scope (documentation drift).
10. Identity test matrix almost entirely missing.
11. Single filesystem registry store — fine for sovereignty seed data; insufficient as identity authority store.

### P3 — Cleanup / documentation

12. Align README/GitHub description with implemented sovereignty boundaries.
13. Point identity consumers to a future/actual identity repository; keep this repo scoped to sovereignty routing.
14. Create local `governance/repository-registry.yaml` from evidence (proposed below; not auto-applied).

---

## 17. Canonical suitability scores (0–5)

Scored **as a candidate canonical identity layer** (not as a sovereignty router).

| Dimension | Score | Rationale |
|---|---|---|
| human accountability | 0 | No principals |
| identity clarity | 0 | No identity entities |
| wallet separation | 0 | No wallets (neither good separation nor bad conflation in code) |
| revocation | 0 | No identity revocation |
| authorization boundaries | 1 | Sovereignty `allowed()` exists; not identity authz |
| portability | 3 | No IdP lock-in; also no portable identity APIs |
| auditability | 1 | In-memory audit stub only |
| recovery | 0 | None |
| privacy | 2 | No PII mishandling; also no privacy program |
| test coverage | 1 | Sovereignty tests only |
| operational readiness | 1 | Local admin stub; README admits production gaps |

**Aggregate:** ~0.8 / 5 for identity canon suitability.

---

## 18. Final status recommendation

### For identity federation role

**EMPTY-SHELL**

Do **not** mark CANONICAL, ACTIVE, ADAPTER, or LEGACY identity. Code does not implement identity; claims are aspirational.

Confidence: **high (0.92)**

### For this repository’s true domain (informational)

Register as **ACTIVE** (or **INCUBATING**) **sovereignty control plane**, not identity. Canon promotion for sovereignty should wait for durable audit, real circuit breakers, signed registries, and hardened admin auth — per README’s own gap list.

---

## 19. Immediate next actions

1. Publish this evidence pack; correct registry/status so identity consumers do not point here.
2. Locate or create the real Identity repository (candidates to audit next: `AGENTROPOLIS-ATG`, `AGENTROPOLIS-PAY-PROTOCOL`, `AGENTROPOLIS-ONTOLOGY`, or a new `AGENTROPOLIS-IDENTITY`).
3. Narrow this repo’s public description to sovereignty routing/registries; keep identity doctrine references as external dependencies.

## 20. Codex required next

**YES** — federation still lacks an evidence-backed identity authority; next Codex/Cursor pass should audit sibling repos and/or scaffold a dedicated identity control plane against `agentropolis.*.v1` contracts.
