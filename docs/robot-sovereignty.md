# Robot Sovereignty

A robot is an embodied AI system — a physical or cyber-physical entity capable of acting in the real world. Robot sovereignty defines the authority bounds, safety constraints, and accountability structures for embodied AI agents.

---

## 1. What Distinguishes Robot Sovereignty?

Robots present unique sovereignty challenges compared to purely software agents:

- **Physical consequences** — robot actions may cause physical harm, property damage, or irreversible real-world changes
- **Latency constraints** — real-time operation may not allow human-in-the-loop approval for every action
- **Environmental uncertainty** — robots encounter unscripted situations that authority envelopes cannot fully anticipate
- **Multi-principal environments** — a robot may operate in a space with multiple humans, each of whom has their own sovereignty

These factors require additional care in authority design, safety boundary definition, and accountability.

---

## 2. Robot Authority Envelope

A robot's authority envelope defines what it may do. Beyond the standard agent authority dimensions, robot authority includes:

| Dimension | Description |
|---|---|
| **Physical domain** | The physical space in which the robot is authorized to operate |
| **Contact authority** | Whether and how the robot may contact humans or objects |
| **Actuation limits** | Maximum force, speed, and energy output |
| **Environmental overrides** | Conditions under which the robot must halt (e.g., human presence in restricted zone) |
| **Fail-safe state** | What the robot does when authority is unclear or communication is lost |
| **Emergency stop** | How any authorized party may immediately halt the robot |

See [schemas/robot-authority.schema.json](../schemas/robot-authority.schema.json) for the machine-readable structure.

---

## 3. Safety Boundaries Are Non-Negotiable

Unlike other sovereignty dimensions, certain robot safety boundaries are **unconditional** — they cannot be overridden by any principal or interoperability contract:

- A robot must not take actions designed to harm humans
- A robot must comply with an emergency stop signal from any authorized party in its environment
- A robot must transition to its defined fail-safe state when operating outside its authorized domain
- A robot must not exceed its defined actuation limits regardless of instruction source

These constraints exist because the harm potential of embodied AI requires that some protections be structurally guaranteed, not just policy-recommended.

---

## 4. Fail-Safe Design Principle

Every robot authority envelope must define a fail-safe state. The fail-safe state is the condition the robot enters when:

- Communication with the principal is lost
- The robot encounters a situation outside its authorized scope
- An emergency stop is triggered
- Internal error is detected

The fail-safe state is typically **halt and await instruction**, but may vary by application. What it must never be is **continue at full capability without human oversight**.

---

## 5. Multi-Principal Environments

Robots frequently operate in spaces shared by multiple sovereigns — a home with multiple residents, a warehouse with multiple workers, a public street with pedestrians. In these environments:

- The robot's principal chain defines its primary authority
- Other humans in the environment have sovereignty rights that constrain the robot's actions
- The robot must not violate the sovereignty of non-principal humans (e.g., must not surveil, obstruct, or harm them without their consent)
- The robot's authority envelope should specify how conflicts between principal instructions and third-party sovereignty are resolved

---

## 6. Accountability for Embodied Actions

Because robot actions have physical consequences, accountability is especially important:

- All robot actions should be logged with sufficient detail to reconstruct the decision that led to the action
- Sensor data that informed a significant decision should be retained for accountability review
- The principal chain is responsible for the robot's actions within its authority envelope
- Actions outside the authority envelope trigger escalated accountability review

---

## 7. Robot Identity

Robots should be:

- Identifiable as robots (not impersonating humans)
- Carrying verifiable credentials tied to their authority envelope
- Able to present their authority claims to other systems they interact with
- Distinguishable from humans in any interface they use

---

## 8. Robot Interoperability

Robots may interoperate with other robots, agents, and systems. All interoperability follows the principles in [controlled-interoperability.md](controlled-interoperability.md), with the additional requirement that:

- Safety boundaries are always preserved across interoperability contracts — no interoperability agreement may override the unconditional safety constraints in Section 3
- A robot receiving instructions from an orchestrating agent must validate those instructions against its own authority envelope before executing

---

## Related Documents

- [sovereignty-doctrine.md](sovereignty-doctrine.md)
- [agent-sovereignty.md](agent-sovereignty.md)
- [public-safety-boundary.md](public-safety-boundary.md)
- [schemas/robot-authority.schema.json](../schemas/robot-authority.schema.json)
