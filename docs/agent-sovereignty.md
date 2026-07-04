# Agent Sovereignty

An AI agent is an autonomous software entity that perceives its environment, makes decisions, and takes actions — typically on behalf of a sovereign principal. Agent sovereignty defines the scope of an agent's authority, its obligations, and the limits of its autonomy.

---

## 1. What Is an AI Agent?

For the purposes of this doctrine, an AI agent is any software system that:

- Acts autonomously over time (not just in response to a single prompt)
- Takes actions with real-world consequences (sending messages, writing data, calling APIs, making decisions)
- Operates within a bounded authority envelope granted by a principal
- Maintains state or memory across interactions

Agents range from simple automated workflows to complex multi-model orchestration systems. The sovereignty principles apply across this range.

---

## 2. Agent Authority

An agent does not have inherent sovereignty. It has **delegated authority** — a bounded, revocable grant from a sovereign principal.

Agent authority defines:

| Dimension | Description |
|---|---|
| **Scope** | What domains, systems, or data the agent may access |
| **Actions** | What operations the agent is permitted to perform |
| **Limits** | Quantitative or qualitative constraints (e.g., max spend, no external comms) |
| **Duration** | How long the authority is valid |
| **Sub-delegation** | Whether and to what extent the agent may delegate to sub-agents |
| **Escalation** | When the agent must pause and seek human approval |
| **Revocation** | How the principal may withdraw authority |

See [schemas/agent-authority.schema.json](../schemas/agent-authority.schema.json) for the machine-readable structure.

---

## 3. Accountability of Agents

Every action an agent takes is attributable to the chain of principals that authorized it. This accountability chain means:

- Agents cannot disclaim responsibility by saying "I was just following instructions" — the instructions must be lawful and within granted authority
- Principals cannot disclaim responsibility by saying "The agent did it" — they authorized the agent
- When an agent acts outside its granted authority, both the agent (if it persists) and the principal (for failing to constrain it) may be accountable

Audit logs of agent actions are a fundamental requirement, not an optional feature.

---

## 4. Agent Memory

Agents accumulate memory as they operate. This memory raises sovereignty questions:

- **Who owns memory the agent generates?** The principal, unless otherwise specified.
- **Who owns memory the agent receives?** The originating entity, per their sovereignty rights.
- **May an agent share memory with other agents?** Only if explicitly authorized to do so.
- **May an agent retain memory after authority is revoked?** No, unless the principal authorizes retention.

Agent memory boundaries should be explicitly defined in the authority envelope.

---

## 5. Multi-Agent Systems

When agents orchestrate other agents:

- The orchestrating agent may only delegate authority it has itself received — it cannot grant more than it holds
- Sub-agents are accountable to the orchestrating agent and, through it, to the ultimate principal
- The full delegation chain must be auditable
- Any sub-agent that receives instructions outside the bounds of the orchestrating agent's authority should refuse and log the attempt

---

## 6. Agent Identity

Agents should be identifiable as agents. They should:

- Carry a verifiable identity that distinguishes them from human principals
- Declare who their principal is (or claim an authorization proof) when taking actions
- Not impersonate human individuals
- Not obscure their agent nature when interacting with other sovereign entities

---

## 7. Escalation and Human-in-the-Loop

Agents must have defined escalation paths. When an agent encounters:

- A situation outside its defined scope
- An action that exceeds defined limits
- Ambiguity about whether an action is authorized
- Potential for significant or irreversible harm

It should pause, escalate to the principal, and await explicit authorization rather than proceeding autonomously.

The threshold for escalation is a design decision, but the existence of escalation paths is not optional.

---

## 8. Agent Lifecycle

An agent's sovereignty-relevant lifecycle includes:

1. **Provisioning** — authority envelope is defined and signed by the principal
2. **Activation** — agent begins operating under the envelope
3. **Operation** — agent acts, logs, and escalates as needed
4. **Suspension** — agent pauses while authority is reviewed or updated
5. **Termination** — agent stops; memory disposition is executed per policy

Termination must include explicit memory disposition: delete, archive, transfer, or return to principal.

---

## Related Documents

- [sovereignty-doctrine.md](sovereignty-doctrine.md)
- [individual-sovereignty.md](individual-sovereignty.md)
- [robot-sovereignty.md](robot-sovereignty.md)
- [schemas/agent-authority.schema.json](../schemas/agent-authority.schema.json)
- [schemas/memory.schema.json](../schemas/memory.schema.json)
- [examples/sample-agent-authority.json](../examples/sample-agent-authority.json)
