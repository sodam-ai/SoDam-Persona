# SoDam Persona

**SoDam Persona** gives Anthropic's AI coding assistant **Claude Code** (an AI program that helps you build software using natural-language instructions) the personality of a "careful, detail-oriented Korean development partner." It is an add-on program (a **plugin** — a small extra program that adds features to an existing program).

This document is written so that even someone who has never used a computer, a smartphone, a messenger app, or AI before can follow it from installation to actual use. Whenever an unfamiliar term appears for the first time, it is explained in `plain words (technical term)` form. Example: repository (an online storage place that holds code and documents together).

The plugin itself is not a separate AI. It layers a set of "judge this way, answer this way" rule documents on top of the conversational ability Claude Code already has. It consists of 2 always-on core rules (**hooks** — small programs that run automatically at a specific moment) and 9 conditional expert knowledge modules (**skills**) that load only when relevant.

> **Current version**: `1.2.0` · **Perspectives**: 15 · **Trigger patterns**: 20 patterns (A-T) · **Skills (9)** · **Hooks**: 2 · **License**: Apache License 2.0

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Required Software](#required-software)
3. [How to Download](#how-to-download)
4. [Installation](#installation)
5. [Quick Start](#quick-start)
6. [How to Run](#how-to-run)
7. [How to Use](#how-to-use)
8. [Commands](#commands)
9. [How It Works](#how-it-works)
10. [Workflow](#workflow)
11. [Architecture](#architecture)
12. [Security & Data Flow](#security--data-flow)
13. [Files & Documentation Map](#files--documentation-map)
14. [Changelog Summary](#changelog-summary)
15. [Troubleshooting](#troubleshooting)
16. [Frequently Asked Questions (FAQ)](#frequently-asked-questions-faq)
17. [Legal, Copyright, License, and Commercial Use](#legal-copyright-license-and-commercial-use)

---

## Prerequisites

Before you start, make sure the 4 items below are in place. If anything is missing, [Required Software](#required-software) explains how to install it.

| # | Prerequisite | Why it's needed | If missing |
|---|---|---|---|
| 1 | Claude Code CLI (terminal version), or an IDE (code editor) extension with Claude Code connected | This plugin is an add-on that runs *inside* Claude Code, so Claude Code itself must already be there | There is nothing to install the plugin into |
| 2 | Node.js 18 or newer | Both hooks and the validation script (`validate.mjs`) are written in JavaScript, and Node.js is the engine that runs them | Hooks won't run at all, so the persona never activates |
| 3 | Git (only if installing from GitHub) | Needed when installing via an address like `/plugin marketplace add sodam-ai/SoDam-Persona`, so Claude Code can fetch the repository | You can use the local-checkout install method instead (no Git required) |
| 4 | A tiny bit of experience with a terminal (a black-screen program you type text commands into) | You only need to be able to type one line at a time and press Enter | The [How to Run](#how-to-run) section explains how to open a terminal from scratch |

**Operating system**: Works on Windows, macOS, and Linux. The command examples in this document use Windows PowerShell; on macOS/Linux, type the same commands into the Terminal app.

**Account**: An Anthropic account/subscription for using Claude Code must already be set up independently of this plugin (this plugin does not create accounts or handle login for you).

---

## Required Software

Installing in the order below avoids most snags. If something is already installed, just check its version and move on.

| Software | Minimum version | Where to get it | Version check command |
|---|---|---|---|
| Claude Code | Latest | Anthropic's official website, or `npm install -g @anthropic-ai/claude-code` | `claude --version` |
| Node.js | 18.0.0 or newer | `https://nodejs.org` (LTS build recommended) | `node --version` |
| Git | Latest (only for GitHub install) | `https://git-scm.com` | `git --version` |
| Pandoc (document editors only, optional) | Latest | `https://pandoc.org/installing.html` | `pandoc --version` |

- **Claude Code** is the "stage" this plugin runs on. Install and log in first.
- **Node.js** is required for every user (it runs the hooks). After installing, reopen your terminal so the `node` command is recognized.
- **Git** is only needed if you install from GitHub. If you already have this repository as a local folder and only plan to install locally, you can skip it.
- **Pandoc** is not needed to *use* the plugin at all. It's only for someone who edits the content of `README.md` and wants to regenerate `README.html`.

Check versions like this in your terminal:

```powershell
node --version
git --version
```

A version number means it's installed; a "command not recognized" error means it isn't yet ([Troubleshooting](#troubleshooting) has more).

### A note on environment variables

This plugin has **zero** environment variables (API keys, `.env` files, etc.) that a user needs to configure (confirmed by code review — neither hook script reads `process.env` anywhere). The `${CLAUDE_PLUGIN_ROOT}` placeholder in the hook command is substituted automatically by Claude Code at run time with the plugin's install path; there is nothing for you to set yourself.

---

## How to Download

There are two installation paths, and whether you need a separate "download" step depends on which one you choose.

### Method A — Install straight from GitHub (no download step, recommended)

Claude Code fetches the repository itself at install time, so you never need to manually download files first. Skip ahead to "Install from GitHub" in [Installation](#installation).

### Method B — Download the repository to your computer first, then install locally

1. **Clone with Git (make a full copy of the remote repository on your computer)**

   ```powershell
   git clone https://github.com/sodam-ai/SoDam-Persona.git
   ```

2. **Or download a ZIP without Git**
   - Open the repository's GitHub page in a web browser.
   - Click the green "Code" button, then click "Download ZIP".
   - Extract the downloaded archive into a folder of your choice.

Either way, you end up with every file in this repository (including this `README.md`) inside one folder on your computer — the "repository root." The next step, [Installation](#installation), runs commands from inside this folder.

---

## Installation

### Install from GitHub (recommended)

Launch Claude Code, then type these two lines into the conversation in order (press Enter after each).

```text
/plugin marketplace add sodam-ai/SoDam-Persona
/plugin install sodam-persona@sodam-persona
```

- Line 1 means: "Register this GitHub repository as a candidate source of plugins (a **marketplace**)."
- Line 2 means: "From the registered sources, actually install the `sodam-persona` plugin." In `sodam-persona@sodam-persona`, the part before `@` is the plugin name and the part after is the marketplace it belongs to (here both happen to be `sodam-persona`). If prompted to choose an installation scope (User/Project/Local), pick **User** for personal use.

If the install summary says `Plugin is now active.` it's already applied; if it says `Run /reload-plugins to activate.`, run the command below once more.

```text
/reload-plugins
```

### Install from a local checkout

If you already downloaded the repository using Method B in [How to Download](#how-to-download), launch Claude Code inside that folder (the repository root) and type:

```text
/plugin marketplace add .
/plugin install sodam-persona@sodam-persona
```

`.` (a single period) means "the folder I'm currently in."

### Trust confirmation after installation

Claude Code treats plugins and marketplaces as highly trusted components that can execute code with your user privileges. `/plugin marketplace add` and `/plugin install` prompt you to confirm you trust the source (here, the `sodam-ai/SoDam-Persona` GitHub repository) — only install from sources you trust ([Security & Data Flow](#security--data-flow) has more).

### Verify the installation

```text
/plugin marketplace list
/plugin list
```

The first command shows registered marketplaces; the second shows plugins that are actually installed. If `sodam-persona` appears in both, installation succeeded.

---

## Quick Start

For anyone who already has the prerequisites ready and wants to skip the detailed explanations, here is the 5-step version.

1. Open a terminal and type `claude` to start Claude Code.
2. Type `/plugin marketplace add sodam-ai/SoDam-Persona` and press Enter.
3. Type `/plugin install sodam-persona@sodam-persona` and press Enter. (If it says `Run /reload-plugins to activate.`, also type `/reload-plugins`.)
4. Talk to it normally, in your own language. Example: "Find bugs in this code" — no special commands to memorize; the persona automatically judges natural-language requests and reacts.

If you get stuck, jump straight to [Troubleshooting](#troubleshooting).

---

## How to Run

There is no separate concept of "running the plugin." This plugin **automatically activates the moment you run Claude Code and start a conversation.** In other words, "how to run" is really "how to open Claude Code."

### Run via the Claude Code CLI in a terminal

1. Open a terminal (PowerShell or Command Prompt on Windows; Terminal app on macOS).
2. Type `claude` and press Enter.
3. Once a new session opens, this plugin's SessionStart hook runs automatically at that moment and injects the persona core.

### Run via an IDE (code editor) extension

If you use an IDE extension with Claude Code connected, open the Claude Code panel inside the IDE and start a new session — the same behavior applies.

### A very basic guide for first-time terminal users (Windows)

1. Type `PowerShell` into the search box at the bottom-left of your screen.
2. Click "Windows PowerShell" in the search results to open it.
3. When you see a blinking cursor on the black (or blue) screen, type a command exactly as shown, without mistakes, and press Enter.
4. The result appears on screen. If you see red text that looks like an error, check [Troubleshooting](#troubleshooting).

---

## How to Use

### Using it without memorizing anything (default)

Just talk to Claude Code naturally, the way you normally would. The persona core is always on and applies automatically, and whenever your request matches a specific skill's description, that skill is loaded automatically with no extra step.

```text
Find bugs in this code
Review this logic objectively
What should I check before safely deploying this feature?
```

### Explicitly calling a specific expert perspective

Use the `/sodam-persona:<skill name>` form to invoke it explicitly.

```text
/sodam-persona:persona-investor Review the loss scenarios in this automated trading logic
/sodam-persona:persona-lawyer Find risky clauses in these terms of service
/sodam-persona:persona-accountant Review whether this cost can be treated as a deductible business expense
/sodam-persona:persona-marketer Improve this landing-page copy
/sodam-persona:persona-create Add a new medical-domain persona
/sodam-persona:persona-edit Add "rebalancing" to the investor triggers
```

### Checking which skills are available

Type just `/` into the conversation to see the list of commands and skills currently available. This plugin's entries start with `sodam-persona:`.

### Controlling the response depth yourself

Mixing certain words into your request automatically changes how deep the response goes. The mechanics are explained in [How It Works](#how-it-works).

| What you want | Say this |
|---|---|
| A very short, simple answer | "briefly", "in short", "just the key point" |
| Every expert perspective gathered, in depth | "objectively", "in depth", "thoroughly" |
| Free-form answers with no persona formatting | "just answer plainly", "turn off the persona" |
| Force the entire persona on | "full persona version" |

---

## Commands

### Claude Code plugin-management commands (type into the conversation)

| Command | Description |
|---|---|
| `/plugin marketplace add <source>` | Register a marketplace (a list of plugin candidates). `<source>` is either a GitHub repo like `sodam-ai/SoDam-Persona` or a local folder path like `.` |
| `/plugin marketplace list` | List registered marketplaces |
| `/plugin marketplace update sodam-persona` | Refresh the registered marketplace source to its latest state |
| `/plugin install sodam-persona@sodam-persona` | Actually install the plugin |
| `/plugin list` | List currently installed plugins |
| `/plugin uninstall sodam-persona@sodam-persona` | Remove the plugin |
| `/reload-plugins` | Apply an install/removal immediately, without restarting |

There are also terminal-level commands for scripting outside a session: `claude plugin install sodam-persona@sodam-persona`, `claude plugin marketplace update sodam-persona`, etc. (append the same sub-command after `claude plugin`).

### Persona skill invocations (type into the Claude Code conversation)

| Command | Description |
|---|---|
| `/` (slash alone) | Show the list of commands and skills currently available |
| `/sodam-persona:persona-investor <text>` | Explicitly invoke the professional investor perspective (#13) |
| `/sodam-persona:persona-lawyer <text>` | Explicitly invoke the professional lawyer perspective (#11) |
| `/sodam-persona:persona-accountant <text>` | Explicitly invoke the accounting/tax specialist perspective (#14) |
| `/sodam-persona:persona-marketer <text>` | Explicitly invoke the marketing/sales specialist perspective (#15) |
| `/sodam-persona:persona-create` | Interview-style creation of a new domain persona (the 16th and beyond) |
| `/sodam-persona:persona-edit` | Interview-style add/edit/remove of trigger words for an existing persona |

### Commands for documentation/code editors (run from the repository root)

| Command | Description |
|---|---|
| `node validate.mjs` | Automatically checks consistency: perspective count, trigger pattern count, skill count, domain wiring, disclaimer text, personal path leaks, and more |
| `node build-docs.mjs` | Re-reads `README.md`/`README.en.md` and regenerates `README.html`/`README.en.html` (requires Pandoc) |

---

## How It Works

This section explains the actual rules the persona uses to judge situations, written so you can understand it without reading the code.

### Four response-intensity levels (L0-L3)

Every request is classified into one of the 4 levels below, which determines how deep the response goes.

| Level | Applies to | Response shape |
|---|---|---|
| **L0** | Greetings/small talk, 1-2 word requests, simple status checks ("what did you do?") | 1-3 lines, free tone |
| **L1** | Concept explanations, opinions/advice requests | Core point + rationale + a light check, a firm recommendation plus stated limitations |
| **L2** | General work: code changes, debugging, implementation | The `persona-format` skill activates, following a 7-step procedure |
| **L3** | Major work involving security, money, deployment, or irreversible actions | `persona-format` + `persona-triggers` + `persona-safety` all activate, plus a full review by all 15 perspectives |

### Trigger words — how a single word shifts intensity and perspective

When specific words (triggers) are detected in what you say, the following 6 effects fire automatically as applicable. A single trigger can produce several effects at once.

1. **Raise intensity** — "in depth", "thoroughly", "make sure" → from L1 up to L2/L3
2. **Lower intensity** — "briefly", "in short", "in one line" → always takes priority over every other effect
3. **Load an additional skill** — `persona-triggers` / `persona-format` / `persona-safety`
4. **Activate a domain expert** — investing/money → #13, legal/contracts → #11, accounting/tax → #14, marketing/sales → #15
5. **Fully activate a single perspective** — "security" alone → #2, "design"/"UI" alone → #7, "UX" alone → #8, "testing" alone → #4, "AI"/"agent"/"MCP" alone → #6
6. **Evidence mode** (intensity stays the same) — "evidence", "source", "example", "fact" etc. → present real evidence and clearly separate speculation from confirmed fact

These trigger words are organized into 20 patterns (A-T), and the full word lists plus the priority order for conflicts all live in the `persona-triggers` skill. Priority summary: **length constraints (e.g. "briefly") > intensity (e.g. "in depth") > domain expert > single perspective > additional skill.**

### 15 perspectives — the expert checklist reviewed before every answer

For every response at L1 or above, 3-5 of the 15 perspectives below that are relevant to the task are briefly reviewed internally before answering — automatically, even without a trigger word. This does not apply to L0 small talk or "briefly"-style requests.

| # | Perspective | Especially important when |
|---|---|---|
| 1 | Senior developer (15+ years) | Always on — code quality, maintainability, extensibility |
| 2 | Senior security expert (15+ years) | Always on — threat modeling, auth, encryption, sensitive data |
| 3 | Non-developer / total beginner / no prior experience | Always on — understandability, entry barriers, likelihood of user mistakes |
| 4 | QA/test engineer | Work involving bugs, edge cases, regression testing |
| 5 | DevOps / operations / SRE | Work involving deployment, servers, monitoring, incident response |
| 6 | Data/AI engineer | Work involving models, prompts, agents, MCP |
| 7 | Senior designer | Work involving screen design, layout, color |
| 8 | UX researcher | Work involving user experience, usability, user journeys |
| 9 | Product manager / PO | Work involving requirements, prioritization, MVP scope |
| 10 | C-level / business (25+ years) | Work involving revenue, market, competitive positioning |
| 11 | Professional lawyer (15+ years) | Work involving law, contracts, personal data, licensing |
| 12 | Cost optimization / business operations (15+ years) | Work involving operating cost, API cost, cost-effectiveness |
| 13 | Professional investor (15+ years) | Work involving investing, trading, automated trading |
| 14 | Accounting/tax specialist (15+ years) | Work involving taxes, filings, expense processing (disclaimer required) |
| 15 | Marketing/sales specialist (15+ years) | Work involving copy, ads, conversion, SEO |

### 4 domain experts — conditionally going deep

Among the 15 perspectives above, #11, #13, #14, and #15 each have their own dedicated skill, which loads much deeper knowledge when a related trigger is detected.

- **Professional investor (#13, `persona-investor`)**: Always asks "if this fails, does the user lose money?" Covers edge cases like order rejection and slippage, distinguishes paper mode from live mode, and warns about backtest overfitting.
- **Professional lawyer (#11, `persona-lawyer`)**: Covers audit-log obligations, staying clear of capital-markets-law boundaries (avoiding investment-advisory language), personal-data protection/GDPR, and disclaimer/consent standards.
- **Accounting/tax specialist (#14, `persona-accountant`)**: Covers filing deadlines, expense-eligibility rules, and the line between legal tax savings and illegal tax evasion. **Always includes the disclaimer** "for general information only; please have a licensed tax accountant or CPA confirm before actually filing or paying."
- **Marketing/sales specialist (#15, `persona-marketer`)**: Covers positioning, copywriting, conversion rate, and SEO, while filtering out exaggerated or false advertising claims.

When multiple domains apply at once (e.g., "the tax and legal risk of this investment income"), all relevant domain experts activate together.

### 4 anti-patterns — discipline the persona enforces on itself

1. **Never state a guess as fact without data** — mark hypotheses as "possible" and confirmed facts as "confirmed"
2. **Never reverse a prior answer without reason** — when changing a decision, present new evidence and explain why
3. **Read the user's real intent, not just their literal words first** — "let's remove this feature" may really mean "I want this feature to work properly," and that possibility is checked first
4. **Prefer directly verifiable data (logs, files) over speculation**

### It always pauses before irreversible actions

Actions such as deleting files/folders, force-pushing to git, changing a database, deploying, processing payments, or sending external messages are **never executed automatically — confirmation is always requested first.** This is explained further in [Security & Data Flow](#security--data-flow).

---

## Workflow

### The flow of an ordinary conversation (every session)

```text
1. A Claude Code session starts
       │
       ▼
2. The SessionStart hook runs (inject-core.js)
   → injects the full text of persona_core.md into the session context
     (once per session)
       │
       ▼
3. The user types a message
       │
       ▼
4. The UserPromptSubmit hook runs (inject-marker.js)
   → injects the compact summary in persona_marker.txt every single time
   → this is what re-establishes the persona instantly even after a long
     conversation is compacted or a sub-agent has run
       │
       ▼
5. Claude Code interprets the injected rules together with what the user said
   → decides the response intensity (L0-L3) and matches trigger words
       │
       ▼
6. Matching skills load conditionally
   (whichever of persona-triggers / persona-format / persona-safety /
    the 4 domain skills apply)
       │
       ▼
7. L2/L3 responses follow the 7-step response format (recap → root cause →
   recommended direction → execution steps → verification method →
   cautions → next steps)
       │
       ▼
8. The response is checked against a self-verification checklist before
   being sent
```

### The flow for adding a new domain persona (`/sodam-persona:persona-create`)

```text
1. Call /sodam-persona:persona-create
       │
       ▼
2. An interview proceeds (one question at a time)
   - Field of expertise, English slug, responsibilities, whether a
     disclaimer is required
       │
       ▼
3. 15-30 trigger words are auto-generated → the user confirms them
       │
       ▼
4. Once confirmed, up to 8 files are edited in sync
   (persona-triggers/SKILL.md, persona_core.md, persona_marker.txt,
    a new skill folder, persona-format/SKILL.md, 2 reference docs,
    README.md/README.en.md, validate.mjs)
       │
       ▼
5. Run node validate.mjs → repeat fixes until it prints ✅ PASS
       │
       ▼
6. Guidance on refreshing the install cache (marketplace update →
   uninstall → install → /reload-plugins)
       │
       ▼
7. Only the changed files are precisely staged with git add, then a
   conventional commit is made
   (actual push/PR/merge is never done without explicit user approval)
```

`/sodam-persona:persona-edit` differs in scope (a single table row for a base perspective, versus up to 4-5 locations for a domain persona), but the verify (step 4) → guidance (step 5) flow afterward is the same.

---

## Architecture

### Understanding the plugin concept

A Claude Code "plugin" is a bundle made of these 4 pieces.

- **Marketplace**: a listing file (named marketplace.json) that tells Claude Code where a plugin comes from — either a GitHub repository or a folder path on your computer.
- **Manifest**: a file (named plugin.json) holding the plugin's name, version, and description.
- **Hook**: a small program that runs automatically at a specific moment (such as session start).
- **Skill**: a knowledge document that loads only in specific situations.

### Full repository layout

```text
.
├── .claude-plugin/marketplace.json       # The marketplace definition Claude Code actually reads (source of truth)
├── .github/workflows/validate.yml        # CI: runs validate.mjs automatically on every push/PR
├── LICENSE                               # Full text of the Apache License 2.0
├── NOTICE                                # Copyright, trademark, and third-party attribution notices
├── README.md                             # This document (Korean, source of truth)
├── README.en.md                          # This document in English (source of truth, identical content)
├── README.html / README.en.html          # HTML versions of the two files above, built with build-docs.mjs (identical content)
├── build-docs.mjs                        # Script that regenerates README(.html) from README(.md)
├── doc-theme.html                        # The HTML theme (CSS) used by that script
├── validate.mjs                          # The automated consistency checker
└── plugins/sodam-persona/                # The actual plugin body that gets distributed and installed
    ├── .claude-plugin/plugin.json        # Plugin manifest (source of truth)
    ├── hooks/
    │   ├── hooks.json                    # Registers the SessionStart / UserPromptSubmit hooks
    │   ├── inject-core.js                # Script that runs on SessionStart
    │   ├── inject-marker.js              # Script that runs on UserPromptSubmit
    │   ├── persona_core.md               # The persona core text injected at session start
    │   └── persona_marker.txt            # The compact marker injected on every message
    ├── skills/
    │   ├── persona-format/SKILL.md       # L2/L3 response format
    │   ├── persona-safety/SKILL.md       # Always-on security rules, irreversible-action gate
    │   ├── persona-triggers/SKILL.md     # Full A-T trigger-word detail and the 15-perspective mapping table
    │   ├── persona-investor/SKILL.md     # #13 professional investor domain
    │   ├── persona-lawyer/SKILL.md       # #11 professional lawyer domain
    │   ├── persona-accountant/SKILL.md   # #14 accounting/tax specialist domain
    │   ├── persona-marketer/SKILL.md     # #15 marketing/sales specialist domain
    │   ├── persona-create/SKILL.md       # Entry point for the new-persona creation interview
    │   └── persona-edit/SKILL.md         # Entry point for the trigger-editing interview
    ├── commands/
    │   ├── create.md                     # The procedure persona-create reads and follows
    │   └── edit.md                       # The procedure persona-edit reads and follows
    └── reference/
        ├── persona_full_core.md          # The full persona definition (for full L3 activation / session recovery)
        └── test_scenarios.md             # A set of sample utterances for verifying trigger behavior
```

The `commands/` folder holds the procedure text that the `persona-create`/`persona-edit` skills read and follow.

### The 11 checks performed by the automated consistency checker (`validate.mjs`)

This mechanically prevents numbers from drifting out of sync (for example, when adding a new perspective or changing a trigger). It uses only Node.js built-ins, with no external dependencies.

| # | What it checks |
|---|---|
| 1 | Perspective numbers run consecutively from 1 to the last one, with no gaps |
| 2 | Every occurrence of "15 perspectives"-style wording, across all core files (core, marker, skills, README, etc.), matches the actual perspective count |
| 3 | The count of trigger-pattern letters (A-T) stated in text matches the actual number of sections |
| 4 | The number of skill folders matches what's documented, and each skill's frontmatter `name` matches its folder name |
| 4-1 | The English README's stated skill count and pattern count match the actual numbers, using the same rule |
| 5 | All 4 domain personas (investor, lawyer, accountant, marketer) are wired into both the core file and the marker file |
| 6 | `.claude-plugin/plugin.json`/`.claude-plugin/marketplace.json` are valid JSON, with the correct name and source path |
| 7 | The disclaimer rules required for accounting/tax (#14) and legal (#11) answers actually exist in the source files |
| 8 | (Warning only, not a failure) Whether any of the 4 HTML files look out of date and need regenerating |
| 9 | Whether backtick-wrapped file references inside the documentation actually point to files that exist (broken-link prevention) |
| 10 | Whether a developer's personal absolute computer path (one containing a real user account name) has accidentally leaked into the documentation or plugin files |
| 11 | Whether `hooks.json` correctly uses the Claude Code variable `${CLAUDE_PLUGIN_ROOT}` (preventing another host's variable name from slipping in) and whether the hook scripts it references actually exist |

See [Commands](#commands) and [Troubleshooting](#troubleshooting) for how to run this and read its output.

### Continuous integration (CI)

`.github/workflows/validate.yml` automatically runs `node validate.mjs` on every push to `main` and on every pull request, blocking any change that fails the 11 checks above from reaching `main`.

---

## Security & Data Flow

### What the hooks do / do not do

| Do | Do not |
|---|---|
| Read fixed text files inside the plugin folder (`persona_core.md`, `persona_marker.txt`) | Make any network connection anywhere |
| Emit the file contents to standard output in a fixed JSON shape | Build and run code on the fly (`eval`) |
| Fully drain the hook metadata the host sends over stdin before responding (purely to avoid an EPIPE error on very large prompts — the content is never stored or used) | Launch any external program |
| | Write or delete any file |
| | Collect or transmit user data anywhere |

### The trust-approval procedure

Claude Code treats plugins and marketplaces as highly trusted components that can run code with your user privileges, and asks you to confirm you trust the source at install time. This procedure belongs to the Claude Code platform itself, and the plugin cannot skip it.

### The irreversible-action gate is a "behavioral guideline," not a "system firewall"

In front of irreversible actions — deletion, deployment, force-pushing, external messaging — this persona instructs Claude Code to adopt the **response habit and judgment standard** of "don't run it automatically; ask the user first." This is not a mechanism that physically blocks filesystem access; it is a rule layered on top of the approval/permission system Claude Code already has (tool-use permission prompts, etc.), saying "always stop and ask in these situations." The actual final execution authority and approval process always follow Claude Code's own platform policy.

### Where data actually flows

```text
The sentence the user typed
        +
The persona rule text the plugin injected (read from a local file)
        │
        ▼
The conversation context is sent to the AI model (Claude) that Claude Code uses
   (this happens regardless of this plugin — it is simply how Claude Code
    normally operates)
        │
        ▼
A response is generated and returned to the user
```

The plugin itself sends nothing to any server or remote storage of its own. It does not collect personal data, keep remote usage logs, or perform any separate analytics (telemetry). That said, as long as you use Claude Code at all, your conversation content being sent to its AI model provider (Anthropic) happens regardless of this plugin, and Anthropic's own official privacy policy governs how it's handled.

### Habits around personal and sensitive data

- The persona is designed to warn immediately if sensitive data such as API keys, passwords, or tokens appears in code or conversation.
- Places it checks for sensitive-data exposure: code, GitHub, logs, on-screen output, documents, commit history, error messages.
- Responses in the accounting/tax and legal domains, which deal with personal and financial information, always carry a required disclaimer.

### A built-in self-consistency safeguard

Check #10 in `validate.mjs` automatically catches a developer's personal computer path (one containing a real user account name) that accidentally leaked into this repository's documentation or plugin files, before it reaches a public repository. This document, along with every other distributed document here, is kept in a state that passes this check.

---

## Files & Documentation Map

| What you're looking for | Where it is |
|---|---|
| This document (Korean) | Repository root, `README.md` / `README.html` |
| This document (English) | Repository root, `README.en.md` / `README.en.html` |
| Full license text | Repository root, `LICENSE` |
| Copyright, trademark, and third-party attribution notice | Repository root, `NOTICE` |
| The actual plugin body that gets installed | `plugins/sodam-persona/` |
| The always-on persona core text | `plugins/sodam-persona/hooks/persona_core.md` |
| The compact marker injected on every message | `plugins/sodam-persona/hooks/persona_marker.txt` |
| The full trigger-word list and perspective mapping table | `plugins/sodam-persona/skills/persona-triggers/SKILL.md` |
| Detail on the 4 domain experts | `plugins/sodam-persona/skills/persona-investor|lawyer|accountant|marketer/SKILL.md` |
| The original procedure text for creating/editing personas | `plugins/sodam-persona/commands/create.md`, `edit.md` |
| The consistency-check script | Repository root, `validate.mjs` |
| The HTML-regeneration script | Repository root, `build-docs.mjs`, `doc-theme.html` |
| The Claude Code marketplace definition (source of truth) | `.claude-plugin/marketplace.json` |
| The CI (automated check) configuration | `.github/workflows/validate.yml` |

> Any folder not listed here (for example, local cache or scratch-note files created during development) is excluded from the repository via `.gitignore` and simply does not exist for anyone who freshly downloads this plugin, so this document does not cover it.

---

## Changelog Summary

Listed with the most recent entries at the top. Click (or tap) an item to expand its details.

<details>
<summary><strong>2026-08-17 — Reverted to Claude Code only</strong></summary>

- Decided to maintain Codex support independently in a separate repository — this repository is confirmed as a Claude Code-only plugin again.
- Removed Codex-specific files: `.codex-plugin/plugin.json`, `.agents/plugins/marketplace.json`, and related references.
- **Critical bug fix**: during the Codex port, `hooks.json`'s Claude Code variable `${CLAUDE_PLUGIN_ROOT}` had been mistakenly changed to Codex's `${PLUGIN_ROOT}` convention — in that state, the hooks never actually ran under Claude Code. Restored the original variable name.
- Fully updated README command references to Claude Code's real command set (`/plugin marketplace add`, `/plugin install`, `/reload-plugins`, etc., verified against official documentation).

</details>

<details>
<summary><strong>2026-08-09 — Official Codex marketplace packaging (removed by the 2026-08-17 reversion)</strong></summary>

- Added `.agents/plugins/marketplace.json` — formally split out the marketplace definition Codex actually reads.
- Bumped the plugin version to `1.1.1`.

</details>

<details>
<summary><strong>2026-08-04 — Documentation trust hardening (broken-link and personal-path leak prevention)</strong></summary>

- Removed 2 dead references pointing to the already-retired GUIDE.md/GUIDE.en.md documents.
- Removed a real personal computer path that had accidentally been left in `persona-triggers/SKILL.md`.
- Added 2 new checks to `validate.mjs`: "do in-document file references actually exist" (#9) and "has a personal absolute path leaked" (#10). CI now catches the same mistake automatically if it happens again.

</details>

<details>
<summary><strong>2026-07-27 — Added the ability to create and edit personas through an interview</strong></summary>

- Added the interview-style `$persona-create` and `$persona-edit` skills — you can now add a new domain expert or edit existing trigger words through conversation, with no coding required.
- Added input validation for the new persona's name (English slug) — prevents a badly formatted answer from being used directly in a file path (blocks path-traversal risk).
- Retired the separate "beginner guide (GUIDE)" document and folded it into this single README.

</details>

<details>
<summary><strong>2026-07-26 — Documentation tooling and stability hardening</strong></summary>

- Added the `build-docs.mjs` script, which regenerates `README.html`/`README.en.html` identically whenever `README.md`/`README.en.md` is edited.
- Softened hook behavior so that a missing required file causes a quiet, clean exit instead of a raw crash.

</details>

<details>
<summary><strong>2026-07-11 — A major overhaul: expanded perspectives, automated checks, finalized license</strong></summary>

The single day with the largest cluster of changes in this project's history.

- Expanded perspectives from 13 → 14 (added the accounting/tax specialist) → 15 (added the marketing/sales specialist).
- Substantially expanded high-frequency trigger words for the accounting/tax (#14) and legal (#11) domains.
- Reinforced trigger words for 5 existing perspectives (without changing the total perspective count).
- Introduced the `validate.mjs` consistency checker for the first time, wired into GitHub Actions (CI).
- Discovered in live testing that accounting/tax and legal answers were missing their required disclaimer → escalated it into an always-injected, mandatory rule.
- Removed a real developer computer path that had been left inside the repository.
- Added the Apache License 2.0 and a `NOTICE` file for the first time (copyright holder: SoDam AI Studio).
- Fully reworked the Korean/English README and GUIDE documents for public distribution (added installation steps, architecture, security/data flow, license, and trademark guidance).
- Unified the project name from `persona-plugin` to `sodam-persona`.
- Excluded 4 internal backlog documents that were never meant for distribution, via `.gitignore`.

</details>

<details>
<summary><strong>2026-06-17 ~ 2026-06-20 — Added the irreversible-action gate and a self-verification gate</strong></summary>

- Introduced trigger pattern (R): detects irreversible actions such as deploy, delete, migrate, merge, and release, and forces mandatory confirmation instead of automatic execution.
- Added a self-verification completion gate that checks "did real verification (running, testing, building) actually happen before saying it's done?"

</details>

<details>
<summary><strong>2026-06-16 — Project launch (first released as a Claude Code plugin)</strong></summary>

- First packaged persona v5 as a plugin for Claude Code (the target platform at the time).
- Wrote the first detailed beginner-oriented README and GUIDE documents.
- Added 29 trigger words (pattern Q) that demand evidence, sources, and proof — the starting point of the discipline against stating speculation as fact.

This project was later ported to be Codex-only, becoming today's `SoDam Persona for Codex`.

</details>

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `/plugin marketplace add .` fails | You ran it from somewhere other than the repository root, or `.claude-plugin/marketplace.json` is missing | Move into the folder you downloaded the repository into (where `README.md` is visible) and try again |
| "Marketplace not found" while reinstalling | `uninstall` was run before `update`, which erased the marketplace registration itself | Always follow the order **`update` → `uninstall` → `install`**. Reversing the order reproduces this error |
| Installed, but the persona doesn't seem active at all | You missed the trust confirmation, or didn't run `/reload-plugins` after installing | Check with `/plugin list` → run `/reload-plugins` → if still not working, start a fresh session |
| You edited the plugin's code, but the change isn't reflected in conversations | The install cache does not refresh automatically just because a file changed | Reinstall in this order: `/plugin marketplace update sodam-persona` → `/plugin uninstall sodam-persona@sodam-persona` → `/plugin install sodam-persona@sodam-persona` → `/reload-plugins` |
| Typing `node` in the terminal gives a "command not recognized" error | Node.js isn't installed, or the terminal wasn't reopened after installing it | Install from `nodejs.org`, then close every open terminal window and open a new one |
| `node build-docs.mjs` says "pandoc is not installed" | Pandoc is missing | Only needed if you're editing the documentation yourself. If you're just *using* the plugin, this error is safe to ignore. To fix it, install from `pandoc.org/installing.html` |
| `/plugin marketplace add sodam-ai/SoDam-Persona` fails with a network error | Git isn't installed, the repository name is mistyped, or a firewall/proxy is blocking it | Check Git with `git --version`, double-check the repository name's spelling, and check proxy settings if you're on a corporate/school network |
| `node validate.mjs` prints `❌ FAIL` | Some number — perspective count, trigger count, skill count, etc. — has drifted out of sync, usually while adding or editing a persona | Read the printed error list line by line, open the referenced file, and fix the number, then rerun. See the "11 checks" table in [Architecture](#architecture) for what each numbered check means |
| An accounting/tax or legal answer is missing its disclaimer | Very likely a real defect, not expected behavior | Please report it via the repository's GitHub Issues. `validate.mjs` check #7 exists specifically to prevent this regression, so also confirm you're on the latest version |
| A path-related error appears when typing a command into Windows PowerShell | Quotation marks or backslashes changed while being retyped by hand | Copy this document's code blocks and paste them directly instead of typing them manually |
| The persona feels like it's drifted after a long session | This is expected — the marker is re-injected on every message by design, to auto-recover the persona | No action needed. If it still feels off, start a new session |
| A plugin skill name doesn't show up | The install cache may be stale after this restructuring | `rm -rf ~/.claude/plugins/cache`, restart Claude Code, then reinstall using the steps above |

---

## Frequently Asked Questions (FAQ)

**Q. Is this plugin free?**
A. Yes. It's free and open source under the Apache License 2.0, usable for both personal and commercial purposes. See [Legal, Copyright, License, and Commercial Use](#legal-copyright-license-and-commercial-use) for the details.

**Q. Can it delete or change files on my computer on its own?**
A. No. Aside from reading 2 fixed text files inside the plugin folder, the hooks never write or delete any file. Irreversible actions such as deletion or deployment are always designed to ask the user for confirmation first. See [Security & Data Flow](#security--data-flow) for details.

**Q. Do I need an internet connection?**
A. Claude Code itself needs the internet to talk to an AI model. The plugin's hooks themselves only read local files and don't make any separate network connection.

**Q. Can I use the accounting/tax or legal answers instead of consulting a real professional?**
A. No. This persona is not an actually licensed tax accountant, CPA, or lawyer. It exists to provide reference information only, and any actionable decision (filing, contract interpretation, etc.) must be confirmed by a real professional first. This is why a disclaimer is always shown alongside such answers.

**Q. Does it work with Codex too?**
A. No. Codex support is maintained independently in a separate repository, and this repository is maintained for Claude Code only. If you use Codex, please check that separate repository instead.

**Q. Can I install it on multiple computers?**
A. Yes. The plugin is designed to be self-contained, so it behaves identically on a brand-new computer with nothing more than a fresh install — no separate personal config files or memory needed.

**Q. I want to add or change trigger words myself.**
A. Call `/sodam-persona:persona-edit` (to edit an existing perspective) or `/sodam-persona:persona-create` (to add a completely new field of expertise) and follow the interview. See [How to Use](#how-to-use) and [Workflow](#workflow).

**Q. The persona answers too long / too heavily.**
A. Mixing in words like "briefly", "in short", or "just the key point" switches it to a short format immediately. This rule has the highest priority of all.

**Q. I actually want it to go deeper and more thorough.**
A. Using expressions like "objectively", "in depth", "thoroughly", or "full persona version" brings all 15 perspectives into the review.

**Q. I found a bug or something misbehaving. Where do I report it?**
A. Please report it through the repository's GitHub Issues feature. Including a reproducible example of what you typed speeds up diagnosis a lot.

**Q. Can I take this plugin's code and put it into my own commercial product?**
A. Yes, the Apache License 2.0 explicitly allows this. There are a few conditions, though — including a license copy, marking changed files, and keeping notices intact. See [Legal, Copyright, License, and Commercial Use](#legal-copyright-license-and-commercial-use) for the conditions. This is a plain-language summary, not legal advice.

**Q. Is this an official feature made by Anthropic?**
A. No. This project has no affiliation with or sponsorship from Anthropic. It's an independent community plugin. "Claude" and "Claude Code" are trademarks of their respective owners, used in this document purely to refer to those products (nominative use).

**Q. If a long session gets compacted, or goes through a sub-agent, does the persona disappear?**
A. No. The `UserPromptSubmit` hook is designed to re-inject its compact marker on every single message, which automatically restores the persona even in those situations.

---

## Legal, Copyright, License, and Commercial Use

> The following is a plain-language summary meant to aid understanding. **It is not legal advice.** The legally binding original text lives in this repository's `LICENSE` and `NOTICE` files. If you plan to redistribute this commercially or need a legal judgment call, independent legal review is recommended (this guidance is also stated in the `NOTICE` file itself).

### License: Apache License 2.0

- **Copyright holder**: Copyright 2026 SoDam AI Studio
- **Full text location**: Repository root, `LICENSE`

The Apache License 2.0 **explicitly permits** the following 4 things.

| Permission | Meaning |
|---|---|
| Commercial use | You may use this code as-is in a business, or include it in a product you sell |
| Modification | You are free to change the code |
| Distribution | You may redistribute it to others, either as-is or modified |
| Patent use | You are also granted a license to use any related patent rights held by contributors |

In exchange, you **must** meet the following conditions.

| Condition | Meaning |
|---|---|
| Include a copy of the license | If you redistribute this code (or part of it), you must include a full copy of the Apache License 2.0 |
| State any changes made | If you modified the original, you must prominently mark the modified files as changed |
| Keep copyright/patent/trademark notices | You must retain the copyright, patent, and attribution notices from the original source instead of deleting them |
| Include a copy of the `NOTICE` file | Since the original includes a `NOTICE` file, you must pass along its notices when redistributing (in your own `NOTICE` file, documentation, or on-screen display) |

And it is important to be clear about what is **not** guaranteed (a summary of the original's sections 7 and 8).

- This software is provided **"AS IS,"** without any warranty of any kind, including merchantability or fitness for a particular purpose.
- The copyright holder and contributors are not liable for any damages arising from the use of this software (including loss of business, work stoppage, computer failure, and similar).
- Assessing the suitability of using or redistributing this software, and bearing any resulting risk, is entirely the user's own responsibility.

### Copyright and third-party attribution (summary of the `NOTICE` file)

- This project references the following ideas only as **short, attributed quotations**; it reimplements the underlying concepts in its own words and does not bundle or redistribute any third-party source code.
  - "Chesterton's Fence" — attributed to G. K. Chesterton
  - "Hyrum's Law" — attributed to Hyrum Wright
  - Goal-Driven Execution — a short phrase attributed to Andrej Karpathy

### Trademark notice

Product and company names mentioned in this document and project — including "Claude," "Claude Code," "Anthropic," "Codex," "OpenAI," "GitHub," and "Node.js" — are trademarks or registered trademarks of their respective owners. This project is an independent work with no affiliation, sponsorship, or endorsement from any of them; these names are used solely to refer to the respective products (nominative use).

### An important legal notice about the domain-expert personas

The professional investor (#13), professional lawyer (#11), accounting/tax specialist (#14), and marketing/sales specialist (#15) personas in this plugin are **not actual licensed professionals — they are software settings that adjust Claude Code's AI response style.**

- Investment/trading-related answers are not investment advice; full responsibility for actual investment decisions and their outcomes rests with the user.
- Legal-related answers are not legal advice and carry no guarantee of legal effect. Have a lawyer confirm before acting on any contract, regulatory, or compliance judgment.
- Accounting/tax-related answers are for general information only; a licensed tax accountant or CPA must give final confirmation before actually filing or paying anything.
- Marketing-related answers attempt to filter out language that could amount to exaggerated or false advertising, but the user must independently review compliance with actual advertising/labeling law before publishing anything.

### Things to check before using AI-generated content (code, docs, etc.)

- This plugin only adjusts Claude Code's response style — it does not guarantee or judge the copyright status of the code, documents, or explanations Claude Code actually generates.
- Before including an AI-generated result in a commercial product, service, or client deliverable, **you must check yourself** whether:
  - the result is not substantially similar to an existing copyrighted work (risk of infringement),
  - the terms of service of the AI service you used (Claude Code/Anthropic, etc.) permit commercial use of that result, and
  - the result doesn't conflict with the license terms of any open-source code it may have drawn on.
- The rule documents in this plugin were themselves written and refined through an iterative process using AI coding tools. This doesn't affect the validity of the license (Apache License 2.0), but it is disclosed here for transparency.

### External services, API pricing, and model-usage policies must be checked separately

This plugin is only a set of configurations that runs on top of the external platform Claude Code — it does not describe or guarantee Claude Code/Anthropic's pricing, model-usage policy, or terms of service. Check the items below directly through **that service's own official channels**, not this document.

- Claude Code/Anthropic's pricing plans and usage limits
- The model-usage policy (permitted/prohibited use cases)
- Claude Code/Anthropic's terms of service and privacy policy
- Whether reselling or reusing Claude's responses in a commercial service has any separate conditions attached

### Verified: no image/font/third-party dependency license conflicts

Here is the result of scanning this repository's entire code and documentation (as of 2026-08-09).

| Check | Result |
|---|---|
| Dependency manifests such as package.json, package-lock.json, pnpm-lock.yaml, yarn.lock, requirements.txt, pyproject.toml, Cargo.toml, go.mod | **Zero found** repository-wide — there are no external library dependencies, so there is no third-party license conflict risk to begin with |
| Image/icon/font/video/audio files (png, svg, ico, woff, ttf, mp4, mp3, etc.) | **Zero found** repository-wide |
| assets, public, static, samples, examples, fixtures folders | **Zero found** repository-wide |
| Whether the hook scripts (inject-core.js, inject-marker.js) use any external package | They use only Node.js built-in modules — **zero** external package imports/requires |

In other words, this plugin consists purely of code and documentation text, so as of now there are no commercial-use restrictions arising from image, font, or third-party package licensing. If images or dependencies are added later, this table will need to be re-checked.

### Commercial use summary

**One-line summary for absolute beginners**: using it as-is, modifying it, cloning/forking it, redistributing it, selling it, running a service on it, using it as training material, and delivering it to a client are all allowed. The only thing you may not do is impersonate the "SoDam" brand itself as your own.

| What you want to do | Allowed? | Conditions |
|---|---|---|
| Use this plugin as-is at a company or in personal work | Yes | None |
| Clone it or fork it on GitHub into your own account | Yes | None (follow the "conditions" below if you redistribute it to others) |
| Modify it and include it in your own commercial product/service | Yes | Follow the "conditions" table above (license copy, marking changes, keeping notices) |
| Repackage this code and resell it | Yes | Same as above. The Apache License 2.0 does not forbid charging money for redistribution itself |
| Run a service (e.g. SaaS) built on top of this plugin | Yes | Follow the "conditions" table above. To avoid your service being mistaken for real investment/legal/tax advice, it's recommended to also surface the "important legal notice about the domain-expert personas" above to your service's own users |
| Use it as training material (courses, tutorials, internal company training) | Yes | None (follow the "conditions" table above if you redistribute the material itself) |
| Include it in a deliverable you hand off to a company or client | Yes | Follow the "conditions" table above. The license copy and NOTICE notices must also reach the client |
| Distribute your product under the "SoDam" / "sodam-ai" brand name as if it were your own | **Not recommended** | The license grants rights to the code, not to the trademark (see the original's section 6). Clearly distinguish the original brand's source |

### What you must not do (summary)

- Impersonate the "SoDam"/"sodam-ai" brand name as if it were something you created, and distribute it that way
- Redistribute a modified version without including a license copy and the NOTICE notices
- Make a filing, contract, or investment decision based solely on the accounting/tax, legal, or investor domain persona's answer, without an actual professional's confirmation
- Reuse third-party copyrighted material that may be embedded in Claude Code's generated output commercially, as-is, without checking its source

If you have a specific situation in mind, please read the `LICENSE` and `NOTICE` originals in the repository directly, and consult a lawyer for any commercial-redistribution scenario you're not fully certain about.
