// SessionStart hook: 페르소나 항상켜짐 코어를 매 세션 컨텍스트에 주입.
// __dirname 자기참조 → ${CLAUDE_PLUGIN_ROOT} 치환 실패에도 내성(자기 폴더 기준).
const fs = require('fs');
const path = require('path');
const c = fs.readFileSync(path.join(__dirname, 'persona_core.md'), 'utf8');
process.stdout.write(JSON.stringify({
  continue: true,
  hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: c }
}));
