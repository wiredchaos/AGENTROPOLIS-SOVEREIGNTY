# Security Policy

## Scope

AGENTROPOLIS-SOVEREIGNTY is a doctrine and schema repository. It does not contain executable production software, credentials, cryptographic keys, or live system integrations. The primary security concern for this repository is:

- **Content safety** — ensuring no secrets, credentials, private data, or sensitive operational information is accidentally committed
- **Schema integrity** — ensuring published schemas do not contain patterns that would encourage insecure implementations
- **Dependency hygiene** — ensuring any tooling dependencies do not introduce vulnerabilities

## Reporting a Vulnerability

If you discover a security issue in this repository — such as accidentally committed credentials, schemas that encode insecure patterns, or other concerns — please **do not open a public GitHub issue**.

Instead, report it privately:

1. Use GitHub's [private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing/privately-reporting-a-security-vulnerability) feature for this repository, **or**
2. Email the maintainers (address listed in repository profile or pinned contact).

Please include:
- A description of the issue
- The file(s) affected
- Why you believe it is a security concern
- Any suggested remediation

## Response

We aim to acknowledge reports within **5 business days** and to resolve confirmed issues within **30 days** of acknowledgment, depending on severity.

## Out of Scope

The following are outside the scope of this security policy:

- Theoretical attacks on hypothetical systems described in the doctrine
- Issues in third-party tools or platforms referenced but not included in this repository
- Content disputes (handled via standard issue/PR process)

## Responsible Disclosure

We appreciate responsible disclosure. Reporters who follow this policy and allow us reasonable time to address the issue before public disclosure will be acknowledged in the fix commit (unless they prefer to remain anonymous).

## Public Safety Principle

Per the doctrine in this repository: sovereign rights do not extend to causing harm to others. This principle applies to contributors as well — contributions that intentionally introduce harmful patterns, malicious content, or deceptive guidance will be rejected and the contributor may be removed from the project.
