# ⚡ Superpowers Agentic Development Methodology

Superpowers is a complete, high-performance software development methodology for coding agents, built on top of a set of composable skills, initial instructions, and rigorous testing frameworks. It enforces a high-density, evidence-based development cycle that elevates AI-driven engineering to elite quality.

---

## 🚀 Quickstart

Give any coding agent Superpowers instantly:
*   **Claude Code**
*   **Codex CLI / Codex App**
*   **Factory Droid**
*   **Gemini CLI**
*   **OpenCode**
*   **Cursor**
*   **GitHub Copilot CLI**
*   **Antigravity**

---

## 🔄 How It Works (The Core Loop)

Instead of jumping directly into writing code, a Superpowers-enabled agent follows a strict, step-by-step cognitive workflow:

```mermaid
graph TD
    A["🗣️ 1. Brainstorming & Requirements Clarification"] --> B["📝 2. Sectioned Specification & User Sign-off"]
    B --> C["🗺️ 3. Bite-Sized Implementation Plan (2-5 Min Tasks)"]
    C --> D["🌲 4. git worktree / Isolated Branch Creation"]
    D --> E["🔴 5. Test-Driven Development (Red-Green-Refactor)"]
    A["📖 1. Research & Documentation"] --> B["🗣️ 2. Brainstorming & Requirements Clarification"]
    B --> C["📝 3. Sectioned Specification & User Sign-off"]
    C --> D["🗺️ 4. Bite-Sized Implementation Plan (2-5 Min Tasks)"]
    D --> E["🌲 5. git worktree / Isolated Branch Creation"]
    E --> F["🔴 6. Test-Driven Development (Red-Green-Refactor)"]
    F --> G["🔍 7. Systematic Debugging & Verification"]
    G --> H["🚢 8. Branch Finalization, PR & Worktree Cleanup"]
end
```

### 1. Research & Documentation (`find-docs`)
Before planning, the agent uses **Upstash Context7** to retrieve the latest API signatures and examples. This prevents errors caused by outdated training data and ensures the use of modern framework patterns.

### 2. Brainstorming (`brainstorming`)
Activates before any code is touched. The agent refines rough ideas through Socratic questioning, explores alternatives, and presents the design in small chunks for user validation.

### 3. Isolated Workspace (`using-git-worktrees`)
Creates isolated development environments and worktrees on separate branches to ensure main is never corrupted.

### 4. Writing Plans (`writing-plans`)
Breaks the approved design into bite-sized tasks (2-5 minutes each). Every task specifies exact file paths, clean interfaces, and explicit verification steps.

### 5. Executing Plans (`subagent-driven-development` or `executing-plans`)
Launches automated, task-scoped subagents. Reviews their work via a two-stage process:
*   **Stage 1**: Specification Compliance Audit.
*   **Stage 2**: Clean Code, Architecture, and Performance Audit.

### 6. Test-Driven Development (`test-driven-development`)
Strict adherence to **RED-GREEN-REFACTOR**:
1.  **RED**: Write a failing unit/integration test first.
2.  **GREEN**: Write the minimal code needed to make the test pass.
3.  **REFACTOR**: Clean and optimize the code without breaking the tests.

### 7. Systematic Debugging (`systematic-debugging`)
Enforces a 4-phase root-cause analysis process: Replicate, Trace, Resolve (Defense-in-Depth), and Verify.

---

## 🪨 The Caveman Efficiency System
To reduce AI token costs and accelerate interaction, utilize the **Caveman System**:
*   **`caveman`**: Activate ultra-compressed mode for routine tasks.
*   **`caveman-review`**: Request terse, actionable code reviews.
*   **`caveman-stats`**: Monitor token savings and session efficiency.

---

## 🛠️ The Skills Library & Toolsets

*   **Research**: `find-docs`, `context7-cli`
*   **Testing**: `test-driven-development`, `verification-before-completion`
*   **Debugging**: `systematic-debugging`
*   **Optimization**: `caveman`, `context-compression`
*   **Orchestration**: `subagent-driven-development`, `dispatching-parallel-agents`

---

## 📜 Core Philosophy

> [!IMPORTANT]
> 1. **Research First**: Always check documentation via **Context7** before implementing new APIs.
> 2. **Test-Driven Development**: Always write tests first.
> 3. **Systematic over Ad-hoc**: Lean on structured diagnostics and planning over guessing.
> 4. **Token Efficiency**: Use **Caveman** modes for repetitive or high-volume tasks to minimize costs.

---

### 🏛️ CIB Documentation Navigation Hub
**Core Intelligence:** [Brand Bible (Core Memory)](./CIB_CORE_MEMORY.md) | [34-Phase Development Ledger](./CIB_PHASES.md) | [Semantic Version Changelog](../CHANGELOG.md) | [Supreme Project Index](../INDEX.md)  
**Operations & Deployment:** [cPanel Deployment SOP (Bangla)](./sops/cpanel-deployment-bangla.md) | [QA Audit Checklist](./QA_CHECKLIST.md) | [Post-Hotfix Audit Report](./QA_AUDIT_REPORT.md)  
**SOP Library:** [Master SOP Index](./SOP_INDEX.md) | [SOP 07: cPanel Deployment (Bangla)](./sops/cpanel-deployment-bangla.md) | [SOP 08: Environment Variables](./sops/environment-variables.md) | [SOP 16: Technical Troubleshooting](./sops/troubleshooting.md)

