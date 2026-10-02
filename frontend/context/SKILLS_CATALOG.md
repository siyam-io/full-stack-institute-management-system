# 🗂️ CIB Agentic Skills Catalog

This catalog provides a comprehensive index of all specialized skills integrated into the `.agent/skills` environment. These skills empower AI coding agents to perform high-fidelity engineering, automated testing, and research while maintaining strict adherence to CIB's brand and technical standards.

---

## 🏗️ 1. Core Engineering Methodology (Superpowers)
*These skills govern the fundamental "Red-Green-Refactor" and "Sectioned Planning" workflows.*

| Skill | Description |
| :--- | :--- |
| **[brainstorming](../.agent/skills/brainstorming/SKILL.md)** | Collaborative requirement extraction using Socratic questioning. |
| **[writing-plans](../.agent/skills/writing-plans/SKILL.md)** | Breaking specifications into atomic, 2-5 minute implementation tasks. |
| **[test-driven-development](../.agent/skills/test-driven-development/SKILL.md)** | Enforcing strict Red-Green-Refactor cycles; no code without tests. |
| **[executing-plans](../.agent/skills/executing-plans/SKILL.md)** | High-fidelity implementation of task blocks with user checkpoints. |
| **[subagent-driven-development](../.agent/skills/subagent-driven-development/SKILL.md)** | Orchestrating autonomous subagents for complex feature builds. |
| **[systematic-debugging](../.agent/skills/systematic-debugging/SKILL.md)** | 4-phase root-cause analysis and defensive diagnostic tracing. |
| **[verification-before-completion](../.agent/skills/verification-before-completion/SKILL.md)** | The final quality gate; ensures all tests pass before handover. |

---

## 📚 2. Knowledge & Documentation (Context7)
*Powered by Upstash Context7, these skills provide instant access to the latest library documentation.*

| Skill | Description |
| :--- | :--- |
| **[find-docs](../.agent/skills/find-docs/SKILL.md)** | Retrieves current API references and examples for any library/SDK. |
| **[context7-cli](../.agent/skills/context7-cli/SKILL.md)** | Specification for interacting with the Context7 CLI tool. |
| **[context7-mcp](../.agent/skills/context7-mcp/SKILL.md)** | Model Context Protocol server for documentation retrieval. |

---

## 🪨 3. Token Optimization & Speed (Caveman System)
*Optimized for extreme efficiency, these skills reduce AI token costs and accelerate workflows.*

| Skill | Description |
| :--- | :--- |
| **[caveman](../.agent/skills/caveman/SKILL.md)** | Ultra-compressed, low-token conversation mode with intensity tiers. |
| **[caveman-commit](../.agent/skills/caveman-commit/SKILL.md)** | High-density Conventional Commits generator. |
| **[caveman-review](../.agent/skills/caveman-review/SKILL.md)** | Terse, high-speed code reviews focused on direct action. |
| **[caveman-stats](../.agent/skills/caveman-stats/SKILL.md)** | Audits session logs to report real token savings. |
| **[context-compression](../.agent/skills/context-compression/SKILL.md)** | Strategies for shrinking workspace memory while retaining context. |

---

## 🎨 4. Frontend & Design (Obsidian System)
*Governs the "Clinical Luxury" aesthetic and Next.js/Tailwind patterns.*

| Skill | Description |
| :--- | :--- |
| **[frontend-design](../.agent/skills/frontend-design/SKILL.md)** | Principles for building high-contrast, premium "Obsidian Glass" UI. |
| **[react-best-practices](../.agent/skills/react-best-practices/SKILL.md)** | Next.js 14 App Router patterns, Server Components, and Zod validation. |
| **[web-design-guidelines](../.agent/skills/web-design-guidelines/SKILL.md)** | Enforces the CIB Web Interface Guidelines (WIG). |
| **[theme-factory](../.agent/skills/theme-factory/SKILL.md)** | Rapid generation of unified color palettes and Tailwind configurations. |

---

## 🧪 5. Testing & Verification
*Ensures production-grade stability across locales and hosting platforms.*

| Skill | Description |
| :--- | :--- |
| **[webapp-testing](../.agent/skills/webapp-testing/SKILL.md)** | Native Python Playwright scripts for automated end-to-end testing. |
| **[evaluation](../.agent/skills/evaluation/SKILL.md)** | Multi-stage evaluation of agentic outputs against specifications. |
| **[advanced-evaluation](../.agent/skills/advanced-evaluation/SKILL.md)** | Complex reasoning and logic verification for business rules. |

---

## 📡 6. Advanced Orchestration
*Managing complex, multi-agent workflows.*

| Skill | Description |
| :--- | :--- |
| **[dispatching-parallel-agents](../.agent/skills/dispatching-parallel-agents/SKILL.md)** | Managing concurrent, non-overlapping development tracks. |
| **[hosted-agents](../.agent/skills/hosted-agents/SKILL.md)** | Guidelines for running long-lived background tasks. |
| **[mcp-builder](../.agent/skills/mcp-builder/SKILL.md)** | Creating and extending Model Context Protocol servers. |

---

## 🛠️ 7. Auxiliary & Tooling
*Supporting documentation, version control, and data formats.*

| Skill | Description |
| :--- | :--- |
| **[docx](../.agent/skills/docx/SKILL.md)** / **[pdf](../.agent/skills/pdf/SKILL.md)** / **[xlsx](../.agent/skills/xlsx/SKILL.md)** | Specialized handlers for institutional document formats. |
| **[using-git-worktrees](../.agent/skills/using-git-worktrees/SKILL.md)** | Isolated sandbox development using git worktrees. |
| **[writing-skills](../.agent/skills/writing-skills/SKILL.md)** | Creating new modular skills for the CIB ecosystem. |
| **[obsidian-markdown](../.agent/skills/obsidian-markdown/SKILL.md)** | Best practices for documenting in the Obsidian-linked vault. |

---

## 🔗 Skill Synergy & Workflow Automation

To maximize the value of these integrated skills, follow the **Unified Agentic Loop**:

1.  **Phase 1: Research (`find-docs`)**
    *   Before writing a single line of code, run `find-docs` to retrieve the latest API syntax from Context7.
    *   *Synergy:* This prevents "hallucinated" code and reduces token usage by avoiding repeated trial-and-error.

2.  **Phase 2: Planning (`writing-plans`)**
    *   Use the research results to build an atomic implementation plan.
    *   *Synergy:* Integrates `brainstorming` for Socratic verification of requirements.

3.  **Phase 3: Execution (`executing-plans` + `caveman`)**
    *   Run the implementation tasks in `caveman` mode to minimize overhead.
    *   *Synergy:* Use `subagent-driven-development` for parallelizing non-dependent tasks.

4.  **Phase 4: Optimization (`caveman-stats`)**
    *   Audit the session using `caveman-stats` to verify token efficiency.
    *   *Synergy:* Update `CIB_PHASES.md` using `obsidian-markdown` patterns to maintain a high-fidelity project history.

---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](./CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](./CIB_PHASES.md) | [Semantic Version Changelog](../CHANGELOG.md) | [Supreme Project Index](../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](./sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](./QA_CHECKLIST.md) | [Post-Hotfix Audit Report](./QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](./SOP_INDEX.md) | [SOP 07: cPanel Deployment (Bangla)](./sops/cpanel-deployment-bangla.md) | [SOP 08: Environment Variables](./sops/environment-variables.md) | [SOP 16: Technical Troubleshooting](./sops/troubleshooting.md)

