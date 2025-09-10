# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

The NEWTUBE team takes security bugs seriously. We appreciate your efforts to responsibly disclose your findings, and will make every effort to acknowledge your contributions.

### How to Report a Security Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities to: security@newtube.app

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

### What to Include

Please include the following information in your report:

- Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

### Preferred Languages

We prefer all communications to be in English.

## Security Measures

### Data Protection

- All sensitive data is encrypted at rest using AES-256
- API tokens and secrets are encrypted using field-level encryption
- Database connections use TLS encryption
- All external API communications use HTTPS

### Authentication & Authorization

- OAuth 2.0 with Clerk for user authentication
- JWT tokens for API authorization
- Rate limiting on all API endpoints
- Session management with secure cookies

### Infrastructure Security

- Docker containers run as non-root users
- Regular security scanning with Trivy and Snyk
- Dependency vulnerability monitoring with Dependabot
- Infrastructure as Code with security best practices

### Code Security

- Static Application Security Testing (SAST) with CodeQL
- Regular dependency auditing
- Secrets scanning to prevent credential leaks
- OWASP security guidelines compliance

### Monitoring & Incident Response

- Real-time security monitoring
- Automated vulnerability alerts
- Incident response procedures
- Regular security audits

## Security Updates

Security updates are released as soon as possible after a vulnerability is confirmed and a fix is available. Updates will be announced through:

- GitHub Security Advisories
- Email notifications to security@newtube.app subscribers
- Release notes

## Bug Bounty Program

We currently do not have a formal bug bounty program, but we greatly appreciate responsible disclosure of security issues and will acknowledge researchers who help us improve our security.

## Compliance

NEWTUBE follows industry security standards and best practices:

- OWASP Top 10 security guidelines
- SOC 2 compliance considerations
- GDPR privacy requirements
- Regular security assessments

## Contact

For any security-related questions or concerns, please contact:

- Email: security@newtube.app
- General inquiries: support@newtube.app

---

This security policy is subject to change. Please check back regularly for updates.