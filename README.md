# AGENTROPOLIS-SOVEREIGNTY

AGENTROPOLIS-SOVEREIGNTY is the canonical sovereignty authority for the AGENTROPOLIS Intelligence Grid.

It owns the sovereignty doctrine, routing policy, provider abstraction, model rights, jurisdiction controls, circuit breakers, telemetry, audit behavior, registries, schemas, and control-plane implementation used to keep AI execution under sovereign authority.

## Control-plane role

The control plane makes provider-neutral routing decisions before model execution. It validates registry integrity, checks model rights, checks jurisdiction status, enforces restricted-data placement, rejects unproven permissions, records auditable decisions, and keeps local/private survival routes available when public cloud is not allowed.

## Provider abstraction

Providers are classified as `local`, `private`, or `cloud`. Restricted data can use only approved local/private providers; cloud providers are available only where classification and rights allow them.

## Rights and jurisdiction model

Model rights declare permitted uses, review dates, and source URIs. Jurisdictions are approved, prohibited, or under review. Unknown, missing, malformed, or expired rights fail closed. Prohibited or missing jurisdictions fail closed.

## Local survival mode

Local and private providers are first-class routing targets so AGENTROPOLIS can continue sovereign operation without downgrading classification to an external cloud provider.

## Registry and schemas

Canonical registries live in `registry/sovereignty/`. Strict Draft 2020-12 schemas live in `schemas/sovereignty/` for models, providers, hardware, rights, and jurisdictions.

## Security posture

The implementation enforces fail-closed routing for restricted data, missing references, expired rights, unknown rights, prohibited jurisdictions, and stress-test execution. Admin endpoints require authorization, deny invalid tokens, redact tokens from audit events, audit circuit-breaker resets and evaluations, and bind to `127.0.0.1` by default.

## Audit limitations and production gaps

The current audit log is an in-memory persistence interface suitable for tests and adapter development. Production deployments still need durable append-only storage, signed registry releases, hardened authentication, production provider adapters, operational dashboards, and HA circuit-breaker persistence.

## Migration path to production adapters

Replace mock/local provider endpoints with production adapters behind the existing provider abstraction, keep registry validation blocking in CI, add durable audit storage, and release signed registry bundles through the same schemas.

See `docs/sovereignty-control-plane.md` for architecture and operational detail.
