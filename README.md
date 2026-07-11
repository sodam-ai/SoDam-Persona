# SoDam-Persona

> **한 줄 소개**
> Claude Code(AI 코딩 도구)에 **"나만의 AI 개발 파트너 성격(페르소나)"**을 입히는 플러그인입니다.
> 한 번 설치하면 **매번 자동으로 켜지고**, 새 컴퓨터로 옮길 때도 **명령 몇 줄**이면 그대로 복원됩니다.

> **이 글은 누구를 위한 것?**
> 컴퓨터·AI·깃허브(GitHub)를 **처음 다루는 분**도 따라 할 수 있게, 용어 하나하나 풀어서 설명합니다.
> 더 쉬운 왕초보 가이드·문제 해결·FAQ는 **[GUIDE.md](./GUIDE.md)**에 있습니다.
> 영어 문서: **[README.en.md](./README.en.md)** · **[GUIDE.en.md](./GUIDE.en.md)**

> **라이선스** · Apache-2.0 (상업적 사용 포함 자유 · [17번](#17-라이선스--저작권--상업적-용도) 참고)  ·  **공개(Public) 저장소**  ·  © 2026 SoDam AI Studio

---

## 📑 목차
1. [이게 뭔가요? (3분 이해)](#1-이게-뭔가요-3분-이해)
2. [먼저 알아둘 기본 용어 (왕초보용)](#2-먼저-알아둘-기본-용어-왕초보용)
3. [사전 준비물 · 필요 프로그램](#3-사전-준비물--필요-프로그램)
4. [다운로드 · 빠른 시작 (복붙 3줄)](#4-다운로드--빠른-시작-복붙-3줄)
5. [자세한 설치 방법 (한 단계씩)](#5-자세한-설치-방법-한-단계씩)
6. [실행 · 사용 방법 (그냥 말 걸면 됩니다)](#6-실행--사용-방법-그냥-말-걸면-됩니다)
7. [작동 방법 (원리, 쉽게)](#7-작동-방법-원리-쉽게)
8. [워크플로우 (전형적 흐름)](#8-워크플로우-전형적-흐름)
9. [아키텍처 (구조 한눈에)](#9-아키텍처-구조-한눈에)
10. [보안 · 데이터 흐름](#10-보안--데이터-흐름)
11. [명령어 모음 (전체)](#11-명령어-모음-전체)
12. [파일 · 문서 위치](#12-파일--문서-위치)
13. [업데이트 내용 요약 (펼쳐보기)](#13-업데이트-내용-요약-펼쳐보기)
14. [문제 · 오류 대처](#14-문제--오류-대처)
15. [자주 묻는 질문 (FAQ 요약)](#15-자주-묻는-질문-faq-요약)
16. [안전 · 백업 · 제거(롤백)](#16-안전--백업--제거롤백)
17. [라이선스 · 저작권 · 상업적 용도](#17-라이선스--저작권--상업적-용도)

---

## 1. 이게 뭔가요? (3분 이해)

- **Claude Code**는 컴퓨터에서 **자연어(평범한 말)로 시키는 AI 코딩 도구**입니다. "이거 만들어줘", "이 오류 고쳐줘"라고 말하면 AI가 대신 작업합니다.
- 이 플러그인(`sodam-persona`)은 그 AI에게 **고정된 성격과 일하는 규칙**을 입힙니다:
  - **비개발자를 돕는 신중한 파트너** 성격 (어려운 용어를 풀어 설명, 위험한 작업은 먼저 확인)
  - **15명의 전문가 관점**(개발·보안·디자인·투자자·변호사·회계세무·마케팅 등)으로 균형 검토
  - **상황별 트리거**: "객관적으로", "투자", "보안" 같은 말에 자동으로 깊어짐
  - **면책 강제**: 세무·법률 질문에는 "전문가 최종 확인 권장" 문구를 자동 포함
- **왜 플러그인으로?** 이 성격 설정을 **새 컴퓨터로 한 번에 옮기기** 위해서입니다. 예전엔 설정이 여기저기 흩어져 옮기기 어려웠습니다.

---

## 2. 먼저 알아둘 기본 용어 (왕초보용)

| 용어 | 쉬운 뜻 |
|---|---|
| **터미널 / CLI** | 글자로 명령을 입력하는 까만 창 (Claude Code가 실행되는 곳) |
| **Claude Code** | 자연어로 시키는 AI 코딩 도구 (이 플러그인이 설치되는 본체) |
| **플러그인(plugin)** | 기능을 묶어 끼웠다 뺐다 하는 "부품 묶음" |
| **마켓플레이스(marketplace)** | 플러그인이 담긴 "목록/창고" |
| **hook(훅)** | 특정 순간(세션 시작 등)에 **자동 실행**되는 장치 → "항상 켜짐" 담당 |
| **skill(스킬)** | 필요할 때만 **불러오는 지식 묶음** → "상황별 깊이" 담당 |
| **저장소(repository, repo)** | 코드·파일을 보관하는 인터넷 보관소 (여기선 GitHub의 `SoDam-Persona`) |
| **캐시(cache)** | 빠르게 쓰려고 **복사해 둔 사본** (설치본이 여기 있음) |
| **재시작(restart)** | Claude Code를 완전히 껐다 다시 켜는 것 (hook은 시작할 때만 읽힘) |

---

## 3. 사전 준비물 · 필요 프로그램

새 컴퓨터에서 쓰려면 아래가 필요합니다. **이 저장소는 공개(Public)라 로그인 없이 설치됩니다.**

| 프로그램 | 왜 필요? | 확인(터미널 입력) | 없으면 |
|---|---|---|---|
| **Claude Code** | 플러그인이 설치되는 본체 | `claude --version` | [claude.com/claude-code](https://claude.com/claude-code) 에서 설치 |
| **Node.js** | 플러그인의 hook이 사용 | `node --version` | Claude Code가 보통 함께 요구. 없으면 [nodejs.org](https://nodejs.org) LTS 설치 |
| **Git** *(선택)* | 내용을 **수정**하려면 저장소를 복제(clone)할 때만 | `git --version` | [git-scm.com](https://git-scm.com). **단순 사용만 하면 Git 불필요** |

> ✅ **그냥 쓰기만 하면** Claude Code + Node.js만 있으면 됩니다. (아래 4번 방법은 Git·다운로드 없이 바로 설치)
> 운영체제(OS): Windows / macOS / Linux 모두 지원.

---

## 4. 다운로드 · 빠른 시작 (복붙 3줄)

**가장 쉬운 방법 — GitHub에서 바로 설치(다운로드·Git 불필요).**
Claude Code **입력창**에 아래를 한 줄씩 붙여넣고 Enter:

```
/plugin marketplace add sodam-ai/SoDam-Persona
/plugin install sodam-persona@sodam-persona
/reload-plugins
```

- 1줄째 → `Successfully added marketplace: sodam-persona`
- 2줄째 → `Installed sodam-persona. Run /reload-plugins to apply.`
- 3줄째(또는 **Claude Code 재시작**) → 페르소나가 **항상 켜집니다**. 끝!

> 📌 `sodam-persona@sodam-persona`은 **플러그인이름@마켓플레이스이름**입니다(둘 다 같게 맞춰 뒀습니다). 그대로 입력하세요.
> 📌 `/reload-plugins`만으로도 대개 적용되지만, 확실히 하려면 **재시작**을 권장합니다.

---

## 5. 자세한 설치 방법 (한 단계씩)

**1단계 — Claude Code 확인**
터미널에 `claude --version` → 버전 숫자가 나오면 OK. 안 나오면 먼저 Claude Code 설치.

**2단계 — 마켓플레이스 등록**
Claude Code 입력창에:
```
/plugin marketplace add sodam-ai/SoDam-Persona
```
→ `Successfully added marketplace: sodam-persona` 가 나오면 성공.

**3단계 — 플러그인 설치**
```
/plugin install sodam-persona@sodam-persona
```
→ `Installed sodam-persona` 가 나오면 성공.

**4단계 — 적용(재시작 권장)**
```
/reload-plugins
```
또는 Claude Code를 **완전히 종료 후 다시 실행**. (hook은 새 세션부터 작동)

**5단계 — 확인**
```
/plugin
```
목록에 `sodam-persona` 가 보이면 설치 완료. (터미널이라면 `claude plugin list`)

> ⚠️ **순서 함정**: 만약 예전에 제거(Uninstall)했다면 마켓플레이스 등록도 사라져서 `install`이 *"Marketplace not found"* 라고 뜹니다.
> → 반드시 **`marketplace add`(등록) → `install`(설치) → `/reload-plugins`(적용)** 3단계 순서를 지키세요.

---

## 6. 실행 · 사용 방법 (그냥 말 걸면 됩니다)

**특별한 명령 없이, 평소처럼 질문하면 페르소나가 자동 적용됩니다.**

- 예: `이 코드 왜 안 돼?` → 추측 대신 데이터부터 확인하고, 근본 원인 → 해결 → 검증 순으로 답합니다.
- **더 강하게 켜는 말(트리거):**
  - `객관적으로 깊게 봐줘` → 15개 관점으로 균형 검토
  - `투자/거래 검토해줘` → 15년+ 투자자 관점 활성
  - `법률/약관 봐줘` → 15년+ 변호사 관점 활성 (+ 면책 문구 자동)
  - `이 부가세/세금 봐줘` → 15년+ 회계·세무 관점 활성 (+ **면책 문구 자동**)
  - `이 랜딩 카피 봐줘` → 15년+ 마케팅·세일즈 관점 활성
  - `보안 관점에서` / `디자인` / `UX` / `테스트` → 해당 전문가 관점 집중
- **짧게 받고 싶을 때:** `간단히`, `짧게`, `한 줄로` → 답이 짧아집니다.
- **잠깐 끄고 싶을 때:** `그냥 답해`, `페르소나 끄고` → 형식 없이 답합니다.

---

## 7. 작동 방법 (원리, 쉽게)

페르소나는 두 부분으로 나뉩니다.

| 부분 | 언제 켜지나 | 방식 |
|---|---|---|
| **항상 켜짐 (코어)** | 매 세션·매 입력마다 | **hook**이 자동으로 성격·규칙을 AI에게 주입 |
| **상황별 (전문가 상세)** | 특정 단어가 나올 때만 | **skill**이 그때 필요한 지식만 불러옴 |

- 그래서 평소엔 **가볍고**, "투자"·"보안" 같은 주제가 나오면 **그 부분만 깊어집니다**(토큰 낭비 없음).
- **핵심 설계**: 항상 켜져야 하는 건 hook으로(스킬은 매번 자동으론 못 켜짐), 가끔 켜질 건 skill로 — 이 분리가 이 플러그인의 뼈대입니다.

---

## 8. 워크플로우 (전형적 흐름)

```
[새 PC] 설치(4·5번) → 재시작 → 평소처럼 사용
                                   │
                  내용을 고치고 싶다 ─┘
                                   ▼
   저장소 clone → 파일 수정 → marketplace update → 재설치 → 재시작 → git push
```

> ⚠️ **가장 흔한 함정**: 플러그인 파일을 고친 뒤 **재설치(또는 marketplace update)를 안 하면** 예전 버전이 계속 켜집니다. 설치본은 "복사본(캐시)"이기 때문입니다. 자세히는 [14번](#14-문제--오류-대처).

---

## 9. 아키텍처 (구조 한눈에)

```
Claude Code (본체)
   │
   │ ① 세션 시작              ② 매 입력마다
   ▼                          ▼
[SessionStart hook]      [UserPromptSubmit hook]
 inject-core.js           inject-marker.js
   │ 읽음                    │ 읽음
   ▼                          ▼
 persona_core.md          persona_marker.txt
 (성격·강도 L0~L3·         (자가점검 7개·트리거 요약·
  15관점·트리거 정본·        컴팩션 복구·면책 강제)
  면책 강제)
   │
   │ ③ 트리거 단어 감지 시에만
   ▼
[skills 7개] ── persona-triggers / persona-format / persona-safety
             └─ persona-investor / persona-lawyer / persona-accountant / persona-marketer
```

- **정본(source of truth) = `persona_core.md` 한 곳.** 스킬은 그 **확장 상세**만 담아 중복·어긋남을 막습니다.
- **경로 방식**: hook 스크립트는 `__dirname`(자기 위치 기준)으로 파일을 읽어, **새 PC에서 경로가 달라도** 안 깨집니다. → "한 번에 이식"의 핵심.
- **구성 수치**: 관점 15명 · 트리거 패턴 20개(A~T) · 스킬 7개 · hook 2개. (일관성은 `validate.mjs`가 자동 검사)

---

## 10. 보안 · 데이터 흐름

**한 줄 요약: 이 플러그인은 "글(텍스트)만" 읽어서 AI에게 넘깁니다. 비밀정보도, 외부 통신도, 파일 변경도 없습니다.**

- **데이터 흐름**: `persona_core.md`/`persona_marker.txt`(텍스트) → hook이 **읽기만** → Claude Code 화면(맥락)에 주입. 그게 전부입니다.
- **비밀정보 없음**: API 키·토큰·비밀번호·`.env`·인증서·개인 키가 **하나도 없습니다**(페르소나 성격 텍스트만).
- **외부 통신 없음**: 설치 후 작동은 **완전 로컬**. 인터넷은 **설치(다운로드) 때만** 사용.
- **의존성 0**: 외부 라이브러리(`node_modules`)를 쓰지 않아 공급망(supply-chain) 위험 표면이 없습니다.
- **최소 권한**: hook은 **자기 폴더의 고정 파일만** 읽습니다(경로 조작·명령 실행·삭제·쓰기 없음).
- **검증됨**: 비밀정보 스캔(`git grep`) 0건 · hook 코드에 `eval`/`exec`/네트워크 0건 · JSON 매니페스트 유효 · `validate.mjs` 통과 — 모두 실제 확인.

---

## 11. 명령어 모음 (전체)

Claude Code **입력창**에서 (슬래시 `/`로 시작):

| 명령 | 설명 |
|---|---|
| `/plugin` | 플러그인 관리 메뉴 (마우스로 클릭하며 설치·삭제) |
| `/plugin marketplace add sodam-ai/SoDam-Persona` | GitHub에서 마켓플레이스 등록(다운로드 불필요) |
| `/plugin marketplace add (로컬폴더경로)` | 내려받은 폴더를 마켓플레이스로 등록(수정용) |
| `/plugin install sodam-persona@sodam-persona` | 플러그인 설치 |
| `/reload-plugins` | 변경 사항 즉시 적용 |

**터미널**에서 (`claude plugin ...`):

| 명령 | 설명 |
|---|---|
| `claude plugin list` | 설치된 플러그인 목록·활성 상태 |
| `claude plugin details sodam-persona` | 구성요소(스킬·훅) + 예상 토큰 비용 |
| `claude plugin enable sodam-persona@sodam-persona` | 켜기 |
| `claude plugin disable sodam-persona@sodam-persona` | 끄기 |
| `claude plugin uninstall sodam-persona@sodam-persona` | 삭제 |
| `claude plugin marketplace update sodam-persona` | 소스에서 최신으로 갱신(수정 후 필수) |
| `claude plugin marketplace remove sodam-persona` | 마켓플레이스 등록 해제 |
| `claude plugin validate (플러그인경로)` | 플러그인 형식 검사 |

---

## 12. 파일 · 문서 위치

**저장소 구조** (이 폴더 안):
```
SoDam-Persona/
├── README.md / README.en.md            ← 지금 이 문서 (한/영)
├── GUIDE.md  / GUIDE.en.md             ← 왕초보 가이드·FAQ (한/영)
├── LICENSE                             ← Apache-2.0 전문
├── validate.mjs                        ← 정합성 자동 검사기(의존성 0)
├── .github/workflows/validate.yml      ← 올릴 때마다 자동 검사(CI)
├── .claude-plugin/marketplace.json     ← 마켓플레이스 정의
└── sodam-persona/                      ← 실제 플러그인 (이 저장소의 유일한 플러그인)
    ├── .claude-plugin/plugin.json       ← 플러그인 정보
    ├── hooks/                           ← 항상 켜짐
    │   ├── hooks.json                     (언제 무엇을 실행할지)
    │   ├── inject-core.js / inject-marker.js  (주입 스크립트)
    │   ├── persona_core.md                (성격·강도·15관점·트리거·면책 정본)
    │   └── persona_marker.txt             (매 입력 자가점검 마커)
    ├── skills/                          ← 상황별 (7개)
    │   ├── persona-triggers/  persona-format/  persona-safety/
    │   └── persona-investor/  persona-lawyer/  persona-accountant/  persona-marketer/
    └── reference/                       ← 참고 자료(자동 로드 안 됨, 이식·검증용)
```

**설치 후 실제 파일 위치** (Claude Code가 복사해 두는 곳):
- Windows: `C:\Users\(사용자)\AppData\Roaming\claude-code\plugins\cache\sodam-persona\sodam-persona\(버전)\`
- macOS/Linux: `~/.config/claude-code/plugins/cache/sodam-persona/...` (환경에 따라 다름)
- 👉 **수정은 저장소 폴더에서** 하고, **marketplace update + 재설치**로 이 캐시에 반영합니다(캐시를 직접 고치지 마세요).

---

## 13. 업데이트 내용 요약 (펼쳐보기)

<details>
<summary><b>v1.0.0 — 현재 (클릭해서 펼치기)</b></summary>

- **15명 전문가 관점** 체계 정립 (#10 C-레벨만 25년+, 나머지 15년+, #3 비개발자 사용자는 연차 없음)
- **20개 트리거 패턴(A~T)** + 도메인 페르소나 4종 스킬: 투자자(#13)·변호사(#11)·회계세무(#14)·마케팅(#15)
- **면책 강제**: 회계·세무(#14)·법률(#11) 실행성 답변에 "전문가 최종 확인 권장" 문구 자동 포함 (항상-주입 레이어에 규칙화)
- **정합성 자동 검사** `validate.mjs` + GitHub Actions CI — 관점 수·패턴 수·스킬 수·도메인 배선·면책 존재를 올릴 때마다 자동 확인
- **자기완결 이식**: hook이 `__dirname` 기준으로 동작해 메모리 파일 없이 새 PC에서 그대로 복원

</details>

<details>
<summary><b>구성 원칙 (클릭해서 펼치기)</b></summary>

- **정본은 코어 한 곳**(`persona_core.md`) — 스킬은 확장 상세만, 중복 서술은 토큰 절약을 위한 의도된 4중 반복
- **강도 4단계** L0(잡담) → L1(설명) → L2(구현) → L3(보안·돈·배포·비가역)
- **7가지 자가점검**을 매 입력마다 적용(추측 금지·일관성·메타의도·분량 보존·미검증 표시·트리거 감지·자기정정)

</details>

---

## 14. 문제 · 오류 대처

| 증상 | 원인 | 해결 |
|---|---|---|
| **페르소나가 안 켜진 것 같다** | 미설치/비활성/재시작 안 함 | `/plugin`(또는 `claude plugin list`)로 확인 → 없으면 [4번](#4-다운로드--빠른-시작-복붙-3줄) 재설치 → **재시작** |
| **`install`에서 "Marketplace not found"** | 마켓플레이스 등록이 없음(예: 제거 후) | 먼저 `/plugin marketplace add sodam-ai/SoDam-Persona` → 그다음 `install` |
| **파일을 고쳤는데 반영이 안 된다** | 설치본은 **캐시 복사본** | `claude plugin marketplace update sodam-persona` → `uninstall` → `install` → 재시작 |
| **스킬(투자/세무 등)이 안 뜬다** | 재시작 전이거나 트리거 단어 부족 | 재시작 후 `이 부가세 신고 봐줘`처럼 명확히. `claude plugin details sodam-persona`로 `Skills (7)` 확인 |
| **`uv: command not found` 같은 에러** | **다른 플러그인**의 hook 문제(이 플러그인과 무관) | 무시 가능(이 플러그인엔 해당 hook 없음) |
| **설정이 통째로 안 먹는 느낌** | `settings.json`이 깨졌을 수 있음(JSON 한 글자만 틀려도 전체 무효) | JSON 검사 후 백업에서 복원([16번](#16-안전--백업--제거롤백)) |

> 더 많은 사례·원인 분석은 **[GUIDE.md](./GUIDE.md)** 를 보세요.

---

## 15. 자주 묻는 질문 (FAQ 요약)

- **Q. 설치하면 뭐가 바뀌나요?** → 플러그인 목록에 `sodam-persona`이 추가되고, 새 세션부터 AI에 성격·규칙이 주입됩니다. 다른 프로그램·파일은 안 건드립니다.
- **Q. 인터넷이 꼭 필요한가요?** → **설치 때만.** 이후 작동은 로컬입니다.
- **Q. 비밀번호·API 키가 들어 있나요?** → **없습니다.** 성격 텍스트만.
- **Q. 토큰(요금)이 더 드나요?** → 항상 켜지는 부분은 매우 가볍고, 무거운 본문은 세션 시작 때 한 번, 도메인 스킬은 **그 주제가 나올 때만** 씁니다.
- **Q. 상업적으로 써도 되나요?** → **네(Apache-2.0).** 조건은 [17번](#17-라이선스--저작권--상업적-용도).

> 전체 FAQ·상황별 레시피는 **[GUIDE.md](./GUIDE.md)** 참고.

---

## 16. 안전 · 백업 · 제거(롤백)

- **완전 제거(원래대로):**
  ```
  claude plugin uninstall sodam-persona@sodam-persona
  claude plugin marketplace remove sodam-persona
  ```
  그 후 재시작하면 페르소나가 사라집니다.
- **비밀정보 없음**: 이 플러그인은 API 키·토큰을 담지 않아, 제거해도 보안상 남는 흔적이 없습니다.
- **만든 사람 PC 기준** 백업 위치(다른 PC엔 해당 없음): `~/.claude/settings.json.persona-backup-YYYYMMDD` 등. 문제 시 이 백업으로 되돌립니다.

---

## 17. 라이선스 · 저작권 · 상업적 용도

**이 프로젝트는 [Apache License 2.0](./LICENSE) 으로 배포됩니다.  © 2026 SoDam AI Studio.**

| 항목 | 내용 |
|---|---|
| ✅ **허용** | 사용, 복제, 수정, 병합, 배포, **상업적 이용**, 2차적 저작물 제작, 사적/공적 사용 |
| ✅ **특허** | 기여자의 관련 특허에 대한 **명시적 사용권 부여**(특허 분쟁 시 해당 사용권 종료 조항 포함) |
| 📌 **조건** | ① 저작권·라이선스 고지 유지 ② 라이선스 **사본(LICENSE) 동봉** ③ **변경한 파일에 변경 사실 명시** ④ (NOTICE 파일이 있으면) 그 고지 유지 |
| 🚫 **미보장** | **무보증(AS IS)** — 하자·손해에 대한 보증 없음. 사용에 따른 책임은 사용자에게 있음 |
| 🚫 **상표** | 상표·서비스마크·제품명 사용권은 **부여하지 않음**(출처 표시 목적의 통상적 사용 제외) |

- **요약**: 상업적 사용을 포함해 자유롭게 쓰되, **저작권 고지와 LICENSE 사본을 함께 두고, 파일을 바꿨으면 바꿨다고 표시**하면 됩니다.
- **면책(중요)**: 본 플러그인이 생성하는 세무·법률 등 도메인 답변은 **일반 정보 제공용**이며 전문가의 최종 확인을 대체하지 않습니다. Apache-2.0 제7·8조에 따라 **어떠한 보증도 하지 않으며**, 사용 결과에 대한 책임은 사용자에게 있습니다.
- 전문(full text): **[LICENSE](./LICENSE)** 파일 참고. 제3자 고지: **[NOTICE](./NOTICE)**.

### 외부 자료 · 상표 · AI 생성물 주의 (상업적 사용 전 확인)

- **상표**: "Claude", "Claude Code", "Anthropic", "GitHub", "Node.js" 등은 각 소유자의 상표입니다. 본 프로젝트는 해당 사와 **제휴·후원 관계가 아니며**, 제품을 가리키는 명목적 언급만 합니다.
- **AI 생성물**: 본 저장소의 일부 문서·코드는 AI 도구의 도움으로 작성됐습니다. **상업적 사용 전** 저작권·출처·유사 저작물 침해 가능성을 **사용자가 직접 확인**하세요.
- **외부 인용**: 짧은 표준 인용(Karpathy·Hyrum's Law·Chesterton's Fence)은 **출처를 밝혀** 사용하며, 개념을 자체 구현한 것으로 **제3자 소스코드를 포함하지 않습니다** (상세: [NOTICE](./NOTICE)).
- **사용 범위(Apache-2.0 기준)**: 수정·복제·포크·재배포·**판매·서비스 운영·교육 자료·회사/고객사 납품 모두 가능**. 단 ①저작권·LICENSE 고지 유지 ②변경 파일에 변경 사실 표시.
- **직접 확인 필요**: Claude Code·Anthropic 모델의 **이용약관·모델 사용 정책·API 요금**은 Anthropic 정책을 따르며 본 플러그인 소관이 아닙니다. 나중에 폰트·이미지·아이콘을 추가한다면 그 라이선스는 별도 확인하세요.
- ⚖️ **법무 검토 필요(중요)**: 위 인용·상표·AI 생성물의 상업적 배포 적정성에 대한 **최종 판단은 법률 전문가 확인을 권장**합니다. **본 문서는 법률 자문이 아닙니다.**

---

*공개(Public) 저장소 · Apache-2.0 · © 2026 SoDam AI Studio · 문서: 한국어(기본) / [English](./README.en.md)*
