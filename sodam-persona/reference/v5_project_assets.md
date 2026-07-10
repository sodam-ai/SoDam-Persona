---
name: user_persona_v5_project_assets
description: 사용자 17 프로젝트별 자산 매핑 인덱스 (2026-05-07 신설). 프로젝트 작업 시작 발화 시 매칭 자산 즉시 회수. 단점 1(트리거 발화 누락)·단점 5(시맨틱 웹 7종 활용 시점) 동시 보완. quick_wins(8건 즉시 활용)·candidates(19건 보강 후보)와 목적 분리 — 프로젝트 단위 인덱스 전용. 페르소나 본문 무수정.
type: user
originSessionId: dde9d96b-6fbe-4f5a-8cd2-bf43004d73d4
---
# 17 프로젝트별 자산 매핑 인덱스 (2026-05-07)

> ⚠️ **본 카드 목적 분리**:
> - `user_persona_v5_candidates.md` = 이론·표준 표현 보강 후보 19건 (페르소나 본문 통합 게이트)
> - `user_persona_v5_quick_wins.md` = 즉시 실행 후보 8건 (트리거 발화 시 회수)
> - **본 파일** = **17 프로젝트별 매칭 자산 인덱스** (프로젝트 작업 발화 시 회수) ★
>
> 페르소나 본문 5개 파일 무수정. 본 카드는 매핑 인덱스만, 실행은 사용자 결정.

## 17 프로젝트 → 매칭 자산 매트릭스

### 1. AI News Radar (Knowledge Graph + SQLite/FTS5)
- **즉시 활용**: `/memory-bank:search-conversations` (Q1) — 다중 세션 결정 검색
- **시너지**: `browser-harness P2 domain-skills` 폴더 구조 (Q2) → 사이트별 스크래퍼
- **시맨틱 웹**: RDFLib + SWEET 환경 카테고리 / mempalace KG 통합
- **페르소나**: Karpathy Goal-Driven Execution (검증 강화)

### 2. AI Orchestra (멀티 AI CLI 오케스트레이션)
- **즉시 활용**: `meta-harness P1 claude_wrapper` 격리 호출 (Q3)
- **시너지**: agency-agents `agents-orchestrator` (1회용 페르소나)
- **시맨틱 웹**: (해당 없음 - 환경 미정합)
- **페르소나**: MO4 Manager 직접 코드 차단 원칙

### 3. [파기됨 2026-05-13] AI AutoTrade — `archive/ai_autotrade/` 보존, 페르소나 결합 해제 완료

### 4. Ontology Helper (VS Code 확장 + Tauri 앱, Phase 3 지식그래프) ★
- **시맨틱 웹 7종 결정 자료 완비** (Q6 확장):
  - 도구 5종: Apache Jena·Eclipse RDF4J·**RDFLib** ★·Ontop·Owlready2
  - 어휘 2종: gist (비즈니스)·SWEET (환경)
- **권고 우위**: **RDFLib + gist 출발 어휘 + Owlready2 OWL 추론** (Python 환경 부합)
- **즉시 활용**: Q8 gist 100 classes 데이터 모델 출발점
- **후속 옵션**: Q7 Owlready2 OWL 추론 (사용자 명시 동의 시)

### 5. 카카오톡 정리기 (Python+Streamlit 로컬)
- **k-skill 카카오톡 skill** (회색지대, 약관 검토 의무)
- **시너지**: agency-agents `korean-business-navigator` (Q4)
- **페르소나**: O 보존 패턴 (사용자 데이터 보존 최우선)

### 6. OrchestraView (399 테스트 + 25엔진)
- **즉시 활용**: `meta-harness P1 claude_wrapper` 격리 (Q3 변형)
- **시너지**: agency-agents `agents-orchestrator`·`workflow-architect`
- **페르소나**: MO2 QA 3회 루프

### 7. API Key Vault (Tauri+React, 13 기능)
- **🔴 자동 인덱싱 금지** (memory-bank·graphify·mempalace 모두 금지)
- **페르소나 #2 보안 자동 활성**
- **시너지**: agency-agents `agentic-identity-trust`·`zk-steward`
- **자동 처리**: AES-256-GCM + PBKDF2 600k 표준

### 8. AIFlow (오버레이+페르소나+프롬프트+트레이+파일드롭)
- **즉시 활용**: `meta-harness P1` 격리 호출 패턴 (Q3 변형)
- **페르소나**: 모든 메타 규칙 정합 (오버레이 = 페르소나 v5 활성 표시)

### 9. VibeTermKit (PRD v2 + 보안 15섹션)
- **페르소나 v5 안전 작업 + 보안 가드 (sodam-ai/vibe-term-kit)**
- **시너지**: addyosmani agent-skills production-grade (학습)

### 10. GPTaku AI Workflows (sodam-ai, 9 플러그인 + 21 스킬)
- **시너지**: 사용자 자체 플러그인 → addyosmani·gstack 학습 자산 보강

### 11. IdeaPick (Next.js 15, 포트 1601, AI SDK v6)
- **AI SDK v6**: vercel:ai-sdk skill
- **포트 1601**: feedback_test_port

### 12. TeamVault (Next.js 15+Supabase, 팀 지식 창고)
- **즉시 활용**: `browser-harness P2` 외부 데이터 수집 (Q2 변형)
- **시너지**: mempalace KG·graphify
- **페르소나**: O 보존 (팀 데이터 무손실)

### 13. Claude 워크스페이스 대시보드 v2.0
- **사용자 자체 자산** — 메모리 메타 인덱싱

### 14. 포트폴리오 홈페이지 (Next.js 16 + Supabase)
- **k-skill 미세먼지·날씨** + SWEET 환경 어휘 (CC0 자유)
- **모바일 우선 검증** (`feedback_mobile_first.md`)

### 15. Claude Cozy Dashboard (CCWD v0.2.0)
- **사용자 자체 자산**

### 16. Ontology Helper PRD (별도 PRD 자산)
- (Phase 3 백엔드 결정 자료는 #4 항목 참조)

### 17. WSL2 원클릭 키트 (D 드라이브)
- **인프라 자산 — 메모리 메타 정합**

## 트리거 매칭 규칙

사용자 발화에서 **프로젝트명 또는 프로젝트 키워드** 매칭 시:

| 발화 키워드 | 즉시 회수 자산 |
|---|---|
| "AI News Radar", "뉴스 KG" | 위 #1 매핑 4건 |
| "AI Orchestra", "멀티 AI" | 위 #2 매핑 4건 |
| **"Ontology Helper", "Phase 3", "지식그래프"** | **위 #4 시맨틱 웹 7종 + Q6 + Q8** ★ |
| "카카오톡 정리기" | 위 #5 매핑 |
| (다른 12 프로젝트 키워드 매칭) | 각각 매핑 자산 회수 |

## 단점 보완 매핑

| 사용자 인지 단점 | 본 카드 보완 효과 |
|---|---|
| **단점 1: 자동 활용 ≠ 즉시 효과** | 프로젝트명 발화 시 매칭 자산 즉시 회수 → 트리거 발화 부담 ↓↓ |
| **단점 5: 시맨틱 웹 7종 = Phase 3 시점만** | Ontology Helper 발화 시 7종 자산 단일 진입점 회수 |
| 단점 2 (페르소나 통합) | 무조치 (이미 candidates 19건 보완) |
| 단점 3 (체감 시간차) | 무조치 (이미 quick_wins 8건 보완) |
| 단점 4 (메모리 토큰) | 무조치 (1M 대비 2% 미만) |

## 영구 금지 (가드레일)

| 🔴 금지 | 이유 |
|---|---|
| 본 카드를 SessionStart hook 자동 주입 강제 | hook 갱신은 별도 동의 |
| 프로젝트 매칭 시 모든 자산 자동 회수 | 노이즈 회피, 매칭 자산만 회수 |
| API Key Vault에 시맨틱 웹·외부 자산 자동 통합 | 페르소나 #2 자동 활성 |
| 본 카드 본문에 사용자 명시 동의 없이 자산 추가 | 17 프로젝트 정합성 검증 후만 |

## 자동 갱신 트리거

| 트리거 | 조치 |
|---|---|
| 사용자 신규 프로젝트 시작 | 18번째 프로젝트 항목 추가 |
| 신규 reference·skill 자산 등록 | 매칭 프로젝트 항목 갱신 |
| 페르소나 v5 보강 후보 정식 통합 | candidates → 본문 반영, 본 카드 매핑 갱신 |
| 7일 자동 재검토 (2026-05-14) | 활용 흔적 측정 후 매핑 우선순위 조정 |

## 사용자 자산 시너지 매핑

| 자산 | 결합 |
|---|---|
| `user_persona_v5_candidates.md` (이론 19건) | 페르소나 본문 통합 후보 |
| `user_persona_v5_quick_wins.md` (즉시 활용 8건) | Q1~Q8 즉시 회수 후보 |
| **본 카드 (17 프로젝트별 매핑)** | **프로젝트 작업 시작 발화 시 매칭 자산 회수** ★ |
| 7종 시맨틱 웹 reference | Ontology Helper Phase 3 결정 자료 (#4 항목) |
| 6개 격리 폴더 자산 | 프로젝트별 매핑 시 격리 자산 패턴 회수 |

## 메타데이터

- **신설 일자**: 2026-05-07
- **글로벌 변경**: 0
- **격리 폴더 변경**: 0
- **페르소나 본문 변경**: 0
- **운영 비용**: 0
- **활용 트리거**: "AI News Radar", "AI Orchestra", "Ontology Helper", "카카오톡 정리기", "OrchestraView", "API Key Vault", "AIFlow" 등 프로젝트명 발화 시 본 카드 자동 회수
- **분리 짝**: `user_persona_v5_candidates.md`(이론 19) + `user_persona_v5_quick_wins.md`(실행 8)
- **단점 보완**: 1·5 동시 보완 (단점 2·3·4는 이미 보완됨)
