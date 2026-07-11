# SoDam-Persona — Beginner's Guide (GUIDE)

A companion to [README.en.md](./README.en.md).
It contains the **FAQ**, **situational troubleshooting recipes**, **maintenance**, and **how it works**.
Organized so that people new to computers, AI, and GitHub can look things up whenever they get stuck.
Korean: **[GUIDE.md](./GUIDE.md)**

> This repository is **dedicated to the persona plugin (`sodam-persona`)** only. No other settings are mixed in.
> **Public repository · Apache-2.0 · © 2026 SoDam AI Studio**

---

## 📑 Table of Contents
1. [If it's your first time (5-min summary)](#1-if-its-your-first-time-5-min-summary)
2. [FAQ](#2-faq)
3. [Situational troubleshooting recipes](#3-situational-troubleshooting-recipes)
4. [Maintenance: how to edit the content](#4-maintenance-how-to-edit-the-content)
5. [How it works (a bit deeper)](#5-how-it-works-a-bit-deeper)
6. [How to verify (that it installed correctly)](#6-how-to-verify-that-it-installed-correctly)
7. [Glossary](#7-glossary)
8. [License · commercial use](#8-license--commercial-use)

---

## 1. If it's your first time (5-min summary)

Assume you just turned on the computer and know nothing. Just follow the steps.

1. **Open Claude Code.** (If you don't have it, install first from [claude.com/claude-code](https://claude.com/claude-code))
2. In the **input box** at the bottom, paste these 3 lines **one at a time**, pressing Enter each time:
   ```
   /plugin marketplace add sodam-ai/SoDam-Persona
   /plugin install sodam-persona@sodam-persona
   /reload-plugins
   ```
3. **Fully quit Claude Code and reopen it.** (Very important — this is what turns it on.)
4. In a new chat, just ask as usual. e.g. `How do I file this VAT?`
   → If the AI answers like a tax expert and adds a **"consult a tax accountant"** note at the end, it's working.

> 💡 That's all. No hard commands to memorize — just **ask in plain words** and the persona applies itself.

---

## 2. FAQ

**Q. What changes on my computer when I install it?**
A. `sodam-persona` is added to Claude Code's plugin list, and from new sessions the AI is auto-injected with the personality/rules. No other programs or files are touched.

**Q. Do I really need the internet?**
A. **Only for install (download).** After that, the persona runs locally on your computer.

**Q. Any passwords or API keys inside? Is it safe to make public?**
A. It only has persona text (personality/rules) and **no secrets**. So it's safe as a Public repository. (A secret scan confirmed 0 hits.)

**Q. Does it cost more tokens?**
A. The always-on part is very light. The heavy personality body is injected **once at session start**. Skills like "investment/tax/security" load **only when that topic comes up**, using tokens only then.

**Q. Does it conflict with other plugins?**
A. The persona is set to "ignore other plugins' auto-skill suggestions," but **its own skills (persona-*) are an exception and auto-activate**. So the persona takes priority without conflict.

**Q. How do I turn it off?**
A. Briefly: say `just answer` or `persona off` in the chat. Fully: `claude plugin disable sodam-persona@sodam-persona`, then restart.

**Q. How do I use it identically on multiple computers?**
A. On each computer, follow the 3 lines in [README Section 4](./README.en.md#4-download--quick-start-3-lines).

**Q. Can I trust tax/legal answers as-is?**
A. **No.** The persona's tax/legal answers are **for general information only**, and a "consult a professional" note is automatically attached. Before actually filing or signing, always get confirmation from a tax accountant, lawyer, or other professional.

**Q. Can I use it commercially?**
A. **Yes.** The Apache-2.0 license permits commercial use, provided you keep the copyright/license notice and mark any files you changed ([Section 8](#8-license--commercial-use)).

---

## 3. Situational troubleshooting recipes

### 🔴 "I restarted but the persona seems off"
1. Check install/active state:
   ```
   claude plugin list
   ```
   - Not in the list → not installed → [README Section 4](./README.en.md#4-download--quick-start-3-lines)
   - `disabled` → `claude plugin enable sodam-persona@sodam-persona`
2. Check component recognition:
   ```
   claude plugin details sodam-persona
   ```
   - `Skills (7)` + `Hooks (2)` should appear.
3. Fully quit and relaunch (quit the program itself, not just close the window).
4. In a new session, `Review this objectively and deeply` → check the persona reaction.

### 🔴 "`install` says 'Marketplace not found'" (common)
Cause: a previous **uninstall** also removed the marketplace registration.
Fix — **register again first**:
```
/plugin marketplace add sodam-ai/SoDam-Persona
/plugin install sodam-persona@sodam-persona
/reload-plugins
```
👉 Always **add (register) → install → reload (apply)**.

### 🔴 "I edited the content but it's unchanged" (most common)
Cause: the installed copy is a **cache**. Editing only the source folder leaves the cache old.
In order:
```
claude plugin marketplace update sodam-persona
claude plugin uninstall sodam-persona@sodam-persona
claude plugin install sodam-persona@sodam-persona
```
Then **restart**. (You can also check that the cache-folder files contain your edits.)

### 🔴 "I can't install directly from GitHub"
- Use the exact repo name: `sodam-ai/SoDam-Persona` (including case).
- Check your internet. Company/school networks may block GitHub.
- If it still fails, **download then install locally**: clone the repo or download the ZIP, unzip it, and run `/plugin marketplace add (folder path)`.

### 🟡 "I get a `uv: command not found` error"
- This comes from **another plugin's Stop hook** failing to find `uv` (a Python tool), and is **unrelated to this persona plugin** (which has no such hook). It doesn't affect the persona.

### 🟡 "It feels like my whole settings stopped working"
- `settings.json` becomes **entirely void if even one character of JSON is wrong**.
- Validate the JSON; if broken, restore from backup ([README Section 16](./README.en.md#16-safety--backup--removal-rollback)).

---

## 4. Maintenance: how to edit the content

**To change personality/rules** → edit `sodam-persona/hooks/persona_core.md` (the always-on source).
**To add trigger words** → add to the trigger list in the same `persona_core.md` (single source in the core).
**To change a specific expert's detail** → edit `sodam-persona/skills/persona-(name)/SKILL.md`.

After editing, **always** follow this order:
```bash
# 1) Edit files in the repo folder

# 2) Consistency check (recommended — auto-verifies perspective/skill counts and disclaimer)
node validate.mjs

# 3) Reflect into the cache
claude plugin marketplace update sodam-persona
claude plugin uninstall sodam-persona@sodam-persona
claude plugin install sodam-persona@sodam-persona

# 4) Restart Claude Code

# 5) Push to GitHub (⚠️ add ONLY the files you changed — do NOT use 'git add -A')
git add sodam-persona/hooks/persona_core.md   # example: only the files you actually changed
git commit -m "fix: summary of change"
git push
```

> ⚠️ **Why avoid `git add -A`?** It can sweep in **unintended files** (temporary files left by other tools) and pollute the public repo. **Name only the files you changed** when adding.
> ⚠️ **Don't skip cache reflection.** Skipping step 3 keeps the old version on (the most common misunderstanding).

---

## 5. How it works (a bit deeper)

- **SessionStart hook** (`inject-core.js`): when a session starts, it reads `persona_core.md` and puts it into the AI's context wholesale. → personality, strength (L0–L3), 15 perspectives, triggers, and the disclaimer rule stay alive at all times.
- **UserPromptSubmit hook** (`inject-marker.js`): on every input it injects `persona_marker.txt`. → after compaction (conversation compression) or sub-agents, the persona is instantly restored, and the **7 self-checks** and **mandatory disclaimer** apply every time.
- **Skills (7)**: when words like "investment/tax/security/design" are detected, the matching skill (detailed knowledge) loads. The **source of truth for trigger judgment is the core**; skills hold only its **extended detail** (preventing duplication/drift).
- **Mandatory disclaimer**: for accounting/tax (#14) and legal (#11) **actionable answers** (filing, amount calculation, clause interpretation, judgment), a "consult a professional" note is always included. Because this rule lives in the **always-on core/marker** rather than a conditional skill, it works reliably regardless of whether the skill loaded.
- **Path approach**: hook scripts read data via `__dirname` (relative to themselves), so they **don't break even if paths differ** on a new PC. This is the key to "one-shot migration."

---

## 6. How to verify (that it installed correctly)

```bash
# 1) Validate plugin format
claude plugin validate (repo path)/sodam-persona

# 2) Confirm install/recognition
claude plugin list
claude plugin details sodam-persona   # check Skills (7) + Hooks (2)

# 3) (For developers) automatic consistency & disclaimer check
node validate.mjs                      # verifies 15 perspectives · 20 patterns · 7 skills · disclaimer present
```
- Verify actual behavior **after a restart**, via conversation:
  - Ask normally without triggers → persona tone (careful, evidence-driven)
  - `Review this trade` → investor skill auto-loads
  - `Review this VAT filing` → tax skill + **a disclaimer note at the end** (its presence means the latest version is working)

---

## 7. Glossary

| Term | Meaning |
|---|---|
| **context** | The range of conversation/info the AI holds at once |
| **compaction** | Auto-summarizing/compressing when the conversation gets long (the marker restores the persona) |
| **hook** | A command that runs automatically at a certain point |
| **skill** | A bundle of knowledge/instructions loaded when needed |
| **marketplace** | The plugin catalog (warehouse) |
| **cache** | A copy kept for speed (the installed version lives here) |
| **JSON** | A format for writing settings; one wrong bracket/comma breaks the whole file |
| **L0–L3** | Answer-strength levels (L0 chat → L3 serious work like security/money/deploy) |
| **disclaimer** | A liability-limiting note like "for reference; consult a professional" |
| **trigger** | A word that switches on the related perspective/skill |

---

## 8. License · commercial use

- **License**: [Apache License 2.0](./LICENSE) · © 2026 SoDam AI Studio
- **Commercial use allowed** — provided you ① keep copyright & license notices ② include a copy of the LICENSE ③ state changes in modified files.
- **AS IS (no warranty)** — no warranty is given for this plugin or its output (including tax/legal), and responsibility for outcomes lies with the user.
- For details see [README Section 17](./README.en.md#17-license--copyright--commercial-use); full text in [LICENSE](./LICENSE); third-party attributions in [NOTICE](./NOTICE).

### How far can I use it? (for beginners)

- ✅ **Allowed**: personal use, **commercial use**, delivery to a company/client, training materials, forking (copying), redistribution, selling — all fine (Apache-2.0).
- 📌 **Must keep**: copyright/license notices, include the `LICENSE` file, and **mark changed files as "changed."**
- 🔎 **Verify yourself**: ① originality/copyright of AI-generated parts ② how you use trademarks like "Claude" ③ Claude Code / Anthropic **terms, pricing, model policy** ④ licenses of any fonts/images/icons you add later.
- 🚫 **Don't**: present trademarks like Anthropic's as **affiliation/endorsement**, or **include others' code/images/text without permission**.
- ⚖️ **When unsure**: for important uses such as client delivery, **independent legal review is recommended**. **This document is not legal advice.**

---

*If you get stuck, just ask with the symptom. — © 2026 SoDam AI Studio · Docs: [한국어](./GUIDE.md) / English*
