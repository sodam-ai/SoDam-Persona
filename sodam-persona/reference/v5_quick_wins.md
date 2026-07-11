---
name: user_persona_v5_quick_wins
description: 페르소나 v5 즉시 활용 후보 5건 카드 (2026-05-07 신설). Q1~Q5 — 트리거 발화 시 즉시 회수 가능. user_persona_v5_candidates.md(이론·표준 19건)와 분리되어 실행 후보 전용. 단점 1·2·3 동시 보완. 페르소나 본문 무수정.
type: user
originSessionId: dde9d96b-6fbe-4f5a-8cd2-bf43004d73d4
---
# 페르소나 v5 즉시 활용 후보 5건 (Quick Wins) — 2026-05-07

> ⚠️ **본 카드 목적 분리**:
> - `user_persona_v5_candidates.md` = 이론·표준 표현 보강 후보 19건 (페르소나 본문 통합 시 사용자 명시 동의 게이트)
> - **본 파일** = 즉시 실행 가능 후보 5건 (트리거 발화 시 즉시 회수)
>
> 페르소나 본문 5개 파일(user_persona*.md) **무수정 그대로 유지**. 본 카드는 명령 안내·시범 권고만, 실행은 사용자 결정.

## 즉시 활용 후보 5건 (Q1~Q5)

본 세션(2026-05-07) 누적 11건 자산 처리 후 사용자 17 프로젝트 영향력 큰 즉시 활용 후보 5건.

### Q1. `/memory-bank:search-conversations <검색어>` 활용 시범

| 항목 | 값 |
|---|---|
| **즉시도** | ★★★★★ (이미 설치, 슬래시 명령으로 즉시 실행 가능) |
| **적용 영역** | 17 프로젝트 모든 다중 세션 |
| **가치** | 과거 대화·결정·패턴 의미 검색 — 비슷한 결정 즉시 회수 |
| **실행 예시** | `/memory-bank:search-conversations AI AutoTrade 좀비 프로세스 해결` |
| **시간** | 즉시 (1초~5초) |
| **출처** | `reference_jung-wan-kim_memory-bank.md` (이미 설치 완료) |
| **트리거 단어** | "지난 세션", "이전 결정", "비슷한 패턴", "Claude 대화 검색" |

### Q2. browser-harness P2 domain-skills 폴더 구조 시범

| 항목 | 값 |
|---|---|
| **즉시도** | ★★★ (시범 작업 30분~1시간) |
| **적용 프로젝트** | **AI News Radar** (사이트별 스크래퍼 정리) |
| **가치** | 코드 재사용성 ↑, 사이트 추가 시 즉시 확장 |
| **구조** | `domain-skills/<site>/` + `interaction-skills/<pattern>/` |
| **출처** | `references\browser-harness\domain-skills\` (참고용) |
| **차용 가드** | MIT 표시 의무, 코드 직접 복붙은 비추 — 패턴만 자체 구현 |
| **트리거 단어** | "AI News Radar 스크래퍼", "사이트별 재사용", "domain-skills 패턴" |

### Q3. meta-harness P1 claude_wrapper 격리 호출 시범

| 항목 | 값 |
|---|---|
| **즉시도** | ★★★ (시범 작업 30분~1시간) |
| **적용 프로젝트** | **AI Orchestra** (멀티 AI CLI 격리 호출 표준화) |
| **가치** | 글로벌 셋업 오염 0 보장 |
| **격리 플래그** | `--setting-sources ""` + `--plugin-dir [empty_dir]` + `--strict-mcp-config` + `--disable-slash-commands` |
| **출처** | `references\meta-harness\reference_examples\text_classification\claude_wrapper.py` |
| **차용 가드** | MIT 표시 의무, 패턴만 자체 구현 권장 |
| **트리거 단어** | "AI Orchestra 격리", "claude_wrapper 패턴", "headless Claude 호출" |

### Q4. agency-agents korean-business-navigator (1회용 페르소나)

| 항목 | 값 |
|---|---|
| **즉시도** | ★★★★★ (1회용 페르소나, 즉시 활용) |
| **적용 영역** | 한국 시장·문화·관행 결정 시 |
| **가치** | 한국 비즈니스 환경 즉시 페르소나 주입 |
| **활용** | `Read ~/.claude/references/agency-agents/specialized/specialized-korean-business-navigator.md` → 1회용 컨텍스트 주입 |
| **출처** | `references\agency-agents\` (격리 폴더, MIT) |
| **차용 가드** | 1회용 페르소나로만, 글로벌 ~/.claude/agents/ 등록 X |
| **트리거 단어** | "한국 시장", "한국 비즈니스 관행", "korean-business-navigator" |

### Q5. Karpathy Goal-Driven Execution 트리거 페르소나 정식 통합

| 항목 | 값 |
|---|---|
| **즉시도** | ★★★ (사용자 명시 동의 시 5분 작업) |
| **적용 영역** | 17 프로젝트 모든 검증 작업 |
| **가치** | "성공 기준 → loop until verified" 영문 표준 자동 회수 |
| **갱신 위치** | `user_persona_triggers.md` Section M (검증/검토)에 영문 인용 추가 |
| **출처** | `reference_andrej_karpathy_skills.md` (별 116K, MIT) |
| **차용 가드** | **사용자 명시 동의 필수** — 페르소나 본문 갱신 |
| **트리거 단어** | "Goal-Driven Execution", "성공 기준", "verify", "loop until verified", "Karpathy 4 principles" |

### Q6. 시맨틱 웹 7종 비교 매트릭스 + Phase 3 백엔드·어휘 결정 가이드 (2026-05-07 신설·확장)

| 항목 | 값 |
|---|---|
| **즉시도** | ★★★★★ (즉시 회수, 결정 30분~1시간) |
| **적용 영역** | **Ontology Helper Phase 3 백엔드 + 데이터 모델 통합 결정** 시 |
| **결정 3축** | **(1) 카테고리** — 도구(처리) vs 어휘(데이터) → **(2) 도구 카테고리 내** — 저장형 RDF vs 가상 VKG → **(3) 환경** — Java vs Python → **(4) 도메인** — 비즈니스 vs 환경 |
| **도구 5종** | `reference_apache_jena.md`(Java·저장형·Apache 2.0)·`reference_eclipse_rdf4j.md`(Java·저장형·BSD-3·Workbench UI)·`reference_rdflib.md`(**Python**·저장형·BSD-3) ★·`reference_ontop.md`(Java·**가상 VKG**·Apache 2.0)·`reference_owlready2.md`(Python·**OWL 추론** HermiT/Pellet·🟡 LGPL-3.0) |
| **어휘 2종** | `reference_gist.md`(**비즈니스 일반 100 classes**·CC-BY-4.0) ★·`reference_sweet.md`(지구과학·환경 6,000 concepts·**CC0** 가장 자유) |
| **권고 우위 (사용자 환경 + 일반 활용)** | • **도구**: **RDFLib** (Python 직접 부합) + **Owlready2** (OWL 추론 보완) / • **어휘**: **gist** (17 프로젝트 모두 활용) / • **기존 SQL DB 활용 시**: Ontop 유일 |
| **사용자 자산 정합** | Ontology Helper(Tauri+Python+TS) → **RDFLib + gist + (선택) Owlready2** 통합 권고 |
| **트리거 단어** | "Phase 3 백엔드", "Jena vs RDF4J vs RDFLib", "VKG", "OWL 추론", "데이터 모델 출발", "Upper Ontology", "온톨로지 백엔드", "시맨틱 웹 결정" |
| **차용 가드** | Apache 2.0/BSD-3 본문 인용 OK·LGPL-3.0(Owlready2) 동적 링크 OK·CC-BY-4.0(gist) 출처 표시·CC0(SWEET) 가장 자유 |

→ Phase 3 결정 시 본 가이드 회수 → 7종 reference 카드 본문 Read → 4축 분기 결정 → venv/Docker 후속 옵션 (사용자 명시 동의 시).

### Q7. Owlready2 OWL 추론 응용 활용 (2026-05-07 추가)

| 항목 | 값 |
|---|---|
| **즉시도** | ★★★ (venv pip 5분 + Java 설치 필요) |
| **적용 영역** | Phase 3 + **OWL 자동 분류·추론 필요** 시 (RDFLib OWL-RL 대안) |
| **차별** | **HermiT·Pellet 추론기 = OWL-RL보다 강력** |
| **출처** | 원본 PyPI `owlready2` (BitBucket 공식, **pwin 포크 5년+ 정체로 비추**) |
| **차용 가드** | **🟡 LGPL-3.0** — 동적 링크(import) OK / 정적 임베드 X / Java JAR 추론기 별도 |
| **응용 활용 예시** | `from owlready2 import *` → OWL 클래스 직접 조작 + `sync_reasoner()` 자동 분류 |
| **트리거 단어** | "OWL 추론", "HermiT", "Pellet", "OWL 자동 분류", "Owlready2", "온톨로지 추론" |

→ Phase 3 + OWL 추론 필요 시 **RDFLib(범용 RDF/SPARQL) + Owlready2(OWL 추론) 보완 통합** 권고. venv 격리 + Java 설치 사용자 명시 동의 시만.

### Q8. gist Upper Ontology Phase 3 데이터 모델 출발점 (2026-05-07 추가)

| 항목 | 값 |
|---|---|
| **즉시도** | ★★★★★ (즉시 활용 가능) |
| **적용 영역** | Phase 3 데이터 모델 출발점 — 처음부터 짜지 않아도 됨 |
| **차별** | **100 classes 비즈니스 개념** (person·organization·agreement·Magnitude·TimeInterval 등) |
| **출처** | https://w3id.org/gist/14.1.0/gistCore.ttl (Persistent IRI) |
| **차용 가드** | **CC-BY-4.0 출처 표시(Semantic Arts) 의무** — 코드 라이선스와 다른 영역 |
| **응용 활용 예시** | RDFLib `g.parse("https://w3id.org/gist/14.1.0/gistCore.ttl")` → 100 classes 즉시 활용 |
| **트리거 단어** | "Upper Ontology", "비즈니스 어휘", "데이터 모델 출발", "gist", "Semantic Arts", "100 classes 어휘" |

→ Phase 3 + 도구(5종 택 1) + 어휘(gist) 보완 통합 = **6종 자산 완비**. 사용자 17 프로젝트 README에 Semantic Arts 출처 표시 의무.

## 자동 재검토 트리거 (2026-05-14, 7일 후)

| 트리거 | 측정 항목 | 조치 |
|---|---|---|
| Q1 활용 1회 이상 | `/memory-bank:search-conversations` 사용 흔적 | 메모리 검색 가치 체감 → 추가 활용 안내 |
| Q2/Q3 시범 진행 | AI News Radar/AI Orchestra 코드 변경 흔적 | 효과 측정 후 17 프로젝트 확장 권고 |
| Q4 1회용 페르소나 활용 | korean-business-navigator 본문 Read 흔적 | 한국 시장 결정 강화 |
| Q5 정식 통합 동의 | 페르소나 본문 통합 진행 | candidates 5건(우선순위) 일괄 통합 권고 |
| 활용 0건 | 모든 Q1~Q5 무흔적 | 능동 제안 강도 ↓ (메모리 유지하되 사용자 발화 대기) |

## 단점 보완 매핑

| 사용자 인지 단점 | 본 카드 보완 효과 |
|---|---|
| 단점 1: 자동 활용 ≠ 즉시 효과 | Q1·Q4 즉시 활용 가능 명령 명시 → 트리거 발화 시 5건 우선 회수 |
| 단점 2: 페르소나 본문 통합 보류 | Q5 통합 권고 명시 → 사용자 결정 자연 흐름 마련 |
| 단점 3: 체감 시간차 | Q1·Q4 즉시 + Q2·Q3 30분~1시간 작은 단위 시범 → 누적 효과 가속 |
| (단점 4: 토큰 +6KB) | 무조치 (가독성 우위, 본 카드 추가는 ~3KB) |

## 사용자 결정 다음 단계

| 답변 | 진행 |
|---|---|
| **Q1 활용** | `/memory-bank:search-conversations <검색어>` 즉시 실행 |
| **Q2 시범** | AI News Radar에 domain-skills 폴더 구조 도입 (30분~1시간, 사용자 명시 요청 시) |
| **Q3 시범** | AI Orchestra에 claude_wrapper 격리 호출 도입 (30분~1시간, 사용자 명시 요청 시) |
| **Q4 활용** | Read korean-business-navigator.md → 1회용 페르소나 (즉시) |
| **Q5 정식 통합** | user_persona_triggers.md M 패턴 갱신 (5분, 사용자 명시 동의 시) |
| **2026-05-14 자동 재검토** | 7일 후 Q1~Q5 활용 흔적 측정 후 권고 갱신 |

## 영구 금지 (가드레일)

| 🔴 금지 | 이유 |
|---|---|
| Q1~Q5 자동 시범 진행 | 사용자 명시 요청 시만 |
| Q5 자동 페르소나 본문 통합 | 사용자 명시 동의 시만 (의도적 게이트) |
| Q4 본문을 글로벌 ~/.claude/agents/에 복사 | 1회용 페르소나로만, 글로벌 등록 X |
| Q2·Q3 본문 직접 복붙 | MIT 표시 의무, 패턴만 자체 구현 |

## 사용자 자산 시너지 매핑

| 자산 | 결합 |
|---|---|
| `user_persona_v5_candidates.md` (이론 19건) | 본 카드(실행 5건)와 목적 분리 — 사용자 검토 비용 ↓ |
| memory-bank 플러그인 (이미 설치) | Q1 직접 활용 |
| references\browser-harness\ (격리) | Q2 출처 |
| references\meta-harness\ (격리) | Q3 출처 |
| references\agency-agents\ (격리, INDEX_KR.md) | Q4 출처 |
| reference_andrej_karpathy_skills.md (116K MIT) | Q5 출처 |

## 메타데이터

- **신설 일자**: 2026-05-07
- **글로벌 변경**: 0
- **격리 폴더 변경**: 0
- **페르소나 본문 변경**: 0 (5개 파일 무수정 그대로)
- **운영 비용**: 0
- **활용 트리거**: "즉시 활용", "quick wins", "Q1·Q2·Q3·Q4·Q5", "다음 작업", "체감 가치", "지금 뭐 활용할 수 있어" 발화 시 본 카드 자동 회수
- **분리 짝**: `user_persona_v5_candidates.md` (이론·표준 19건)
