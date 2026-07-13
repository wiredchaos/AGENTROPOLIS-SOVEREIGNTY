# AGENTROPOLIS Sovereignty Control Plane

AGENTROPOLIS-SOVEREIGNTY is the canonical sovereignty institution within the AGENTROPOLIS Intelligence Grid. It owns provider-neutral model routing, model and provider registries, rights and license controls, jurisdiction policy, restricted-data routing, circuit breakers, sovereignty telemetry, audit receipts and persistence interfaces, survival/offline routing, and evaluation and stress-test harnesses.

## Architecture

The control plane separates policy authority from model execution. Registries describe providers, models, hardware, rights, and jurisdictions. The runtime validates those registries before routing and fails closed when permission cannot be proven.

## Security posture

Restricted data may route only to approved local or private providers. Cloud fallback cannot downgrade classification, stress-test mode cannot bypass policy, and missing, unknown, malformed, or expired rights are rejected. Administrative endpoints require bearer authorization, redact tokens in audit events, bind to localhost by default, and audit circuit-breaker reset and evaluation execution.

## Registry structure

- `registry/sovereignty/models.json`
- `registry/sovereignty/providers.json`
- `registry/sovereignty/hardware.json`
- `registry/sovereignty/rights.json`
- `registry/sovereignty/jurisdictions.json`

Draft 2020-12 schemas live under `schemas/sovereignty/` and disallow unknown fields.

## Local survival mode and production gaps

The included adapters are policy-safe mock/local interfaces for repository validation. Production work remains to connect persistent audit storage, hardened token issuance, production model adapters, high-availability circuit-breaker state, and signed registry release workflows.
