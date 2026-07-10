# SoDam-Persona — 자세한 가이드 (GUIDE)

[README.md](./README.md)의 보충 문서입니다.
**자주 묻는 질문(FAQ)**, **상황별 문제 해결 레시피**, **유지보수 방법**을 담았습니다.
컴퓨터를 처음 다루는 분 기준으로, 막히는 순간마다 찾아볼 수 있게 정리했습니다.

> 이 저장소는 **페르소나 플러그인(`sodam-persona`) 전용**입니다. 다른 설정은 섞지 않습니다.

---

## 📑 목차
1. [자주 묻는 질문 (FAQ)](#1-자주-묻는-질문-faq)
2. [상황별 문제 해결 레시피](#2-상황별-문제-해결-레시피)
3. [유지보수: 내용을 고치는 법](#3-유지보수-내용을-고치는-법)
4. [작동 원리 (조금 더 깊게)](#4-작동-원리-조금-더-깊게)
5. [검증하는 법 (제대로 깔렸는지)](#5-검증하는-법-제대로-깔렸는지)
6. [용어 사전](#6-용어-사전)

---

## 1. 자주 묻는 질문 (FAQ)

**Q. 설치하면 내 컴퓨터에 뭐가 바뀌나요?**
A. Claude Code의 플러그인 목록에 `sodam-persona`이 추가되고, 새 세션부터 AI에게 성격·규칙이 자동 주입됩니다. 다른 프로그램이나 파일은 건드리지 않습니다.

**Q. 인터넷이 꼭 필요한가요?**
A. **설치(다운로드)할 때만** 필요합니다. 설치 후 페르소나 작동 자체는 로컬에서 돌아갑니다.

**Q. 비밀번호나 API 키가 들어 있나요? 올려도 안전한가요?**
A. 페르소나 텍스트(성격·규칙)만 있고 **비밀정보는 없습니다.** 그래도 개인 설정이라 저장소는 **비공개(private)**로 둡니다(이미 비공개).

**Q. 토큰(요금)이 더 드나요?**
A. 항상 켜지는 부분은 매우 가볍습니다(스킬 목록 ~150 토큰 수준). 무거운 성격 본문은 세션 시작 때 한 번 주입됩니다. "투자/보안" 같은 스킬은 **그 주제가 나올 때만** 불러와 그때만 토큰을 씁니다.

**Q. 다른 플러그인(bkit 등)과 충돌하나요?**
A. 페르소나는 "외부 플러그인의 자동 스킬 권유는 무시"하도록 되어 있지만, **자기 자신의 스킬(persona-*)은 예외로 자동 활성**합니다. 그래서 충돌 없이 페르소나가 우선합니다.

**Q. 끄고 싶으면요?**
A. 잠깐: 대화에서 `그냥 답해`. 완전히: `claude plugin disable sodam-persona@sodam-persona` 후 재시작.

**Q. 여러 대의 컴퓨터에서 똑같이 쓰려면?**
A. 각 컴퓨터에서 [README 4·5번](./README.md#4-빠른-시작-복붙-4줄)을 따라 설치하면 동일하게 적용됩니다.

---

## 2. 상황별 문제 해결 레시피

### 🔴 "재시작했는데 페르소나가 안 켜진 것 같아요"
1. 설치·활성 확인:
   ```bash
   claude plugin list
   ```
   - 목록에 없다 → 설치 안 됨 → [README 4번](./README.md#4-빠른-시작-복붙-4줄)
   - `disabled` → `claude plugin enable sodam-persona@sodam-persona`
2. 구성요소 인식 확인:
   ```bash
   claude plugin details sodam-persona
   ```
   - `Skills (5)` + `Hooks (2)` 가 보여야 정상.
3. **완전히** 종료 후 재실행 (창만 닫지 말고 프로세스 종료).
4. 새 세션에서 `객관적으로 깊게 봐줘` → 페르소나 반응 확인.

### 🔴 "내용을 고쳤는데 그대로예요" (가장 흔함)
원인: 설치본은 **캐시 복사본**입니다. 빌드 폴더만 고치면 캐시는 옛날 그대로입니다.
순서대로:
```bash
claude plugin marketplace update sodam-persona
claude plugin uninstall sodam-persona@sodam-persona
claude plugin install sodam-persona@sodam-persona
```
그 후 **재시작**. (확인: 캐시 폴더의 파일이 수정 내용을 담고 있는지 봐도 됩니다.)

### 🔴 "git clone에서 막혀요 (Permission denied / 404)"
- 비공개 저장소라 로그인이 필요합니다:
  ```bash
  gh auth login
  ```
  (브라우저로 GitHub 로그인 → 권한 허용)
- 그 후 다시 `git clone https://github.com/sodam-ai/SoDam-Persona.git`

### 🔴 "marketplace add 했는데 경로를 못 찾아요"
- **clone으로 생긴 폴더의 정확한 전체 경로**를 넣어야 합니다.
- 그 폴더 안에 `.claude-plugin/marketplace.json`이 있어야 합니다(저장소 루트).

### 🟡 "`uv: command not found` 에러가 떠요"
- 이건 **다른 플러그인의 Stop 훅**이 `uv`(파이썬 도구)를 못 찾아 나는 것으로, **이 페르소나 플러그인과 무관**합니다(이 플러그인엔 Stop 훅이 없음). 페르소나 작동엔 영향 없습니다.

### 🟡 "설정이 통째로 안 먹는 느낌이에요"
- `settings.json`은 **JSON이 한 글자라도 틀리면 그 파일 설정 전체가 무효**가 됩니다.
- 형식 검사 후, 깨졌으면 백업에서 복원([README 12번](./README.md#12-안전--백업--제거롤백)).

---

## 3. 유지보수: 내용을 고치는 법

**페르소나 성격·규칙을 바꾸려면** → `sodam-persona/hooks/persona_core.md` 수정 (항상 켜지는 정본).
**트리거 단어를 추가하려면** → 같은 `persona_core.md`의 트리거 목록에 추가 (정본은 코어 한 곳).
**특정 전문가 상세를 바꾸려면** → `sodam-persona/skills/persona-(이름)/SKILL.md` 수정.

수정 후 **항상** 이 순서를 지키세요:
```bash
# 1) 저장소 폴더에서 파일 수정
# 2) 캐시에 반영
claude plugin marketplace update sodam-persona
claude plugin uninstall sodam-persona@sodam-persona
claude plugin install sodam-persona@sodam-persona
# 3) Claude Code 재시작
# 4) GitHub에 올리기
git add -A
git commit -m "수정 내용"
git push
```

---

## 4. 작동 원리 (조금 더 깊게)

- **SessionStart 훅**: 세션이 시작될 때 `persona_core.md`를 읽어 AI의 맥락(context)에 통째로 넣습니다. → 성격·강도(L0~L3)·13관점·트리거 규칙이 항상 살아 있음.
- **UserPromptSubmit 훅**: 입력을 보낼 때마다 `persona_marker.txt`를 넣습니다. → 컴팩션(대화 압축)·서브에이전트 뒤에도 페르소나가 즉시 복구되고, 7가지 자가점검이 매번 적용됨.
- **스킬(skills)**: "투자/보안/디자인" 같은 단어가 감지되면 해당 스킬(상세 지식)을 불러옵니다. 트리거 **판단의 정본은 코어**, 스킬은 그 **확장 상세**만 담습니다(중복·어긋남 방지).
- **경로 방식**: 훅 스크립트는 `__dirname`(자기 위치 기준)으로 데이터를 읽어, **새 PC에서 경로가 달라도** 안 깨집니다. 이게 "한 번에 이식"의 핵심입니다.

---

## 5. 검증하는 법 (제대로 깔렸는지)

```bash
# 1) 플러그인 형식 검사
claude plugin validate (저장소경로)/sodam-persona
# 2) 설치·인식 확인
claude plugin list
claude plugin details sodam-persona   # Skills(5) + Hooks(2) 확인
```
- 실제 작동은 **재시작 후** 대화로 확인합니다: 트리거 없이 평소 질문 → 페르소나 톤 / `이 거래 검토해줘` → 투자자 스킬 자동 로드.

---

## 6. 용어 사전

| 용어 | 뜻 |
|---|---|
| **컨텍스트(context)** | AI가 한 번에 기억하는 대화·정보의 범위 |
| **컴팩션(compaction)** | 대화가 길어지면 자동으로 요약·압축하는 것 (마커가 페르소나를 복구) |
| **훅(hook)** | 특정 시점에 자동 실행되는 명령 |
| **스킬(skill)** | 필요할 때 불러오는 지식/지침 묶음 |
| **마켓플레이스(marketplace)** | 플러그인 목록(창고) |
| **캐시(cache)** | 빠르게 쓰려고 복사해 둔 사본 (설치본이 여기 있음) |
| **JSON** | 설정을 적는 형식. 괄호·쉼표 하나만 틀려도 전체가 깨짐 |
| **L0~L3** | 답변 강도 단계 (L0 잡담 → L3 보안·돈·배포 같은 중대 작업) |

---

*막히는 부분이 있으면, 증상과 함께 물어보면 됩니다. — sodam-ai*
