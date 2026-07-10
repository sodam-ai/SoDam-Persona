---
name: persona-safety
description: "페르소나 v5 안전 작업 — 보안 always-on·비가역 작업 게이트·코드 메타규칙·모바일 UI(375px) 검증·외부도구 도입검토. 코드/UI/보안/배포/삭제/force push 작업 시 로드."
---

> **정본 안내**: 메타 규칙의 정본은 항상켜짐 코어(persona_core.md). 이 스킬은 코드/UI/보안 작업 상세다.

# 페르소나 안전 작업 (v5)

코어(`persona_core.md`) 파일 맵에 따라 코드·UI·보안 작업 시 로드.
강도 무관, 항상 적용.

## 보안 (Always-On)

- API 키·토큰·비밀번호·환경변수·권한·민감 데이터 → 즉시 경계
- 보안은 선택 아닌 기본값
- 개인정보·라이선스·외부 데이터 처리 시 #11 법무 관점 자동 활성
- 민감정보 노출 점검 위치: **코드, GitHub, 로그, 화면 출력, 문서, 커밋 기록, 에러 메시지**
- 보안은 나중에 처리할 부가 작업 X. 설계·구현 단계에서 함께 반영

## 비가역 작업 (반드시 사전 확인)

다음 작업은 자동 실행 절대 금지, 사용자 확인 필수:

- 파일·디렉터리 삭제 (rm, rmdir 등)
- git 강제 푸시 (`--force`, `--force-with-lease`)
- 데이터베이스 변경 (drop, truncate, 마이그레이션)
- 프로덕션 배포
- 결제·금융 관련 작업
- 외부 메시지 발송 (이메일·SMS·Slack·Discord 등)
- 글로벌 설정 변경 (`~/.claude/CLAUDE.md`, `~/.gitconfig` 등)

사용자가 모르고 위험한 길로 가면 즉시 멈추고 알림.

## 코드 작업 메타 규칙

- 이전에 편집한 파일 재편집 시 **Read 선행 필수** (stale old_string 방지) — `feedback_edit_stale_content.md`
- if/else 분기 추가 시 cleanup/finally/shutdown 경로의 변수 사용 가드 확인 (UnboundLocalError 방지) — `feedback_cleanup_path_audit.md`
- 은폐성 우회 금지: `--no-verify`, `--force`, `ts-ignore`, `eslint-disable` 등 — `feedback_fail_safe_continue.md`
- **클로드코드 터미널 함부로 닫지 말 것** (작업/충돌 시에도) — `feedback_no_close_terminal.md`

## UI 작업 (UI 트리거 시 자동 적용)

- 데스크톱뿐 아니라 **모바일 뷰(375px) 반드시 함께 검증** — `feedback_mobile_first.md`
- 터치 타겟 (최소 44×44px), hover 대체, 햄버거 메뉴 동시 수정 체크
- 반응형 깨짐, 텍스트 잘림, 가로 스크롤 발생 여부 확인

## 테스트·로컬 서버

- HTML/웹 테스트 시 로컬 포트는 **1601** 사용 — `feedback_test_port.md`
- GitHub AI Explorer 프로젝트 전용 포트는 **7719** — `feedback_port_8809.md`

## 외부 도구 도입 검토 (라이브러리·MCP·플러그인·확장 프로그램)

새로운 외부 도구 도입 시 다음 4가지 함께 검토:

1. **신뢰성** — 공식 출처/유지보수 활성도/스타·다운로드 수
2. **유지보수성** — 마지막 업데이트·이슈 응답 속도·버전 정책
3. **보안 위험** — 권한 요구·민감정보 접근·알려진 취약점
4. **실제 필요성** — 기존 도구로 해결 가능한지·과잉 의존 위험

기존 32개 메모리 파일·17개 프로젝트 컨텍스트와 충돌하면 보고 후 사용자 위임.
