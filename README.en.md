# SoDam-Persona

> **One-line summary**
> A plugin that gives Claude Code (an AI coding tool) **"your own AI development-partner personality (persona)."**
> Install once and it **turns on automatically every time**; moving to a new computer takes just **a few commands** to restore.

> **Who is this for?**
> Written so that even people **new to computers, AI, and GitHub** can follow along — every term is explained.
> For the beginner-friendly guide, troubleshooting, and FAQ, see **[GUIDE.en.md](./GUIDE.en.md)**.
> Korean docs: **[README.md](./README.md)** · **[GUIDE.md](./GUIDE.md)**

> **License** · Apache-2.0 (commercial use allowed · see [Section 17](#17-license--copyright--commercial-use))  ·  **Public** repository  ·  © 2026 SoDam AI Studio

---

## 📑 Table of Contents
1. [What is this? (understand in 3 min)](#1-what-is-this-understand-in-3-min)
2. [Basic terms first (for beginners)](#2-basic-terms-first-for-beginners)
3. [Prerequisites & required programs](#3-prerequisites--required-programs)
4. [Download & quick start (3 lines)](#4-download--quick-start-3-lines)
5. [Detailed install (step by step)](#5-detailed-install-step-by-step)
6. [Running & usage (just talk to it)](#6-running--usage-just-talk-to-it)
7. [How it works (the principle, simply)](#7-how-it-works-the-principle-simply)
8. [Workflow (typical flow)](#8-workflow-typical-flow)
9. [Architecture (at a glance)](#9-architecture-at-a-glance)
10. [Security & data flow](#10-security--data-flow)
11. [Command reference (full)](#11-command-reference-full)
12. [Files & document locations](#12-files--document-locations)
13. [Update summary (expandable)](#13-update-summary-expandable)
14. [Troubleshooting](#14-troubleshooting)
15. [FAQ (summary)](#15-faq-summary)
16. [Safety · backup · removal (rollback)](#16-safety--backup--removal-rollback)
17. [License · copyright · commercial use](#17-license--copyright--commercial-use)

---

## 1. What is this? (understand in 3 min)

- **Claude Code** is an **AI coding tool you command in natural language** on your computer. Say "build this" or "fix this error," and the AI does the work for you.
- This plugin (`sodam-persona`) gives that AI a **fixed personality and working rules**:
  - A **careful partner who helps non-developers** (explains jargon, confirms risky actions first)
  - Balanced review from **15 expert perspectives** (development, security, design, investor, lawyer, accounting/tax, marketing, etc.)
  - **Context triggers**: words like "objectively," "investment," "security" automatically deepen the response
  - **Mandatory disclaimer**: tax/legal questions automatically include a "consult a professional" notice
- **Why a plugin?** To **move this personality to a new computer in one go**. Previously the settings were scattered and hard to migrate.

---

## 2. Basic terms first (for beginners)

| Term | Plain meaning |
|---|---|
| **Terminal / CLI** | The black window where you type commands (where Claude Code runs) |
| **Claude Code** | The AI coding tool you command in natural language (the host this plugin installs into) |
| **plugin** | A "bundle of parts" you can plug in and out |
| **marketplace** | The "catalog/warehouse" that holds plugins |
| **hook** | A device that runs **automatically** at a certain moment (e.g., session start) → handles "always-on" |
| **skill** | A knowledge bundle loaded **only when needed** → handles "context depth" |
| **repository (repo)** | An online storage for code/files (here, GitHub's `SoDam-Persona`) |
| **cache** | A **copy kept for speed** (the installed version lives here) |
| **restart** | Fully quitting and relaunching Claude Code (hooks are read only at startup) |

---

## 3. Prerequisites & required programs

You need the following on a new computer. **This repo is Public, so it installs without login.**

| Program | Why needed | Check (type in terminal) | If missing |
|---|---|---|---|
| **Claude Code** | The host the plugin installs into | `claude --version` | Install at [claude.com/claude-code](https://claude.com/claude-code) |
| **Node.js** | Used by the plugin's hooks | `node --version` | Usually required by Claude Code. Otherwise install LTS from [nodejs.org](https://nodejs.org) |
| **Git** *(optional)* | Only if you want to **modify** the content (to clone the repo) | `git --version` | [git-scm.com](https://git-scm.com). **Not needed for plain use** |

> ✅ **For plain use** you only need Claude Code + Node.js. (Method 4 below installs directly, no Git/download required.)
> OS: Windows / macOS / Linux all supported.

---

## 4. Download & quick start (3 lines)

**Easiest way — install straight from GitHub (no download/Git needed).**
Paste these into the Claude Code **input box**, one line at a time, pressing Enter:

```
/plugin marketplace add sodam-ai/SoDam-Persona
/plugin install sodam-persona@sodam-persona
/reload-plugins
```

- Line 1 → `Successfully added marketplace: sodam-persona`
- Line 2 → `Installed sodam-persona. Run /reload-plugins to apply.`
- Line 3 (or **restart Claude Code**) → the persona is **always on**. Done!

> 📌 `sodam-persona@sodam-persona` is **pluginName@marketplaceName** (both set to match). Type it as-is.
> 📌 `/reload-plugins` usually applies changes, but a **restart** is recommended to be sure.

---

## 5. Detailed install (step by step)

**Step 1 — Check Claude Code**
Type `claude --version` in the terminal → a version number means OK. If not, install Claude Code first.

**Step 2 — Register the marketplace**
In the Claude Code input box:
```
/plugin marketplace add sodam-ai/SoDam-Persona
```
→ Success when you see `Successfully added marketplace: sodam-persona`.

**Step 3 — Install the plugin**
```
/plugin install sodam-persona@sodam-persona
```
→ Success when you see `Installed sodam-persona`.

**Step 4 — Apply (restart recommended)**
```
/reload-plugins
```
Or **fully quit and relaunch** Claude Code. (Hooks work from the new session.)

**Step 5 — Verify**
```
/plugin
```
If `sodam-persona` appears in the list, install is complete. (In a terminal: `claude plugin list`.)

> ⚠️ **Order pitfall**: If you previously uninstalled it, the marketplace registration is also gone, so `install` says *"Marketplace not found."*
> → Always follow **`marketplace add` (register) → `install` → `/reload-plugins` (apply)**.

---

## 6. Running & usage (just talk to it)

**No special command needed — ask questions as usual and the persona applies automatically.**

- e.g. `Why isn't this code working?` → instead of guessing, it checks data first, then answers in root-cause → fix → verify order.
- **Words that turn it up (triggers):**
  - `Review this objectively and deeply` → balanced review across 15 perspectives
  - `Review this trade/investment` → 15-yr+ investor perspective
  - `Check this contract/terms` → 15-yr+ lawyer perspective (+ automatic disclaimer)
  - `Look at this VAT/tax` → 15-yr+ accounting/tax perspective (+ **automatic disclaimer**)
  - `Review this landing copy` → 15-yr+ marketing/sales perspective
  - `From a security standpoint` / `design` / `UX` / `testing` → focused expert perspective
- **Want it short:** `briefly`, `short`, `one line` → shorter answers.
- **Turn it off briefly:** `just answer`, `persona off` → answers without formatting.

---

## 7. How it works (the principle, simply)

The persona has two parts.

| Part | When it activates | How |
|---|---|---|
| **Always-on (core)** | Every session, every input | A **hook** auto-injects the personality/rules into the AI |
| **On-demand (expert detail)** | Only when specific words appear | A **skill** loads just the knowledge needed then |

- So it's **lightweight** normally, and **only that part deepens** when topics like "investment"/"security" appear (no token waste).
- **Key design**: what must always be on goes in a hook (skills can't auto-load every time); what's occasional goes in a skill — this split is the backbone.

---

## 8. Workflow (typical flow)

```
[New PC] Install (4·5) → restart → use as usual
                                      │
                    Want to edit it ──┘
                                      ▼
   clone repo → edit files → marketplace update → reinstall → restart → git push
```

> ⚠️ **Most common pitfall**: after editing plugin files, if you **skip reinstall (or marketplace update)**, the old version stays on — because the installed copy is a "cache." See [Section 14](#14-troubleshooting).

---

## 9. Architecture (at a glance)

```
Claude Code (host)
   │
   │ ① session start          ② every input
   ▼                          ▼
[SessionStart hook]      [UserPromptSubmit hook]
 inject-core.js           inject-marker.js
   │ reads                   │ reads
   ▼                          ▼
 persona_core.md          persona_marker.txt
 (personality, L0–L3,      (7 self-checks, trigger summary,
  15 perspectives,          compaction recovery,
  trigger source, disclaimer)  mandatory disclaimer)
   │
   │ ③ only when a trigger word is detected
   ▼
[7 skills] ── persona-triggers / persona-format / persona-safety
           └─ persona-investor / persona-lawyer / persona-accountant / persona-marketer
```

- **Source of truth = `persona_core.md` alone.** Skills hold only its **extended detail**, preventing duplication/drift.
- **Path approach**: hook scripts read files via `__dirname` (relative to themselves), so they **don't break even if paths differ** on a new PC. → key to "one-shot migration."
- **Composition**: 15 perspectives · 20 trigger patterns (A–T) · 7 skills · 2 hooks. (Consistency is auto-checked by `validate.mjs`.)

---

## 10. Security & data flow

**In one line: this plugin only reads "text" and hands it to the AI. No secrets, no external communication, no file changes.**

- **Data flow**: `persona_core.md`/`persona_marker.txt` (text) → hook **only reads** → injected into Claude Code's context. That's all.
- **No secrets**: not a single API key, token, password, `.env`, certificate, or private key (only personality text).
- **No external communication**: after install, it runs **fully local**. The internet is used **only for install (download)**.
- **Zero dependencies**: no external libraries (`node_modules`), so there is no supply-chain attack surface.
- **Least privilege**: hooks read **only fixed files in their own folder** (no path manipulation, command execution, deletion, or writing).
- **Verified**: secret scan (`git grep`) 0 hits · no `eval`/`exec`/network in hook code · JSON manifests valid · `validate.mjs` passes — all actually checked.

---

## 11. Command reference (full)

In the Claude Code **input box** (starts with `/`):

| Command | Description |
|---|---|
| `/plugin` | Plugin management menu (click to install/remove) |
| `/plugin marketplace add sodam-ai/SoDam-Persona` | Register the marketplace from GitHub (no download) |
| `/plugin marketplace add (local folder path)` | Register a downloaded folder as a marketplace (for editing) |
| `/plugin install sodam-persona@sodam-persona` | Install the plugin |
| `/reload-plugins` | Apply changes immediately |

In the **terminal** (`claude plugin ...`):

| Command | Description |
|---|---|
| `claude plugin list` | List installed plugins and active state |
| `claude plugin details sodam-persona` | Components (skills/hooks) + estimated token cost |
| `claude plugin enable sodam-persona@sodam-persona` | Enable |
| `claude plugin disable sodam-persona@sodam-persona` | Disable |
| `claude plugin uninstall sodam-persona@sodam-persona` | Uninstall |
| `claude plugin marketplace update sodam-persona` | Refresh from source (required after edits) |
| `claude plugin marketplace remove sodam-persona` | Unregister the marketplace |
| `claude plugin validate (plugin path)` | Validate plugin format |

---

## 12. Files & document locations

**Repository structure** (inside this folder):
```
SoDam-Persona/
├── README.md / README.en.md            ← this document (KO/EN)
├── GUIDE.md  / GUIDE.en.md             ← beginner guide & FAQ (KO/EN)
├── LICENSE                             ← full Apache-2.0 text
├── validate.mjs                        ← consistency checker (zero deps)
├── .github/workflows/validate.yml      ← auto-check on every push (CI)
├── .claude-plugin/marketplace.json     ← marketplace definition
└── sodam-persona/                      ← the actual plugin (the only one here)
    ├── .claude-plugin/plugin.json       ← plugin info
    ├── hooks/                           ← always-on
    │   ├── hooks.json                     (when to run what)
    │   ├── inject-core.js / inject-marker.js  (injection scripts)
    │   ├── persona_core.md                (personality/strength/15 perspectives/triggers/disclaimer — source)
    │   └── persona_marker.txt             (per-input self-check marker)
    ├── skills/                          ← on-demand (7)
    │   ├── persona-triggers/  persona-format/  persona-safety/
    │   └── persona-investor/  persona-lawyer/  persona-accountant/  persona-marketer/
    └── reference/                       ← reference material (not auto-loaded; for migration/verification)
```

**Actual installed location** (where Claude Code keeps its copy):
- Windows: `C:\Users\(user)\AppData\Roaming\claude-code\plugins\cache\sodam-persona\sodam-persona\(version)\`
- macOS/Linux: `~/.config/claude-code/plugins/cache/sodam-persona/...` (varies by environment)
- 👉 **Edit in the repo folder** and reflect into this cache via **marketplace update + reinstall** (don't edit the cache directly).

---

## 13. Update summary (expandable)

<details>
<summary><b>v1.0.0 — current (click to expand)</b></summary>

- Established the **15 expert perspectives** (only #10 C-level is 25-yr+; the rest 15-yr+; #3 non-developer user has no year)
- **20 trigger patterns (A–T)** + 4 domain-persona skills: investor (#13), lawyer (#11), accounting/tax (#14), marketing (#15)
- **Mandatory disclaimer**: accounting/tax (#14) and legal (#11) actionable answers automatically include a "consult a professional" notice (encoded in the always-on layer)
- **Automatic consistency check** `validate.mjs` + GitHub Actions CI — verifies perspective count, pattern count, skill count, domain wiring, and disclaimer presence on every push
- **Self-contained migration**: hooks work via `__dirname`, so they restore on a new PC without any memory files

</details>

<details>
<summary><b>Design principles (click to expand)</b></summary>

- **Single source of truth in the core** (`persona_core.md`) — skills hold only extended detail; the duplicated wording is intentional (for token savings)
- **4 strength levels** L0 (chat) → L1 (explanation) → L2 (implementation) → L3 (security/money/deploy/irreversible)
- **7 self-checks** applied on every input (no guessing / consistency / meta-intent / length preservation / mark the unverified / trigger detection / self-correction)

</details>

---

## 14. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| **Persona seems off** | Not installed / disabled / not restarted | Check via `/plugin` (or `claude plugin list`) → if missing, reinstall ([Section 4](#4-download--quick-start-3-lines)) → **restart** |
| **`install` says "Marketplace not found"** | No marketplace registration (e.g., after removal) | First `/plugin marketplace add sodam-ai/SoDam-Persona` → then `install` |
| **Edits don't take effect** | The installed copy is a **cache** | `claude plugin marketplace update sodam-persona` → `uninstall` → `install` → restart |
| **Skills (investor/tax) don't appear** | Not restarted, or not enough trigger words | Restart, then be explicit like `review this VAT filing`. Check `Skills (7)` via `claude plugin details sodam-persona` |
| **Errors like `uv: command not found`** | Another plugin's hook issue (unrelated to this one) | Safe to ignore (this plugin has no such hook) |
| **Settings seem to break entirely** | `settings.json` may be broken (one wrong character voids the whole file) | Validate the JSON, restore from backup ([Section 16](#16-safety--backup--removal-rollback)) |

> For more cases and root-cause analysis, see **[GUIDE.en.md](./GUIDE.en.md)**.

---

## 15. FAQ (summary)

- **Q. What changes when I install it?** → `sodam-persona` is added to the plugin list, and from new sessions the AI gets the personality/rules. No other programs or files are touched.
- **Q. Do I need the internet?** → **Only for install.** After that it runs locally.
- **Q. Any passwords/API keys inside?** → **None.** Just personality text.
- **Q. Does it cost more tokens?** → The always-on part is very light; the heavy body is injected once at session start; domain skills are used **only when the topic comes up**.
- **Q. Can I use it commercially?** → **Yes (Apache-2.0).** Conditions in [Section 17](#17-license--copyright--commercial-use).

> Full FAQ and recipes: see **[GUIDE.en.md](./GUIDE.en.md)**.

---

## 16. Safety · backup · removal (rollback)

- **Full removal (back to original):**
  ```
  claude plugin uninstall sodam-persona@sodam-persona
  claude plugin marketplace remove sodam-persona
  ```
  Restart afterward and the persona is gone.
- **No secrets**: this plugin holds no API keys/tokens, so removing it leaves no security residue.
- **Author's-PC backup locations** (N/A on other PCs): `~/.claude/settings.json.persona-backup-YYYYMMDD`, etc. Restore from these if needed.

---

## 17. License · copyright · commercial use

**This project is distributed under the [Apache License 2.0](./LICENSE).  © 2026 SoDam AI Studio.**

| Item | Detail |
|---|---|
| ✅ **Permitted** | Use, reproduce, modify, merge, distribute, **commercial use**, create derivative works, private/public use |
| ✅ **Patent** | An **express patent-use grant** from contributors (with termination upon patent litigation) |
| 📌 **Conditions** | ① Keep copyright & license notices ② Include a **copy of the LICENSE** ③ **State changes in modified files** ④ Preserve NOTICE (if any) |
| 🚫 **No warranty** | Provided **AS IS** — no warranty for defects/damages. You are responsible for your use |
| 🚫 **Trademark** | No trademark/service-mark/product-name rights are granted (except customary use to indicate origin) |

- **In short**: use it freely, including commercially, as long as you **keep the copyright & LICENSE copy and mark any files you changed**.
- **Disclaimer (important)**: any tax/legal or other domain answers this plugin produces are **for general information only** and do not replace professional confirmation. Per Apache-2.0 Sections 7–8, there is **no warranty**, and responsibility for outcomes lies with the user.
- Full text: see the **[LICENSE](./LICENSE)** file. Third-party attributions: **[NOTICE](./NOTICE)**.

### External materials · trademarks · AI-generated content (check before commercial use)

- **Trademarks**: "Claude", "Claude Code", "Anthropic", "GitHub", "Node.js", etc. are trademarks of their respective owners. This project is **not affiliated with, sponsored by, or endorsed by** them; such names are used only nominatively to refer to the products.
- **AI-generated content**: Some documents/code in this repository were produced with the help of AI tools. **Before commercial use**, **verify yourself** the copyright, provenance, and any risk of infringing similar works.
- **External quotations**: short standard quotes (Karpathy · Hyrum's Law · Chesterton's Fence) are used **with attribution**; the underlying ideas are reimplemented and **no third-party source code is bundled** (details: [NOTICE](./NOTICE)).
- **Scope of use (Apache-2.0)**: modify, reproduce, fork, redistribute, **sell, operate as a service, use in training materials, deliver to a company/client — all permitted**, provided you ① keep copyright/license notices ② state changes in modified files.
- **Verify yourself**: the **terms of service, model-use policy, and API pricing** of Claude Code / Anthropic models follow Anthropic's policies and are outside this plugin's scope. If you later add fonts/images/icons, check their licenses separately.
- ⚖️ **Legal review needed (important)**: for the acceptability of commercial redistribution of the above quotations, trademarks, and AI-generated content, **independent legal review is recommended**. **This document is not legal advice.**

---

*Public repository · Apache-2.0 · © 2026 SoDam AI Studio · Docs: [한국어](./README.md) / English*
