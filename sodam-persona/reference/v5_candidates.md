---
name: user_persona_v5_candidates
description: 페르소나 v5 본문 통합 보강 후보 모음 (2026-05-07 신설). 영문 표준 표현 4건(Chesterton's Fence·Hyrum's Law·Beyonce Rule·Goal-Driven Execution) + 즉시 활용 후보 3건(C1 browser-harness P2·C2 meta-harness P1·C3 Karpathy 트리거) + 7일 자동 재검토 트리거(2026-05-14). **사용자 명시 동의 시만 페르소나 본문에 정식 통합** — user_persona*.md 5개 파일 본문 무수정 그대로 유지.
type: user
originSessionId: dde9d96b-6fbe-4f5a-8cd2-bf43004d73d4
---
# 페르소나 v5 본문 통합 보강 후보 (2026-05-07)

> ⚠️ **본 카드는 후보 등록 전용**. user_persona.md / user_persona_min.md / user_persona_triggers.md / user_persona_format.md / user_persona_safety.md 5개 파일 본문은 **무수정 그대로 유지**. 정식 통합은 사용자 명시 동의 시만 진행.

## 영문 표준 표현 보강 후보 (4건)

기등록 reference 자산에서 발췌한 영문 표준을 사용자 페르소나 v5 트리거에 매핑. 각 후보는 사용자 메타 규칙과 1:1 동형 — 영문 표현으로 이론적 근거 강화.

### 1. Chesterton's Fence → O 결합형 보존 패턴

| 항목 | 값 |
|---|---|
| 영문 표준 | "Don't remove a fence until you understand why it's there" |
| 트리거 단어 | 기능 보존·기능 유지·현재 유지·그대로 유지 |
| 페르소나 매칭 | 메타 규칙 "기존 기능·세팅 보존 최우선" + `feedback_edit_stale_content.md` |
| 출처 | `reference_addyosmani_agent_skills.md` (별 29.8K, MIT) |
| 적용 시 효과 | 변경 전 "왜 있는지 모르는 코드는 우선 건드리지 않기" 영문 명시 → 17 프로젝트 모든 변경 작업에 자동 회수 |

### 2. Hyrum's Law → F 충돌·치명 패턴

| 항목 | 값 |
|---|---|
| 영문 표준 | "All observable behaviors of your API will be depended on by somebody" |
| 트리거 단어 | 충돌·치명·치명적 |
| 페르소나 매칭 | F 패턴 (시니어 개발자 + DevOps 활성) + 영향 범위·롤백 의무 |
| 출처 | `reference_addyosmani_agent_skills.md` |
| 적용 시 효과 | 충돌 분석 시 영문 표준 인용 가능 → 사용자 17 프로젝트 회귀 위험 분석 강화 |

### 3. Beyonce Rule → C 철저 패턴

| 항목 | 값 |
|---|---|
| 영문 표준 | "If you liked it, you should have put a test on it" |
| 트리거 단어 | 확실하고 철저하게 |
| 페르소나 매칭 | C 패턴 (L3 강제) + M 패턴 (검증/검토) |
| 출처 | `reference_addyosmani_agent_skills.md` |
| 적용 시 효과 | 보호하고 싶은 기능 = 테스트 작성 의무 → TDD 강화 |

### 4. Goal-Driven Execution → M 검증 패턴

| 항목 | 값 |
|---|---|
| 영문 표준 | "LLMs are exceptionally good at looping until they meet specific goals... Don't tell it what to do, give it success criteria, watch it go." (Karpathy 직접 인용) |
| 트리거 단어 | 성공 기준·verify·loop until verified·success criteria |
| 페르소나 매칭 | M 패턴 "검증/검토" + `validation_loops.md` "빌드 통과 ≠ 작동 확인" |
| 출처 | `reference_andrej_karpathy_skills.md` (별 116K, MIT) |
| 적용 시 효과 | 검증 작업 시 명령형 → 검증 가능한 목표 변환 자동 회수 → 17 프로젝트 모든 검증 강화 |

## 즉시 활용 후보 (C1·C2·C3)

기등록 격리 자산의 패턴을 사용자 17 프로젝트에 즉시 적용 가능. 사용자 명시 요청 시 해당 프로젝트에 시범 진행.

### C1. browser-harness P2 domain-skills 폴더 구조

| 항목 | 값 |
|---|---|
| 적용 프로젝트 | **AI News Radar** (사이트별 스크래퍼 정리) |
| 가치 | 코드 재사용성 ↑, 사이트 추가 시 즉시 확장 |
| 구조 예시 | `domain-skills/<site>/` + `interaction-skills/<pattern>/` |
| 출처 | `references\browser-harness\domain-skills\` (참고용, 코드 직접 차용은 MIT 표시 의무) |
| 작업 시간 | 30분~1시간 (AI News Radar 기존 코드 정리) |

### C2. meta-harness P1 claude_wrapper 격리 호출

| 항목 | 값 |
|---|---|
| 적용 프로젝트 | **AI Orchestra** (멀티 AI CLI 격리 호출 표준화) |
| 가치 | 글로벌 셋업 오염 0 보장 |
| 격리 플래그 | `--setting-sources ""` + `--plugin-dir [empty_dir]` + `--strict-mcp-config` + `--disable-slash-commands` |
| 출처 | `references\meta-harness\reference_examples\text_classification\claude_wrapper.py` (참고용) |
| 작업 시간 | 30분~1시간 (AI Orchestra wrapper 패턴 도입) |

### C3. Karpathy Goal-Driven Execution 트리거 정식 통합

| 항목 | 값 |
|---|---|
| 적용 영역 | **17 프로젝트 모든 검증 작업** |
| 가치 | 영문 표준 자동 회수 ("성공 기준→loop until verified") |
| 갱신 위치 | `user_persona_triggers.md` Section M (검증/검토) — 사용자 명시 동의 시 |
| 작업 시간 | 5분 (트리거 단어 4개 + 영문 인용 1개 추가) |

## manager-orchestrator 발췌 보강 후보 4건 (MO1~MO4) — 2026-05-07 추가

`reference_manager_orchestrator.md`(jung-wan-kim, 별 38, 단발 저장소)의 청사진에서 17 프로젝트 범용 적용 가능한 4건 발췌. 사용자 명시 동의 시만 페르소나 v5 본문 정식 통합.

### MO1. P4 파일 경계 규칙

| 항목 | 값 |
|---|---|
| 영문 표준 | "frontend-specialist CAN src/components/**, src/pages/**, src/hooks/** / DENY src/api/**, src/lib/server/**" |
| 적용 영역 | 모든 frontend/backend 분리 프로젝트 (AI News Radar·TeamVault·portfolio·Ontology Helper 등) |
| 페르소나 매칭 | phase별 에이전트 권한 격리 패턴 — 사용자 메타 규칙 "기존 기능·세팅 보존 최우선"과 정합 |
| 출처 | `reference_manager_orchestrator.md` line 40-47 |

### MO2. QA 3회 루프 + escalation

| 항목 | 값 |
|---|---|
| 영문 표준 | "Up to 3 automated finding-fixing cycles. CRITICAL/HIGH must-fix, then escalate to user" |
| 적용 영역 | 모든 검증 작업 — M 패턴(검증/검토) 트리거 |
| 페르소나 매칭 | format Section 11 "3회 재시도 실패 시 사용자 보고"와 1:1 동형 → 영문 표준 표현 보강 |
| 출처 | `reference_manager_orchestrator.md` line 50-52 |

### MO3. Compaction 회복 우선순위 6단계

| 항목 | 값 |
|---|---|
| 영문 표준 | "1. CLAUDE.md/MEMORY.md → 2. TaskList → 3. context-enrichment → 4. plan.md → 5. claude-mem → 6. Filesystem direct read" |
| 적용 영역 | 모든 세션 (compaction 후 페르소나 v5 자동 회복 로직) |
| 페르소나 매칭 | SessionStart+UserPromptSubmit hook이 1단계 자동화 → 6단계 명문화 자료 |
| 출처 | `reference_manager_orchestrator.md` line 54-62 |

### MO4. Manager 직접 코드 작성 차단 원칙

| 항목 | 값 |
|---|---|
| 영문 표준 | "agent-permission-check.sh: Manager direct code write is denied. Orchestrators delegate only" |
| 적용 영역 | 모든 오케스트레이션 작업 (AI Orchestra·multi-agent flows) |
| 페르소나 매칭 | 사용자 자체 harness 원칙 "validation_loops·invariants" 정합 |
| 출처 | `reference_manager_orchestrator.md` line 35 |

→ MO1·MO2·MO3·MO4는 보강 후보 등록만. 사용자 명시 동의 시 user_persona_format.md / user_persona_safety.md / user_persona_triggers.md 본문에 정식 통합.

## gstack-auto 발췌 보강 후보 5건 (LO1~LO5) — 2026-05-07 추가

`reference_loperanger7_gstack_auto.md`(loperanger7, 별 187, **🔴 라이선스 부재**)의 청사진 사상에서 17 프로젝트 범용 적용 가능한 5건 발췌. **본문 인용 X, 사상(idea)만 흡수** — 라이선스 부재 가드. 사용자 명시 동의 시 자체 구현으로 페르소나/bkit 정식 통합.

### LO1. Adversarial Review (듀얼 모델 크로스 챌린지)

| 항목 | 값 |
|---|---|
| 사상 | "Plan Phase마다 Claude + Codex(또는 다른 모델) 듀얼 챌린지로 사각지대 검출" |
| 적용 영역 | 모든 Plan/Design/Eng 검토 작업 |
| 페르소나 매칭 | 15관점 + 듀얼 모델 검증 보강 후보 |
| 차용 가드 | **본문 인용 X, 사상만** (라이선스 부재) |

### LO2. N 병렬 worktree + 점수 기반 선택

| 항목 | 값 |
|---|---|
| 사상 | "동일 task에 N개 worktree 병렬 실행, 각 독립 git 분기, 최종 점수 기반 1개 선택" |
| 적용 영역 | bkit:dispatching-parallel-agents 보강, AI Orchestra·OrchestraView |
| 페르소나 매칭 | superpowers:dispatching-parallel-agents 정합 |
| 차용 가드 | **사상만 흡수** |

### LO3. Round 진화 (점수 기반 라운드 → 라운드)

| 항목 | 값 |
|---|---|
| 사상 | "Round 1 결과 7.2 → Round 2 8.4 → Round 3 9.1 점수 진화로 자동 개선" |
| 적용 영역 | GAN harness Generator-Evaluator 루프 보강 (everything-claude-code:gan-style-harness 참고) |
| 페르소나 매칭 | M 패턴(검증/검토) + meta-harness P3 (3-candidate falsifiable hypothesis)와 동형 |
| 차용 가드 | **사상만 흡수** |

### LO4. Run A/B/C 편향 분리

| 항목 | 값 |
|---|---|
| 사상 | "Run A=코드품질·Run B=UX 폴리시·Run C=견고성 편향으로 동일 task 다중 실행" |
| 적용 영역 | 다중 페르소나 동시 실행 패턴, 17 프로젝트 코드 리뷰 |
| 페르소나 매칭 | 15관점 분리 실행 보강 |
| 차용 가드 | **사상만 흡수** |

### LO5. 13 Phase 자동화 흐름

| 항목 | 값 |
|---|---|
| 사상 | "CEO Plan → Adversarial Review → Eng Plan → ... → Implement → Ship → QA → Document → Score" |
| 적용 영역 | bkit PDCA Plan phase 보강 (gstack 4중 리뷰와 결합 가능) |
| 페르소나 매칭 | bkit phase-1~9와 정합 |
| 차용 가드 | **사상만 흡수, gstack 본체와 통합 시 라이선스 분리** (gstack=MIT, gstack-auto=부재) |

→ LO1~LO5는 보강 후보 등록만. 사용자 명시 동의 시 **자체 구현**으로 페르소나/bkit 본문 정식 통합. **본문 인용 영구 금지**.

## 자동 재검토 트리거 (2026-05-14, 7일 후)

| 트리거 | 측정 항목 | 조치 |
|---|---|---|
| **활용 0건** | 4 후보·3 즉시 활용 모두 사용 흔적 없음 | 능동 제안 강도 ↓ (메모리 유지하되 사용자 발화 대기) |
| **1건 이상 활용** | 트리거 발화 또는 시범 진행 흔적 | 페르소나 본문 정식 통합 검토 권고 |
| **사용자 명시 동의** | 4 후보 중 1건 이상 정식 통합 요청 | 즉시 user_persona_triggers.md 갱신 진행 |
| **2026-05-14 도래** | 자연 만료 | 다음 정기 갱신 시점에 재평가 |

## 영구 금지 (가드레일 강화)

| 🔴 금지 | 이유 |
|---|---|
| user_persona.md / user_persona_min.md / user_persona_triggers.md / user_persona_format.md / user_persona_safety.md 5개 파일 **본문 자동 갱신** | 사용자 자산, 명시 동의 게이트 의무 |
| C1·C2·C3 **자동 적용** | 후보 등록만, 시범은 사용자 명시 요청 시 |
| 본 카드를 SessionStart hook **자동 주입 강제** | hook 갱신은 별도 동의 |
| 7일 트리거 **자동 발동** | 트리거 명시만, 작업은 사용자 결정 |

## 단점 보완 매핑 (본 카드의 가치)

| 사용자 인지 단점 | 본 카드 보완 효과 |
|---|---|
| 단점 1: 자동 활용 ≠ 즉시 효과 | 통합 파일이 트리거 매칭 강화 → 페르소나가 후보 자동 회수 가능 |
| 단점 2: 격리 클론 자동 사용 X | C1·C2·C3 명시로 사용자 발화 시 즉시 회수 |
| 단점 3: 페르소나 본문 통합 보류 | 한 파일에서 사용자가 한 번에 검토·결정 가능 → 결정 비용 ↓ |
| 단점 5: 체감 시간차 | 7일 재검토 트리거 + C1·C2·C3 명시로 즉시 활용 가속 |
| (단점 4: 메모리 토큰) | 무조치 (영향 작음, 가독성 우위) |

## 사용자 결정 다음 단계

| 답변 | 진행 |
|---|---|
| **C1 시범** | AI News Radar에 domain-skills 폴더 구조 도입 (30분~1시간) |
| **C2 시범** | AI Orchestra에 claude_wrapper 격리 호출 도입 (30분~1시간) |
| **C3 정식 통합** | user_persona_triggers.md M 패턴에 Karpathy 트리거 4개 추가 (5분) |
| **4건 일괄 통합** | user_persona_triggers.md M·O·F·C 패턴 4개 영문 표준 정식 추가 (15분) |
| **2026-05-14 자동 재검토** | 7일 후 활용 흔적 측정 후 권고 갱신 |
| **보류** | 본 카드 보존, 자동 회수만 활용 |

## 메타데이터

- **신설 일자**: 2026-05-07
- **글로벌 변경**: 0
- **격리 폴더 변경**: 0
- **페르소나 본문 변경**: 0 (5개 파일 무수정 그대로)
- **운영 비용**: 0
- **활용 트리거**: "페르소나 강화", "anti-rationalization", "Goal-Driven Execution", "Chesterton's Fence", "Hyrum's Law", "Beyonce Rule", "C1 적용", "C2 적용", "C3 통합", "7일 재검토" 발화 시 본 카드 자동 회수
