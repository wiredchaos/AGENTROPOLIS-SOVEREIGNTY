# Controlled Interoperability

> **Sovereignty is not isolation. Sovereignty is controlled interoperability.**

---

## 1. The Interoperability Problem

Sovereignty without interoperability is a silo. Interoperability without sovereignty is surveillance capitalism. The challenge is to enable entities to **connect, collaborate, and transact** while each retaining meaningful control over their own domain.

Controlled interoperability is the principle that:

1. Interoperability is opt-in, not assumed
2. The terms of interoperability are defined by sovereign entities before connection
3. Those terms are enforceable and auditable
4. Any party may withdraw from an interoperability relationship
5. Withdrawal does not result in loss of data or memory held by the withdrawing party

---

## 2. The Interoperability Contract

Before two entities interoperate, they establish an **interoperability contract** — an explicit, machine-readable agreement that defines:

| Field | Description |
|---|---|
| Parties | Who is involved and their sovereign identifiers |
| Scope | What data, memory, functions, or capabilities are shared |
| Purpose | Why the sharing is happening |
| Duration | How long the interoperability is authorized |
| Conditions | Under what circumstances access may be used |
| Prohibitions | What the receiving party may not do with shared information |
| Audit rights | Whether and how each party may inspect usage |
| Termination | How either party ends the relationship and what happens to shared data |

See [schemas/interoperability.schema.json](../schemas/interoperability.schema.json) for the machine-readable structure.

---

## 3. Modes of Interoperability

### 3.1 Push (Outbound Sharing)
A sovereign entity pushes specific data or capabilities to another entity under defined terms. The pushing entity retains control of what is sent and may set use restrictions.

### 3.2 Pull (Inbound Access)
A sovereign entity grants another entity the right to query or retrieve information. Queries are logged, bounded by scope, and revocable.

### 3.3 Event Subscription
A sovereign entity allows another to subscribe to specific events (e.g., state changes, memory updates). Subscriptions are explicit and cancellable.

### 3.4 Delegated Execution
A sovereign entity authorizes another entity (typically an agent) to execute actions on its behalf within defined bounds. See [agent-sovereignty.md](agent-sovereignty.md).

### 3.5 Federated Query
Multiple sovereign entities contribute to a joint query or computation without any single party seeing the others' raw data. Privacy-preserving computation patterns (e.g., secure aggregation) fall in this category.

---

## 4. Interoperability Does Not Mean Trust

Interoperability contracts define **access**, not **trust**. An entity may:

- Share data with an entity it does not fully trust, under restrictive terms
- Audit usage to verify compliance
- Revoke access if terms are violated

Trust is separate from access. Access controls should not require trust — they should be designed to be safe even when trust is limited or absent.

---

## 5. Standard vs. Custom Interoperability

Interoperability is more effective when based on shared standards. This doctrine encourages:

- Use of **open identity standards** (e.g., W3C DIDs, Verifiable Credentials) for entity identification
- Use of **open data formats** rather than proprietary serializations
- Use of **published schemas** (like those in this repository) for common sovereignty primitives
- Documentation of any custom extensions to standard schemas

Custom interoperability contracts are valid, but should be clearly marked as custom and not confused with standard implementations.

---

## 6. Interoperability and Accountability

Every interoperability relationship creates an accountability obligation. If Entity A shares data with Entity B, and Entity B misuses it:

- Entity B is accountable for the misuse
- Entity A may be accountable if it failed to establish reasonable terms or ignored known risks
- Audit logs from the interoperability relationship are evidence in accountability determinations

---

## 7. Revocation and Offboarding

Controlled interoperability requires a defined **offboarding path**:

1. Either party initiates termination
2. The terminating party states the effective date
3. All ongoing access is revoked at that date
4. The receiving party confirms deletion or return of data (if contractually required)
5. Audit logs are retained for the agreed retention period

---

## Related Documents

- [sovereignty-doctrine.md](sovereignty-doctrine.md)
- [agent-sovereignty.md](agent-sovereignty.md)
- [b2b-b2ai-sovereignty.md](b2b-b2ai-sovereignty.md)
- [schemas/interoperability.schema.json](../schemas/interoperability.schema.json)
