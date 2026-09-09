# Security Policy

## Reporting a vulnerability

Please avoid publishing a security issue before the maintainer has had a reasonable opportunity to review it.

For now, use GitHub's **private vulnerability reporting** feature on the canonical repository when available:

```text
https://github.com/xyTom/cf-whoami-snippet
```

If private reporting is not enabled, open a minimal issue asking for a private contact channel without including exploit details.

## Scope

This project is a small request-metadata echo endpoint. Security-sensitive changes include, but are not limited to:

- accidental exposure of secrets or private headers;
- unexpected logging or persistence of request metadata;
- injection into text or JSON responses;
- unsafe handling of request URLs or headers;
- changes that send request metadata to third parties.
