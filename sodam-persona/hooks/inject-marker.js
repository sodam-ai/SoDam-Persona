// UserPromptSubmit hook: 페르소나 마커(트리거 요약·자가점검·컴팩션 복구)를 매 프롬프트 주입.
// __dirname 자기참조 → ${CLAUDE_PLUGIN_ROOT} 치환 실패에도 내성(자기 폴더 기준).
const fs = require('fs');
const path = require('path');
const c = fs.readFileSync(path.join(__dirname, 'persona_marker.txt'), 'utf8');
process.stdout.write(JSON.stringify({
  continue: true,
  hookSpecificOutput: { hookEventName: 'UserPromptSubmit', additionalContext: c }
}));
