# SoDam-Persona

> **한 줄 소개**
> Claude Code(AI 코딩 도구)에 **"나만의 AI 개발 파트너 성격(페르소나)"**을 입히는 플러그인입니다.
> 한 번 설치하면 **매번 자동으로 켜지고**, 새 컴퓨터로 옮길 때도 **명령 몇 줄**이면 그대로 복원됩니다.

> **이 저장소의 범위**
> 이 저장소는 **오직 페르소나 플러그인(sodam-persona) 하나만**을 위한 곳입니다. (다른 종류의 설정을 섞지 않습니다.)

> **이 글은 누구를 위한 것?**
> 컴퓨터·AI·깃허브를 **처음 다루는 분**도 따라 할 수 있게, 용어 하나하나 풀어서 설명합니다.
> 더 자세한 내용·문제 해결은 [GUIDE.md](./GUIDE.md)에 있습니다.

---

## 📑 목차
1. [이게 뭔가요? (3분 이해)](#1-이게-뭔가요-3분-이해)
2. [먼저 알아둘 기본 용어 (왕초보용)](#2-먼저-알아둘-기본-용어-왕초보용)
3. [사전 준비물 · 필요 프로그램](#3-사전-준비물--필요-프로그램)
4. [빠른 시작 (복붙 4줄)](#4-빠른-시작-복붙-4줄)
5. [자세한 설치 방법 (한 단계씩)](#5-자세한-설치-방법-한-단계씩)
6. [사용 방법 (그냥 말 걸면 됩니다)](#6-사용-방법-그냥-말-걸면-됩니다)
7. [작동 방법 (원리, 쉽게)](#7-작동-방법-원리-쉽게)
8. [워크플로우 (전형적 흐름)](#8-워크플로우-전형적-흐름)
9. [명령어 모음 (전체)](#9-명령어-모음-전체)
10. [파일 · 문서 위치](#10-파일--문서-위치)
11. [문제 · 오류 대처](#11-문제--오류-대처)
12. [안전 · 백업 · 제거(롤백)](#12-안전--백업--제거롤백)
13. [이 저장소의 범위 (페르소나 전용)](#13-이-저장소의-범위-페르소나-전용)

---

## 1. 이게 뭔가요? (3분 이해)

- **Claude Code**는 컴퓨터에서 **자연어(평범한 말)로 시키는 AI 코딩 도구**입니다. "이거 만들어줘", "이 오류 고쳐줘"라고 말하면 AI가 대신 작업합니다.
- 이 플러그인(`sodam-persona`)은 그 AI에게 **고정된 성격과 일하는 규칙**을 입힙니다:
  - **비개발자를 돕는 신중한 파트너** 성격 (어려운 용어 풀어 설명, 위험한 작업은 먼저 확인)
  - **15명의 전문가 관점** (개발·보안·디자인·투자자·변호사·회계세무·마케팅 등)으로 검토
  - **상황별 트리거**: "객관적으로", "투자", "보안" 같은 말에 자동으로 깊어짐
- **왜 플러그인으로 만들었나?** 이 성격 설정을 **새 컴퓨터로 한 번에 옮기기** 위해서입니다. 예전엔 설정 파일이 여기저기 흩어져 있어 옮기기 어려웠습니다.

---

## 2. 먼저 알아둘 기본 용어 (왕초보용)

| 용어 | 쉬운 뜻 |
|---|---|
| **터미널 / CLI** | 글자로 명령을 입력하는 창 (Claude Code가 실행되는 곳) |
| **Claude Code** | 자연어로 시키는 AI 코딩 도구 (이 플러그인이 설치되는 본체) |
| **플러그인(plugin)** | 기능을 묶어 끼웠다 뺐다 하는 "부품 묶음" |
| **마켓플레이스(marketplace)** | 플러그인이 담긴 "목록/창고" |
| **hook(훅)** | 특정 순간(세션 시작 등)에 **자동으로 실행**되는 장치 → "항상 켜짐"을 담당 |
| **skill(스킬)** | 필요할 때만 **불러오는 지식 묶음** → "상황별 깊이"를 담당 |
| **저장소(repository, repo)** | 코드·파일을 보관하는 인터넷 보관소 (여기선 GitHub의 `SoDam-Persona`) |
| **clone(클론)** | 그 저장소를 **내 컴퓨터로 복제(다운로드)**하는 것 |
| **commit / push** | 변경 내용을 기록하고(commit), 인터넷 저장소로 올리는 것(push) |

---

## 3. 사전 준비물 · 필요 프로그램

새 컴퓨터에서 설치하려면 아래 3가지가 필요합니다.

| 프로그램 | 왜 필요? | 설치됐는지 확인(터미널에 입력) | 없으면 |
|---|---|---|---|
| **Claude Code** | 플러그인이 설치되는 본체 | `claude --version` | [claude.com/claude-code](https://claude.com/claude-code) 에서 설치 |
| **Node.js** | 플러그인의 hook이 사용 (Claude Code가 기본 요구) | `node --version` | Claude Code가 보통 함께 요구·안내. 없으면 [nodejs.org](https://nodejs.org) LTS 설치 |
| **Git** | 저장소를 내 컴퓨터로 clone | `git --version` | [git-scm.com](https://git-scm.com) 에서 설치 |

> 추가로, 이 저장소는 **비공개(private)**라서 다운로드하려면 **GitHub 로그인(sodam-ai 계정)**이 필요합니다.
> 가장 쉬운 방법: `gh`(GitHub CLI) 설치 후 `gh auth login` 한 번. → [cli.github.com](https://cli.github.com)

---

## 4. 빠른 시작 (복붙 4줄)

이미 Claude Code·Git·로그인이 준비됐다면, 이것만 하면 끝입니다.

**① 터미널에서** (저장소 다운로드):
```bash
git clone https://github.com/sodam-ai/SoDam-Persona.git
```

**② Claude Code 안에서** (위에서 clone한 폴더 경로를 넣으세요):
```
/plugin marketplace add ./SoDam-Persona
/plugin install sodam-persona@sodam-persona
```

**③ Claude Code를 껐다 켜기** (재시작) → 끝. 페르소나가 항상 켜집니다.

> 📌 설치 명령 끝의 `@sodam-persona`은 **마켓플레이스 이름**입니다(저장소 이름과 같게 맞춰 뒀습니다). 그대로 입력하세요.

---

## 5. 자세한 설치 방법 (한 단계씩)

**1단계 — Claude Code가 있는지 확인**
터미널(까만 명령 창)에 입력:
```bash
claude --version
```
버전 숫자가 나오면 OK. 안 나오면 먼저 Claude Code를 설치하세요.

**2단계 — 저장소 다운로드(clone)**
원하는 폴더로 이동한 뒤:
```bash
git clone https://github.com/sodam-ai/SoDam-Persona.git
```
- 비공개 저장소라 로그인 창이 뜰 수 있습니다. `gh auth login`을 미리 해두면 매끄럽습니다.
- 완료되면 `SoDam-Persona` 라는 폴더가 생깁니다. **그 폴더의 전체 경로**를 기억하세요 (예: `C:\Users\내이름\SoDam-Persona`).

**3단계 — 마켓플레이스로 등록**
Claude Code를 실행한 뒤, 입력창에:
```
/plugin marketplace add (2단계에서 생긴 폴더 경로)
```
→ "Successfully added marketplace: sodam-persona" 가 나오면 성공.

**4단계 — 플러그인 설치**
```
/plugin install sodam-persona@sodam-persona
```
→ "Successfully installed" 이 나오면 성공.

**5단계 — 재시작**
Claude Code를 **완전히 종료 후 다시 실행**합니다. (hook은 새 세션부터 작동)

**6단계 — 확인** (아래 [11번](#11-문제--오류-대처) 참고)
```bash
claude plugin list
```
→ `sodam-persona` 이 `enabled`로 보이면 완료.

---

## 6. 사용 방법 (그냥 말 걸면 됩니다)

**특별한 명령 없이, 평소처럼 질문하면 페르소나가 자동으로 적용됩니다.**

- 예: `이 코드 왜 안 돼?` → 추측 대신 데이터부터 확인하고, 근본 원인 → 해결 → 검증 순으로 답합니다.
- **더 강하게 켜는 말(트리거):**
  - `객관적으로 깊게 봐줘` → 15개 관점으로 균형 검토
  - `투자/거래 검토해줘` → 15년+ 투자자 관점 활성
  - `법률/약관 봐줘` → 15년+ 변호사 관점 활성
  - `보안 관점에서` / `디자인` / `UX` / `테스트` → 해당 전문가 관점
- **짧게 받고 싶을 때:** `간단히`, `짧게`, `한 줄로` → 답이 짧아집니다.
- **잠깐 끄고 싶을 때:** `그냥 답해`, `페르소나 끄고` → 형식 없이 답합니다.

---

## 7. 작동 방법 (원리, 쉽게)

페르소나는 두 부분으로 나뉩니다.

| 부분 | 언제 켜지나 | 방식 |
|---|---|---|
| **항상 켜짐 (코어)** | 매 세션·매 입력마다 | **hook**이 자동으로 성격·규칙을 AI에게 주입 |
| **상황별 (전문가 상세)** | 특정 단어가 나올 때만 | **skill**이 그때 필요한 지식만 불러옴 |

- 그래서 평소엔 **가볍고**, "투자"·"보안" 같은 주제가 나오면 **그 부분만 깊어집니다** (낭비 없음).
- 항상 켜져야 하는 건 hook으로(스킬은 매번 자동으론 못 켜짐), 가끔 켜질 건 skill로 — 이 분리가 핵심 설계입니다.

---

## 8. 워크플로우 (전형적 흐름)

```
[새 PC] 설치(4·5번) → 재시작 → 평소처럼 사용
                                   │
                  내용을 고치고 싶다 ─┘
                                   ▼
        플러그인 파일 수정 → marketplace update → 재설치 → 재시작 → (필요 시) git push
```

> ⚠️ **가장 흔한 함정**: 플러그인 파일을 고친 뒤 **재설치(또는 marketplace update)를 안 하면** 예전 버전이 계속 켜집니다. 자세히는 [11번](#11-문제--오류-대처).

---

## 9. 명령어 모음 (전체)

Claude Code **입력창**에서 쓰는 명령 (슬래시 `/`로 시작):

| 명령 | 설명 |
|---|---|
| `/plugin` | 플러그인 관리 메뉴 (마우스로 클릭하며 설치·삭제) |
| `/plugin marketplace add (경로)` | 폴더를 마켓플레이스로 등록 |
| `/plugin install sodam-persona@sodam-persona` | 플러그인 설치 |

**터미널**에서 쓰는 명령 (`claude plugin ...`):

| 명령 | 설명 |
|---|---|
| `claude plugin list` | 설치된 플러그인 목록·활성 상태 |
| `claude plugin details sodam-persona` | 구성요소(스킬·훅) + 예상 토큰 비용 |
| `claude plugin enable sodam-persona@sodam-persona` | 켜기 |
| `claude plugin disable sodam-persona@sodam-persona` | 끄기 |
| `claude plugin uninstall sodam-persona@sodam-persona` | 삭제 |
| `claude plugin marketplace list` | 등록된 마켓플레이스 목록 |
| `claude plugin marketplace update sodam-persona` | 소스에서 최신으로 갱신(수정 후 필수) |
| `claude plugin marketplace remove sodam-persona` | 마켓플레이스 등록 해제 |
| `claude plugin validate (플러그인경로)` | 플러그인 형식 검사 |

---

## 10. 파일 · 문서 위치

**저장소 구조** (이 폴더 안):
```
SoDam-Persona/
├── README.md                         ← 지금 이 문서
├── GUIDE.md                          ← 더 자세한 가이드·FAQ
├── .claude-plugin/marketplace.json   ← 플러그인 목록(마켓플레이스 정의)
└── sodam-persona/                   ← 실제 플러그인 (이 저장소의 유일한 플러그인)
    ├── .claude-plugin/plugin.json    ← 플러그인 정보
    ├── hooks/                        ← 항상 켜짐
    │   ├── hooks.json                  (언제 무엇을 실행할지)
    │   ├── inject-core.js / inject-marker.js  (주입 스크립트)
    │   ├── persona_core.md             (성격·강도·15관점·트리거 정본)
    │   └── persona_marker.txt          (매 입력 자가점검 마커)
    ├── skills/                       ← 상황별 (7개)
    │   ├── persona-triggers/  persona-format/  persona-safety/
    │   └── persona-investor/  persona-lawyer/  persona-accountant/  persona-marketer/
    └── reference/                    ← 참고 자료(자동 로드 안 됨, 이식·검증용)
```

**설치 후 실제 파일 위치** (Claude Code가 복사해 두는 곳):
- Windows: `C:\Users\(사용자)\AppData\Roaming\claude-code\plugins\cache\sodam-persona\sodam-persona\(버전)\`
- 👉 **수정은 위 저장소 폴더에서** 하고, **marketplace update + 재설치**로 이 캐시에 반영합니다 (직접 캐시를 고치지 마세요).

---

## 11. 문제 · 오류 대처

| 증상 | 원인 | 해결 |
|---|---|---|
| **페르소나가 안 켜진 것 같다** | 미설치/비활성/재시작 안 함 | `claude plugin list`로 `enabled` 확인 → 아니면 install/enable → **재시작** |
| **파일을 고쳤는데 반영이 안 된다** | 설치본은 **캐시 복사본**이라 빌드 파일 수정이 자동 반영 안 됨 | `claude plugin marketplace update sodam-persona` → `uninstall` → `install` → 재시작 |
| **스킬(투자/변호사 등)이 안 뜬다** | 재시작 전이거나 트리거 단어 부족 | 재시작 후 `이 거래 검토해줘`처럼 명확히. `claude plugin details sodam-persona`로 스킬 인식 확인 |
| **clone이 안 된다 / 권한 오류** | 비공개 저장소 로그인 필요 | `gh auth login` 후 다시 `git clone` |
| **`uv: command not found` 같은 에러** | **다른 플러그인**의 hook 문제 (이 플러그인과 무관) | 무시 가능. 거슬리면 그 플러그인을 점검 |
| **설치 후 설정이 다 사라진 느낌** | settings.json이 깨졌을 수 있음(JSON 한 글자만 틀려도 전체 무효) | JSON 검사. 백업에서 복원([12번](#12-안전--백업--제거롤백)) |

> 더 많은 사례·원인 분석은 [GUIDE.md](./GUIDE.md)를 보세요.

---

## 12. 안전 · 백업 · 제거(롤백)

- **이 플러그인은 비밀정보(API 키·토큰)를 담지 않습니다.** 페르소나 텍스트(성격·규칙)만 들어 있습니다.
- **완전 제거(원래대로):**
  ```bash
  claude plugin uninstall sodam-persona@sodam-persona
  claude plugin marketplace remove sodam-persona
  ```
  그 후 재시작하면 페르소나가 사라집니다.
- **만든 사람의 PC 기준** 백업 위치(다른 PC엔 해당 없음):
  - `~/.claude/settings.json.persona-backup-YYYYMMDD`
  - `.../memory/MEMORY.md.persona-backup-YYYYMMDD`
  - 문제 시 이 백업을 원래 파일로 되돌리면 이전 방식으로 복구됩니다.

---

## 13. 이 저장소의 범위 (페르소나 전용)

이 저장소는 **오직 페르소나 플러그인(`sodam-persona`) 하나만**을 위한 곳입니다.
다른 종류의 Claude Code 설정·플러그인을 여기에 섞지 않습니다.

- 페르소나의 **성격·규칙·트리거를 고치는 법**은 [GUIDE.md의 "유지보수"](./GUIDE.md#3-유지보수-내용을-고치는-법)를 보세요.
- 고친 뒤에는 `marketplace update → 재설치 → 재시작 → git push` 순서를 지킵니다.

---

*본인 전용 · 비공개 저장소 · sodam-ai*
