#!/usr/bin/env node
/**
 * SoDam-Persona 정합성 검사기 (자기완결 — Node 내장만 사용, 의존성 0)
 *
 * 목적: 관점 수(11→12→13→14→15 같은) 드리프트·스킬 수 불일치·도메인 배선 누락·
 *       JSON 오류를 push 전에 기계적으로 잡는다. (AGENTS.md 하네스 원칙: 골든 룰을 규칙으로 인코딩)
 *
 * 사용: node validate.mjs   (저장소 루트에서. 종료코드 0=통과, 1=실패)
 *
 * 설계 주의:
 *  - "15년(경력)"과 "15명/개/관점(관점 수)"은 다르다 → 년(年)은 절대 매칭하지 않는다.
 *  - reference/ 백로그 카드는 과거 스냅샷이라 엄격검사에서 제외(경고만).
 *  - 스크립트 위치 기준 상대경로 → 새 PC/다른 경로에서도 작동(자기완결).
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = dirname(fileURLToPath(import.meta.url));
const P = (...p) => join(ROOT, ...p);
const read = (rel) => readFileSync(P(rel), 'utf8');

const errors = [];
const err = (m) => errors.push(m);

// ── 1) 관점 수 N = B 테이블 행 수 (source of truth) ───────────────────────
const PLUGIN_ROOT = 'plugins/sodam-persona';
const pluginPath = (...parts) => [PLUGIN_ROOT, ...parts].join('/');
const triggers = read(pluginPath('skills/persona-triggers/SKILL.md'));
const bSection = triggers.slice(
  triggers.indexOf('## B.'),
  triggers.indexOf('복수 관점 명시')
);
const rows = [...bSection.matchAll(/^\|\s*(\d+)\s*\|/gm)].map((m) => +m[1]);
const N = rows.length;
// 연속성: 1..N 이어야 함
for (let i = 0; i < N; i++) {
  if (rows[i] !== i + 1) err(`B테이블 관점 번호 불연속: ${i + 1}번 위치에 ${rows[i]}`);
}
if (N < 1) err('B테이블에서 관점 행을 찾지 못함');

// ── 2) 관점 수 표기 일관성 (모든 핵심 파일이 N과 일치해야 함) ────────────
const KEY_FILES = [
  pluginPath('hooks/persona_core.md'),
  pluginPath('hooks/persona_marker.txt'),
  pluginPath('skills/persona-format/SKILL.md'),
  pluginPath('skills/persona-triggers/SKILL.md'),
  pluginPath('skills/persona-investor/SKILL.md'),
  pluginPath('skills/persona-lawyer/SKILL.md'),
  pluginPath('skills/persona-accountant/SKILL.md'),
  pluginPath('skills/persona-marketer/SKILL.md'),
  pluginPath('reference/persona_full_core.md'),
  pluginPath('reference/test_scenarios.md'),
  'README.md',
  'README.en.md',
];
// 관점 수를 뜻하는 표현만 (년 제외). 캡처된 모든 숫자는 N과 같아야 한다.
const COUNT_PATTERNS = [
  /(\d+)\s*명/g,               // N명 (모든 명 = 관점 인원수)
  /(\d+)\s*관점/g,             // N관점
  /다관점 판단 \((\d+)개\)/g,  // format "(N개)"
  /(\d+)개 관점/g,             // README "N개 관점"
  /(\d+)개 도메인 관점/g,      // core "N개 도메인 관점"
  /(\d+)\s*perspectives/gi,    // README.en/GUIDE.en "N perspectives"
];
for (const f of KEY_FILES) {
  if (!existsSync(P(f))) { err(`핵심 파일 없음: ${f}`); continue; }
  const text = read(f);
  for (const re of COUNT_PATTERNS) {
    for (const m of text.matchAll(re)) {
      if (+m[1] !== N) err(`관점 수 불일치 (${f}): "${m[0]}" ≠ ${N}명 기준`);
    }
  }
}

// ── 3) 패턴 수 (A~T) 일관성 ──────────────────────────────────────────────
const letters = [...triggers.matchAll(/^## ([A-Z])\. /gm)].map((m) => m[1]);
const uniqLetters = [...new Set(letters)].sort();
const descMatch = triggers.match(/A~([A-Z])\s*(\d+)패턴/);
if (!descMatch) err('트리거 description에서 "A~X N패턴" 표기를 못 찾음');
else {
  const [, lastLetter, patCount] = descMatch;
  if (+patCount !== uniqLetters.length)
    err(`패턴 수 불일치: 표기 ${patCount} ≠ 실제 섹션 ${uniqLetters.length}개`);
  if (uniqLetters.at(-1) !== lastLetter)
    err(`패턴 마지막 글자 불일치: 표기 A~${lastLetter} ≠ 실제 A~${uniqLetters.at(-1)}`);
}

// ── 4) 스킬 수 일관성 (실제 폴더 = 문서 표기) + frontmatter name=폴더명 ──
const skillsDir = P(PLUGIN_ROOT, 'skills');
const skillFolders = readdirSync(skillsDir).filter((d) =>
  statSync(join(skillsDir, d)).isDirectory()
);
const nSkills = skillFolders.length;
for (const folder of skillFolders) {
  const skillPath = join(skillsDir, folder, 'SKILL.md');
  if (!existsSync(skillPath)) { err(`스킬 폴더에 SKILL.md 없음: ${folder}`); continue; }
  const fm = readFileSync(skillPath, 'utf8');
  const nameMatch = fm.match(/^name:\s*(\S+)/m);
  if (!nameMatch) err(`frontmatter name 없음: ${folder}/SKILL.md`);
  else if (nameMatch[1] !== folder)
    err(`frontmatter name(${nameMatch[1]}) ≠ 폴더명(${folder})`);
  if (!/^description:\s*.+/m.test(fm)) err(`frontmatter description 없음: ${folder}/SKILL.md`);
}
const readme = read('README.md');
const readmeSkill = readme.match(/상황별 \((\d+)개\)/);
if (readmeSkill && +readmeSkill[1] !== nSkills)
  err(`README 스킬 수(${readmeSkill[1]}) ≠ 실제(${nSkills})`);

// ── 4-1) 영문 문서(README.en) 스킬 수 + 트리거 패턴 수 표기 (2026-07-26 추가, 2026-07-27 GUIDE 제거 반영) ──
// 근거: validate.mjs가 기존엔 한글 README.md만 검사 → 영문 문서는 수치가
// 어긋나도 CI가 못 잡음(실측 확인). "Skills (N)" 표기와 "N patterns" 표기를 교차검사.
for (const f of ['README.en.md']) {
  const text = read(f);
  const skillMatch = text.match(/Skills? ?\((\d+)\)/);
  if (skillMatch && +skillMatch[1] !== nSkills)
    err(`${f} 스킬 수(${skillMatch[1]}) ≠ 실제(${nSkills})`);
  const patternMatchEn = text.match(/(\d+)\s*patterns/i);
  if (patternMatchEn && +patternMatchEn[1] !== uniqLetters.length)
    err(`${f} 패턴 수(${patternMatchEn[1]}) ≠ 실제(${uniqLetters.length})`);
}
// 한글 문서의 "트리거 패턴 20개(A~T)" 표기도 동일 기준으로 교차검사 (기존엔 미검사였음)
for (const f of ['README.md']) {
  const text = read(f);
  const patternMatchKo = text.match(/트리거 패턴 (\d+)개/);
  if (patternMatchKo && +patternMatchKo[1] !== uniqLetters.length)
    err(`${f} 패턴 수(${patternMatchKo[1]}) ≠ 실제(${uniqLetters.length})`);
}

// ── 5) 도메인 페르소나 배선 (core 파일맵 · marker 파일맵에 모두 존재) ────
const DOMAINS = ['persona-investor', 'persona-lawyer', 'persona-accountant', 'persona-marketer'];
const core = read(pluginPath('hooks/persona_core.md'));
const marker = read(pluginPath('hooks/persona_marker.txt'));
for (const d of DOMAINS) {
  if (!existsSync(P(PLUGIN_ROOT, 'skills', d, 'SKILL.md'))) err(`도메인 스킬 없음: ${d}`);
  if (!core.includes(d)) err(`persona_core.md 파일맵에 ${d} 누락`);
  if (!marker.includes(d)) err(`persona_marker.txt 파일맵에 ${d} 누락`);
}

// ── 6) JSON 유효성 + 이름/소스 경로 ────────────────────────────────────
try {
  const plugin = JSON.parse(read(pluginPath('.claude-plugin/plugin.json')));
  if (plugin.name !== 'sodam-persona') err(`plugin.json name(${plugin.name}) ≠ sodam-persona`);
} catch (e) { err(`plugin.json 파싱 실패: ${e.message}`); }
try {
  const mkt = JSON.parse(read('.claude-plugin/marketplace.json'));
  const p0 = mkt.plugins?.[0];
  if (p0?.name !== 'sodam-persona') err(`marketplace plugins[0].name(${p0?.name}) ≠ sodam-persona`);
  if (p0?.source && !existsSync(P(p0.source)))
    err(`marketplace source 경로 없음: ${p0.source}`);
} catch (e) { err(`marketplace.json 파싱 실패: ${e.message}`); }

// ── 7) 면책(disclaimer) 강제 존재 — #14 회계세무·#11 법률 안전 필수 ────────
// 라이브 검증에서 #14 세무 답변이 면책을 누락(2026-07-11) → 항상-주입 레이어에
// "면책 강제" 규칙이 실제로 존재하는지 기계 검사(드리프트 재발 차단).
const DISCLAIMER_CHECKS = [
  [pluginPath('hooks/persona_core.md'), '면책 강제'],
  [pluginPath('hooks/persona_marker.txt'), '면책 강제'],
  [pluginPath('skills/persona-accountant/SKILL.md'), '면책'],
  [pluginPath('skills/persona-lawyer/SKILL.md'), '면책'],
];
for (const [f, kw] of DISCLAIMER_CHECKS) {
  if (!existsSync(P(f))) { err(`면책 검사 대상 파일 없음: ${f}`); continue; }
  if (!read(f).includes(kw)) err(`면책 강제 누락 (${f}): "${kw}" 문자열 없음`);
}

// ── 8) HTML 4개 동기화 경고 (소프트 — exit code에 영향 없음, 2026-07-26 추가) ──
// 근거: HTML은 build-docs.mjs(pandoc)로 md에서 재생성되는 산출물이라 정본이 아님.
// 재생성을 잊고 md만 고치면 배포 문서가 옛 수치로 남는 것을 "경고"로만 알린다.
const warnings = [];
const HTML_FILES = ['README.html', 'README.en.html'];
for (const f of HTML_FILES) {
  if (!existsSync(P(f))) continue;
  const text = read(f);
  const nums = new Set();
  for (const re of [/(\d+)\s*명/g, /(\d+)\s*관점/g, /(\d+)개 관점/g, /(\d+)\s*perspectives/gi]) {
    for (const m of text.matchAll(re)) nums.add(+m[1]);
  }
  for (const n of nums) if (n !== N) warnings.push(`${f}: 관점 수 "${n}" ≠ 실제(${N}) — build-docs.mjs 재생성 필요 의심`);
  const skillMatch = text.match(/Skills? ?\((\d+)\)/);
  if (skillMatch && +skillMatch[1] !== nSkills)
    warnings.push(`${f}: 스킬 수 "${skillMatch[1]}" ≠ 실제(${nSkills}) — build-docs.mjs 재생성 필요 의심`);
}
if (warnings.length) {
  console.log(`⚠️  HTML 동기화 경고 ${warnings.length}건 (실패 아님, node build-docs.mjs로 해결):`);
  for (const w of warnings) console.log(`  · ${w}`);
}

// ── 9) 깨진 문서 참조 검사 (2026-08-04 추가) ──────────────────────────────
// 근거: PR #8(GUIDE.md 폐지)이 create.md의 GUIDE.md 참조 2곳을 못 지운 채 CI를
// 통과한 실사고(2026-08-04 실측). 1~8번 검사 중 "참조된 파일이 실제로 있는가"를
// 보는 게 없어서 못 잡았다 — 그 빈틈만 메운다.
// 설계: 이 저장소 자신의 파일(README·persona_core.md·skills/persona-*/SKILL.md 등)만
// 검사 대상으로 삼는다. feedback_*.md·reference_*.md·user_persona*.md 같은 사용자
// 개인 메모리 파일은 이 저장소 밖에 있는 게 정상이라 대상에서 제외(외부 참조 오탐 방지).
const REPO_KNOWN_BASENAMES = new Set([
  'persona_core.md', 'persona_marker.txt', 'hooks.json', 'plugin.json',
  'marketplace.json', 'README.md', 'README.en.md', 'LICENSE', 'NOTICE',
  'validate.mjs', 'build-docs.mjs', 'doc-theme.html', 'GUIDE.md', 'GUIDE.en.md',
]);
const isCheckableRepoRef = (ref) => {
  if (!/^[A-Za-z0-9_./-]+\.(md|mjs|js|json|html|txt)$/.test(ref)) return false;
  if (REPO_KNOWN_BASENAMES.has(ref)) return true;
  if (/^persona-[a-z0-9-]+\/SKILL\.md$/.test(ref)) return true;
  if (ref.startsWith('plugins/sodam-persona/')) return true;
  if (ref.startsWith('reference/')) return true;
  if (ref.startsWith('.claude-plugin/')) return true;
  if (ref.startsWith('.github/')) return true;
  return false;
};
const refCandidates = (ref) => [
  P(ref), P(PLUGIN_ROOT, ref), P(PLUGIN_ROOT, 'skills', ref), P(PLUGIN_ROOT, 'hooks', ref),
];
const GITIGNORED_BACKLOG = new Set(['v5_candidates.md', 'v5_decision_gates.md', 'v5_project_assets.md', 'v5_quick_wins.md']);
function listFiles(dir, exts, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) { listFiles(full, exts, out); continue; }
    if (!exts.some((e) => name.endsWith(e))) continue;
    if (GITIGNORED_BACKLOG.has(name)) continue; // 과거 스냅샷, 배포 제외(.gitignore 동일 목록)
    out.push(full);
  }
  return out;
}
const DOC_SCAN_FILES = [P('README.md'), P('README.en.md'), ...listFiles(P(PLUGIN_ROOT), ['.md'])];
for (const file of DOC_SCAN_FILES) {
  const text = readFileSync(file, 'utf8');
  const rel = file.slice(ROOT.length + 1);
  for (const m of text.matchAll(/`([^`\n]+)`/g)) {
    const ref = m[1];
    if (isCheckableRepoRef(ref) && !refCandidates(ref).some(existsSync)) {
      err(`깨진 문서 참조 (${rel}): "${ref}" 파일 없음`);
    }
  }
}

// ── 10) 개인 절대경로 노출 검사 (2026-08-04 추가) ─────────────────────────
// 근거: 커밋 9722404("개인 절대경로 노출 제거")가 reference/만 훑고, 실제 배포되는
// skills/persona-triggers/SKILL.md의 개인 스크린샷 폴더 경로는 놓쳤다(2026-08-04 실측).
// 실제 배포 플러그인과 공개 README를 검사한다. 자리표시자가 필요하면
// `<plugin-creator-dir>`처럼 운영체제 절대경로가 아닌 표현을 사용한다.
const PERSONAL_PATH_PATTERNS = [/[A-Za-z]:\\[^`\s]*/g, /\/(?:Users|home)\/[A-Za-z0-9_.-]+/g];
const PERSONAL_PATH_SCAN_FILES = [
  P('README.md'),
  P('README.en.md'),
  ...listFiles(P(PLUGIN_ROOT), ['.md', '.js', '.json', '.txt']),
];
function checkPersonalPaths(text, rel) {
  for (const re of PERSONAL_PATH_PATTERNS) {
    for (const m of text.matchAll(re)) {
      err(`개인 절대경로 노출 의심 (${rel}): "${m[0]}"`);
    }
  }
}
for (const file of PERSONAL_PATH_SCAN_FILES) {
  const text = readFileSync(file, 'utf8');
  const rel = file.slice(ROOT.length + 1);
  checkPersonalPaths(text, rel);
}
// 정규식 구현 자체의 문자열은 오탐이므로, validator는 설명 주석만 자체 검사한다.
const validatorComments = readFileSync(P('validate.mjs'), 'utf8')
  .split(/\r?\n/)
  .filter(line => line.trimStart().startsWith('//'))
  .join('\n');
checkPersonalPaths(validatorComments, 'validate.mjs (comments)');

// ── 11) hooks.json 변수명 오류 · 참조 스크립트 존재 검사 (2026-08-18 추가) ──
// 근거: hooks.json이 Codex 이식 중 Claude Code 변수 ${CLAUDE_PLUGIN_ROOT}를
// Codex 관례 ${PLUGIN_ROOT}로 잘못 갖고 있던 채 커밋된 적이 있음(2026-08-17 발견·수정).
// 이 상태면 JSON 문법은 유효해 기존 검사(#6)로는 못 잡지만, hook이 Claude Code에서
// 전혀 실행되지 않는 치명적 결함이 된다 — 그 빈틈만 메운다.
try {
  const hooksConfig = JSON.parse(read(pluginPath('hooks/hooks.json')));
  const strings = [];
  (function walk(node) {
    if (typeof node === 'string') { strings.push(node); return; }
    if (Array.isArray(node)) { node.forEach(walk); return; }
    if (node && typeof node === 'object') { Object.values(node).forEach(walk); }
  })(hooksConfig);
  for (const s of strings) {
    if (/\bPLUGIN_ROOT\b/.test(s))
      err(`hooks.json 잘못된 변수명 (Claude Code는 \${CLAUDE_PLUGIN_ROOT} 사용): "${s}"`);
    for (const m of s.matchAll(/\$\{CLAUDE_PLUGIN_ROOT\}\/([^"']+)/g)) {
      if (!existsSync(P(PLUGIN_ROOT, m[1]))) err(`hooks.json 참조 스크립트 없음: ${m[1]}`);
    }
  }
} catch (e) { err(`hooks.json 파싱 실패: ${e.message}`); }

// ── 12) 도메인 스킬 "트리거 단어군" 문자열이 persona-triggers와 그대로 동기화되어 있는가 ──
// 근거: commands/create.md 3-1단계 자신이 "실제 라이브 테스트에서 17건 누락 발견됨"이라고
// 기록할 만큼, 같은 트리거 단어 목록이 여러 파일에 손으로 복사돼 있다가 한쪽만 고쳐 어긋나는
// 사고가 이미 실제로 있었다. persona-accountant/persona-marketer SKILL.md는 persona-triggers의
// 해당 도메인 "트리거 단어군:" 줄을 그대로 복사해 두는 것이 기존 관례(실측 확인)이므로, 그
// 줄이 서로 다르면 어느 한쪽이 갱신 없이 어긋난 것 — 이 관례를 지키는 도메인만 검사한다.
// (investor·lawyer는 skill 파일에 별도 단어 목록을 두지 않는 설계라 검사 대상에서 자연히 제외됨 —
// 형식이 다른 파일끼리 억지로 비교해 오탐을 만들지 않기 위함)
for (const d of DOMAINS) {
  const skillPath = pluginPath('skills', d, 'SKILL.md');
  if (!existsSync(P(skillPath))) continue;
  const m = read(skillPath).match(/트리거 단어군:\s*([^\n]+)/);
  if (!m) continue;
  const line = m[1].trim();
  if (!triggers.includes(line))
    err(`도메인 트리거 단어 동기화 어긋남 (${d}/SKILL.md): persona-triggers/SKILL.md에 동일한 "트리거 단어군" 줄이 없음`);
}

// ── 결과 ────────────────────────────────────────────────────────────────
console.log(`SoDam-Persona 정합성 검사 — 관점 ${N}명 · 패턴 ${uniqLetters.length}개 · 스킬 ${nSkills}개`);
if (errors.length === 0) {
  console.log('✅ PASS — 불일치 0건');
  process.exit(0);
} else {
  console.log(`❌ FAIL — ${errors.length}건`);
  for (const e of errors) console.log(`  · ${e}`);
  process.exit(1);
}
