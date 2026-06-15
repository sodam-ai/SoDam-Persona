# claude-code_setting

sodam-ai 개인 **Claude Code 세팅 누적 저장소** (로컬 마켓플레이스).
내가 만든 Claude Code 세팅을 플러그인 형태로 하나씩 차곡차곡 쌓아, 새 PC에서 한 번에 복원한다.

## 현재 든 세팅

| 플러그인 | 설명 |
|---|---|
| `persona-plugin` | 바이브코딩 AI 개발 파트너 페르소나 v5 (항상켜짐 코어 hook + 조건부 13관점/도메인 skills) |

## 새 PC 설치 (한 번에)

```
# 1. clone
git clone https://github.com/sodam-ai/claude-code_setting.git

# 2. Claude Code에서 이 폴더를 로컬 마켓플레이스로 추가
/plugin marketplace add <clone한 경로>

# 3. 원하는 플러그인 설치
/plugin install persona-plugin@claude-code-setting

# 4. Claude Code 재시작 → 세팅 활성
```

## 세팅 추가 방법 (이 repo의 핵심 목적)

새 세팅을 추가할 때마다:

1. `claude-code_setting/`에 **새 플러그인 폴더** 생성 (`.claude-plugin/plugin.json` + 내용).
2. 루트 `.claude-plugin/marketplace.json`의 `plugins` 배열에 **항목 1줄 추가**.
3. commit. (기존 플러그인은 건드리지 않음 → 독립·안전.)

원칙: **항상 켜져야 하는 것 = hook**, **상황별로 켜지는 것 = skill**.

## 구조

```
claude-code_setting/
├── .claude-plugin/marketplace.json   # 플러그인 목록
├── persona-plugin/                   # 1번째 세팅
│   ├── .claude-plugin/plugin.json
│   ├── hooks/        # 항상켜짐 (SessionStart·UserPromptSubmit 코어 주입)
│   ├── skills/       # 조건부 (트리거·형식·안전·투자자·변호사)
│   └── reference/    # 참고 자료 (로드 안 됨, 이식·검증용)
└── README.md
```

본인 전용. 자세한 설계: 페르소나 플러그인은 항상켜짐 코어를 hook으로, 13관점·도메인 상세를 skill로 분리해 기능을 보존한다.
