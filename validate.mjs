#!/usr/bin/env node
/**
 * SoDam-Persona 정합성 검사기 (자기완결 — Node 내장만 사용, 의존성 0)
 *
 * 목적: 관점 수(11→12→13→14→15 같은) 드리프트·스킬 수 불일치·도메인 배선 누락·
 *       JSON 오류를 push 전에 기계적으로 잡는다. (CLAUDE.md 하네스 원칙: 골든 룰을 규칙으로 인코딩)
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
const triggers = read('sodam-persona/skills/persona-triggers/SKILL.md');
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
  'sodam-persona/hooks/persona_core.md',
  'sodam-persona/hooks/persona_marker.txt',
  'sodam-persona/skills/persona-format/SKILL.md',
  'sodam-persona/skills/persona-triggers/SKILL.md',
  'sodam-persona/skills/persona-investor/SKILL.md',
  'sodam-persona/skills/persona-lawyer/SKILL.md',
  'sodam-persona/reference/persona_full_core.md',
  'sodam-persona/reference/test_scenarios.md',
  'README.md',
  'GUIDE.md',
  'sodam-persona/.claude-plugin/plugin.json',
  '.claude-plugin/marketplace.json',
];
// 관점 수를 뜻하는 표현만 (년 제외). 캡처된 모든 숫자는 N과 같아야 한다.
const COUNT_PATTERNS = [
  /(\d+)\s*명/g,               // N명 (모든 명 = 관점 인원수)
  /(\d+)\s*관점/g,             // N관점
  /다관점 판단 \((\d+)개\)/g,  // format "(N개)"
  /(\d+)개 관점/g,             // README "N개 관점"
  /(\d+)개 도메인 관점/g,      // core "N개 도메인 관점"
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
const skillsDir = P('sodam-persona/skills');
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
const guide = read('GUIDE.md');
const readmeSkill = readme.match(/상황별 \((\d+)개\)/);
if (readmeSkill && +readmeSkill[1] !== nSkills)
  err(`README 스킬 수(${readmeSkill[1]}) ≠ 실제(${nSkills})`);
const guideSkill = guide.match(/Skills? ?\((\d+)\)/);
if (guideSkill && +guideSkill[1] !== nSkills)
  err(`GUIDE 스킬 수(${guideSkill[1]}) ≠ 실제(${nSkills})`);

// ── 5) 도메인 페르소나 배선 (core 파일맵 · marker 파일맵에 모두 존재) ────
const DOMAINS = ['persona-investor', 'persona-lawyer', 'persona-accountant', 'persona-marketer'];
const core = read('sodam-persona/hooks/persona_core.md');
const marker = read('sodam-persona/hooks/persona_marker.txt');
for (const d of DOMAINS) {
  if (!existsSync(P(`sodam-persona/skills/${d}/SKILL.md`))) err(`도메인 스킬 없음: ${d}`);
  if (!core.includes(d)) err(`persona_core.md 파일맵에 ${d} 누락`);
  if (!marker.includes(d)) err(`persona_marker.txt 파일맵에 ${d} 누락`);
}

// ── 6) JSON 유효성 + 이름/소스 경로 ────────────────────────────────────
try {
  const plugin = JSON.parse(read('sodam-persona/.claude-plugin/plugin.json'));
  if (plugin.name !== 'sodam-persona') err(`plugin.json name(${plugin.name}) ≠ sodam-persona`);
} catch (e) { err(`plugin.json 파싱 실패: ${e.message}`); }
try {
  const mkt = JSON.parse(read('.claude-plugin/marketplace.json'));
  const p0 = mkt.plugins?.[0];
  if (p0?.name !== 'sodam-persona') err(`marketplace plugins[0].name(${p0?.name}) ≠ sodam-persona`);
  if (p0?.source && !existsSync(P(p0.source)))
    err(`marketplace source 경로 없음: ${p0.source}`);
} catch (e) { err(`marketplace.json 파싱 실패: ${e.message}`); }

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
