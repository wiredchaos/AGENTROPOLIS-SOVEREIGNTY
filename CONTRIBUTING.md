# Contributing to AGENTROPOLIS-SOVEREIGNTY

Thank you for your interest in contributing to AGENTROPOLIS-SOVEREIGNTY.

This is a doctrine and schema repository. Contributions should advance the goal of vendor-neutral, public-safe, AI-native sovereignty principles.

---

## What We Accept

- Improvements to existing doctrine documents for clarity, completeness, or accuracy
- New doctrine documents covering sovereignty topics not yet addressed
- Schema refinements that better capture sovereignty primitives
- New example files that illustrate sovereignty patterns
- Corrections to typos, broken links, or formatting errors
- Translations of doctrine documents (in a `docs/translations/` subdirectory)

## What We Do Not Accept

- Private, proprietary, or vendor-specific implementation details
- Content that reveals secrets, credentials, real wallet flows, client data, or production security logic
- Content that references unreleased strategy, internal operating procedures, or partner-confidential information
- Agentropolis trademarks, lore, or visual identity — see [NOTICE](NOTICE)
- Code intended for direct production deployment (this is an implementation-light doctrine repository)

---

## How to Contribute

1. **Fork** this repository and create a branch for your change.
2. **Make your changes** following the style of existing documents and schemas.
3. **Validate JSON schemas** with a JSON Schema validator before submitting.
4. **Open a pull request** with a clear description of what you changed and why.
5. Ensure your PR does not include any content listed in the "What We Do Not Accept" section above.

---

## Style Guidelines

### Doctrine Documents (Markdown)

- Use plain, clear language. Avoid jargon unless it is defined in the document.
- Lead with the principle, then explain it.
- Use tables for structured comparisons.
- Keep documents focused — one topic per file.

### JSON Schemas

- Use JSON Schema draft-07 or later.
- Every property must have a `description` field.
- Use `$comment` for internal notes to schema readers.
- Keep schemas minimal — model the concept, not an implementation.

### Examples

- Examples must be valid against the schema they illustrate.
- Use placeholder values only (e.g., `"did:example:..."`, `"urn:uuid:..."`).
- Do not include real identifiers, keys, addresses, or tokens.

---

## Licensing

By submitting a contribution, you agree that your contribution is licensed under the [Apache License 2.0](LICENSE) and that you have the right to submit it under that license.

You retain copyright to your contributions. You grant all users of this repository the rights specified in the Apache 2.0 license.

---

## Code of Conduct

All contributors are expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md).
