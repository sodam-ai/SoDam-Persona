---
name: user_persona_v5_decision_gates
description: 페르소나 v5 사용자 결정 게이트 통합 카드 (2026-05-07 신설). 5 GATE — 영역 중복·Phase 3 백엔드·페르소나 본문 통합·Docker Milvus 후속·Q5 Goal-Driven 통합. **단점 5·6 동시 보완** (영역 중복 결정 부담 + 후속 옵션 별도 시간). 통합 파일 4축 완성: candidates(이론 19) + quick_wins(실행 8) + project_assets(17 프로젝트) + decision_gates(5 GATE). 페르소나 본문 무수정.
type: user
originSessionId: dde9d96b-6fbe-4f5a-8cd2-bf43004d73d4
---
# 페르소나 v5 사용자 결정 게이트 통합 카드 (2026-05-07)

> ⚠️ **본 카드 목적 분리**:
> - `candidates` = 이론·표준 표현 보강 후보 19건
> - `quick_wins` = 즉시 실행 후보 8건
> - `project_assets` = 17 프로젝트별 매칭 자산
> - **본 파일** = **사용자 결정 게이트 5건** ★
>
> 페르소나 본문 5개 파일 무수정. 본 카드는 결정 안내만, 실행은 사용자 명시 결정 후만.

## 5 GATE 결정 게이트

### GATE-1: 영역 중복 자산 결정 (대화 메모리 3종)

| 자산 | 우위 영역 | 사용자 환경 부합 |
|---|---|---|
| **mempalace** (메모리 등록) | local-first verbatim, 별 51K | ✅ Python |
| **memory-bank** (이미 설치) | 이미 설치 + KG, sqlite-vec | ✅ 이미 운영 중 |
| **memsearch** (메모리 등록) | **마크다운 + 멀티 AI 도구 + Milvus Lite** | ✅ Python+TS, 단 558MB ONNX |

**결정 절차**:
1. 사용자 활용 사례 기준 우위 결정 (mempalace verbatim·memory-bank 운영·memsearch 멀티 도구)
2. 셋 중 하나만 풀 활용 권고 (영역 중복 = 동시 사용 시 검색 결과 혼란)
3. 결정 후 다른 2종은 학습 자료로만 보존

→ 자료: `reference_mempalace.md` + `reference_jung-wan-kim_memory-bank.md` + `reference_memsearch.md` 3종 비교 매트릭스

### GATE-2: Phase 3 백엔드 결정 (시맨틱 웹 7종)

| 차원 | 결정 항목 |
|---|---|
| (1) 카테고리 | 도구 vs 어휘 (둘 다 필요) |
| (2) 도구 카테고리 | 저장형 RDF (Jena·RDF4J·RDFLib) vs 가상 VKG (Ontop) |
| (3) 환경 | Java vs Python |
| (4) 도메인 | 비즈니스(gist) vs 환경(SWEET) |

**권고 우위**:
- 사용자 환경(Python) + 신규 RDF: **RDFLib + gist + (선택) Owlready2**
- 기존 SQL DB 활용: Ontop 추가
- Workbench 시각화: RDF4J 추가

→ 자료: Q6 7종 매트릭스 + 7종 reference 카드

### GATE-3: 페르소나 본문 통합 결정 (candidates 우선순위 5건)

| 후보 | 페르소나 위치 | 영향 |
|---|---|---|
| **Chesterton's Fence** | user_persona_triggers.md O 패턴 | 모든 변경 작업 |
| **Hyrum's Law** | user_persona_triggers.md F 패턴 | 모든 충돌 분석 |
| **Goal-Driven Execution** | user_persona_triggers.md M 패턴 | 모든 검증 |
| **MO1 P4 파일 경계** | user_persona_safety.md | frontend/backend 분리 |
| **MO2 QA 3회 루프** | user_persona_format.md Section 11 보강 | 모든 검증 |

**결정 절차**: 사용자 명시 동의 시 5건 일괄 통합 (15분) 또는 개별 통합

→ 자료: `user_persona_v5_candidates.md` 19건 (5건은 우선순위)

### GATE-4: Docker Milvus 후속 결정 (claude-context vs memsearch)

| 자산 | Milvus 모드 | 영역 | 사용자 환경 |
|---|---|---|---|
| **claude-context** | Docker 필수 | 코드 검색 | 1~2시간 통합 |
| **memsearch** | Lite 단일 파일 | 대화 메모리 | 5분 + 558MB |

**결정 절차**:
1. 코드 검색 필요 시 → claude-context (Docker 부담)
2. 대화 메모리 필요 시 → memsearch (Lite 가벼움) 단 GATE-1과 결합
3. 둘 다 필요 시 영역 분리 통합

→ 자료: `reference_claude_context.md` + `reference_memsearch.md`

### GATE-5: Q5 Goal-Driven Execution 정식 통합

| 항목 | 값 |
|---|---|
| 갱신 위치 | `user_persona_triggers.md` Section M (검증/검토) |
| 추가 트리거 | "성공 기준"·"verify"·"loop until verified"·"success criteria" |
| 영문 인용 | Karpathy "LLMs are exceptionally good at looping..." |
| 시간 | 5분 |

**결정 절차**: 사용자 명시 동의 → 즉시 진행. GATE-3 5건 일괄 통합 시 함께 처리 가능.

→ 자료: `quick_wins` Q5 + `reference_andrej_karpathy_skills.md`

## 4축 통합 파일 완성 (사용자 자산 능동 활용)

| 파일 | 목적 | 회수 시점 |
|---|---|---|
| `candidates` (19건) | 이론·표준 표현 보강 후보 | "페르소나 강화" 발화 |
| `quick_wins` (8건, Q1~Q8) | 즉시 실행 후보 | 트리거 단어 발화 |
| `project_assets` (17 프로젝트) | 프로젝트별 매칭 자산 | 프로젝트명 발화 |
| **`decision_gates` (5 GATE)** ★ | **사용자 결정 게이트** | **결정/Phase 진행/본문 통합 발화** |

→ 사용자 자산 능동 활용 **4축 완비**

## 단점 보완 매핑

| 사용자 인지 단점 | 본 카드 보완 |
|---|---|
| 단점 1 (트리거 누락) | 무조치 (이미 project_assets·quick_wins 보완) |
| 단점 2 (페르소나 본문 통합) | **GATE-3·5에서 사용자 명시 결정 시 즉시 진행** |
| 단점 3 (체감 시간차) | 무조치 (이미 quick_wins 보완) |
| 단점 4 (메모리 +30KB) | 무조치 (1M 대비 3%, 가독성 우위) |
| **단점 5 (영역 중복 결정 부담)** | **GATE-1로 즉시 보완** ★ |
| **단점 6 (후속 옵션 별도 시간)** | **GATE-2·4로 절차 명문화** ★ |

## 결정 트리거 (사용자 발화)

| 발화 | 회수 GATE |
|---|---|
| "결정 게이트", "결정 자료", "어떻게 결정해" | 본 카드 전체 |
| "mempalace vs memory-bank vs memsearch", "영역 중복 결정" | GATE-1 |
| "Phase 3 백엔드", "시맨틱 웹 결정", "Jena vs RDF4J vs RDFLib" | GATE-2 |
| "페르소나 본문 통합", "Chesterton·Hyrum 정식 적용" | GATE-3 |
| "Docker Milvus 진행", "claude-context 통합", "memsearch 통합" | GATE-4 |
| "Goal-Driven Execution 정식 통합", "Q5 페르소나 통합" | GATE-5 |

## 영구 금지 (가드레일)

| 🔴 금지 | 이유 |
|---|---|
| user_persona*.md 5개 본문 **자동 갱신** | 사용자 자산 게이트 |
| GATE 결정 **자동 진행** | 사용자 명시 결정 시만 |
| decision_gates SessionStart hook **자동 주입 강제** | hook 갱신 별도 동의 |
| GATE 결정 후 **자동 후속 작업** | 각 결정마다 사용자 명시 동의 |
| AI AutoTrade·API Key Vault GATE 자동 적용 | 페르소나 #13·#11·#2 자동 활성 |

## 사용자 자산 시너지 (4축 완비)

| 자산 | 결합 |
|---|---|
| `candidates` (19건) | GATE-3 우선순위 5건 결정 자료 |
| `quick_wins` (8건) | GATE-5 Q5 통합 결정 자료 |
| `project_assets` (17 프로젝트) | GATE-1·2·4 프로젝트별 매핑 |
| **`decision_gates` (5 GATE)** | **사용자 결정 단일 진입점** ★ |
| 23 reference 카드 | 각 GATE 결정 시 본문 회수 |

## 자동 갱신 트리거

| 트리거 | 조치 |
|---|---|
| 사용자 GATE 결정 진행 | 해당 GATE 진행 상태 갱신 |
| 신규 reference·skill 자산 등록 | 관련 GATE 자료 매핑 추가 |
| 페르소나 본문 정식 통합 완료 | GATE-3·5 진행 상태 완료 처리 |
| 7일 자동 재검토 (2026-05-14) | 결정 진행 흔적 측정 |

## 메타데이터

- **신설 일자**: 2026-05-07
- **글로벌 변경**: 0
- **격리 폴더 변경**: 0
- **페르소나 본문 변경**: 0
- **운영 비용**: 0
- **활용 트리거**: "결정 게이트", "결정 자료", "GATE", "Phase 3 진행", "본문 통합", "영역 중복 결정", "Docker Milvus 결정", "Goal-Driven 통합" 발화 시 본 카드 자동 회수
- **분리 짝**: candidates(이론 19) + quick_wins(실행 8) + project_assets(17 프로젝트) + decision_gates(5 GATE) = **4축 완비**
- **단점 보완**: 5·6 동시 보완 (단점 1·3·4 무조치, 단점 2 의도적 게이트)
