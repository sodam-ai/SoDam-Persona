// SessionStart hook: 페르소나 항상켜짐 코어를 매 세션 컨텍스트에 주입.
// __dirname 자기참조 → ${CLAUDE_PLUGIN_ROOT} 치환 실패에도 내성(자기 폴더 기준).
const fs = require('fs');
const path = require('path');
let c = '';
try {
  c = fs.readFileSync(path.join(__dirname, 'persona_core.md'), 'utf8');
} catch (e) {
  process.stderr.write('[sodam-persona] persona_core.md could not be loaded.\n');
}
const output = JSON.stringify({
  continue: true,
  hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: c }
});

// The host sends hook metadata through stdin. Drain it before exiting so very large
// prompts cannot surface an EPIPE/EOF in the caller even though this hook does
// not need to inspect the payload.
if (process.stdin.isTTY) {
  process.stdout.write(output);
} else {
  process.stdin.resume();
  process.stdin.on('end', () => process.stdout.write(output));
}
