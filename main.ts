// The Meeting That Should Have Been One Line — make.fun bounty
// Writes one joke, a single line of at most 200 characters: the single
// sentence that could have replaced an entire pointless meeting. The
// joke is meta — the line itself IS the one line the meeting should
// have been — and the punch lands on the waste: an hour, twelve people,
// and a follow-up meeting, all to say two words.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The line is the replacement: two words would have done it.
const MESSAGE =
  "This meeting could have been one line — just do it — but instead it took an hour, twelve people, and a follow-up meeting to say so";

if (MESSAGE.includes('\n') || MESSAGE.includes('\r')) {
  console.error('entry must be a single line');
  process.exit(1);
}
if (MESSAGE !== MESSAGE.trim()) {
  console.error('entry must not start or end with whitespace');
  process.exit(1);
}
if (MESSAGE.length < 1 || MESSAGE.length > 200) {
  console.error(`entry must be 1-200 characters, got ${MESSAGE.length}`);
  process.exit(1);
}
if (MESSAGE.trim().length === 0) {
  console.error('entry must not be only whitespace');
  process.exit(1);
}
// One joke, one sentence: no second sentence hiding after a period.
if (MESSAGE.slice(0, -1).includes('.')) {
  console.error('entry must be a single sentence');
  process.exit(1);
}

// No trailing newline: the file is exactly the one line.
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), MESSAGE);
console.log(`wrote ${MESSAGE.length} chars to ${join(OUTPUT_DIR, 'entry.txt')}`);
console.log(MESSAGE);
