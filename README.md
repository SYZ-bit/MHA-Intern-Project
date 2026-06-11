# Secure Coding Knowledge Portal

A secure coding learning portal built using Docusaurus during my cybersecurity internship.

The project was developed to help developers better understand common software vulnerabilities, secure coding practices, and the capabilities and limitations of Static Application Security Testing (SAST) tools.

## Overview

While SAST tools are effective at identifying many coding-related vulnerabilities, they are not a complete security solution. This portal aims to bridge that gap by demonstrating:

* Common vulnerabilities that SAST tools can detect
* Security issues that SAST tools frequently miss
* Secure coding practices and remediation techniques
* Real-world code examples
* Interactive quizzes and exercises
* Security testing considerations beyond automated scanning

## Key Learning Areas

### What SAST Covers

This section focuses on vulnerabilities that can commonly be detected through static code analysis.

📂 Folder: [What SAST Cover](./my-website/docs/MHA%20Secure%20Coding/What%20SAST%20Cover)

Topics include:

* SQL Injection
* Cross-Site Scripting (XSS)
* Server-Side Request Forgery (SSRF)
* XML External Entity (XXE)
* OS Command Injection
* Log Injection
* Buffer Overflow
* Weak Hashing
* Broken JWT Implementation
* Cryptographic IV Chaining Issues

Several modules also include quizzes and practical exercises to reinforce learning.

### What SAST Misses

This section focuses on vulnerabilities that typically require manual review, business logic analysis, threat modelling, or dynamic testing.

📂 Folder: [What SAST Miss](./my-website/docs/MHA%20Secure%20Coding/What%20SAST%20Miss)

Topics include:

* Broken Authentication
* Broken Authorization
* Race Conditions
* Unrestricted File Download
* Business Logic Vulnerabilities

These examples highlight why secure software development must go beyond automated scanning tools.

## Project Structure

```text
MHA-Intern-Project/
└── my-website/
    └── docs/
        └── MHA Secure Coding/
            ├── What SAST Cover/
            │   ├── BrokenJWT.mdx
            │   ├── BufferOverflow.mdx
            │   ├── ChainingIVs.mdx
            │   ├── LogInjection.mdx
            │   ├── OSCommands.mdx
            │   ├── SQLInjection.mdx
            │   ├── SQLInjectionQuiz.mdx
            │   ├── SSRF.mdx
            │   ├── WeakHashing.mdx
            │   ├── WeakHashingEx.mdx
            │   ├── XMLEntity.mdx
            │   ├── XSS.mdx
            │   └── XSS_Quiz.mdx
            │
            └── What SAST Miss/
                ├── BrokenAuthentication.mdx
                ├── BrokenAuthenticationEx.mdx
                ├── BrokenAuthorization.mdx
                ├── BrokenAuthorizationEx.mdx
                ├── RaceCondition.mdx
                └── UnrestrictedFileDownload.mdx
```

## Technology Stack

* Docusaurus
* React
* MDX
* JavaScript
* Markdown


## Learning Objectives

This project aims to:

* Promote secure-by-design development practices
* Improve awareness of common application security vulnerabilities
* Demonstrate secure coding techniques through practical examples
* Educate developers on the strengths and limitations of SAST tools
* Encourage a layered approach to application security

## Disclaimer

This repository is intended for educational and cybersecurity awareness purposes only. Vulnerable code examples are included solely for learning and demonstration. They should not be used in production environments.

## Author

**Yan Zhang Soh**

Cybersecurity & Software Development Projects

GitHub: https://github.com/SYZ-bit
# MHA-Intern-Project
 
