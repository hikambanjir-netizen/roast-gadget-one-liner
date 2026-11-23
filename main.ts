// One-Line Roast: The Gadget You Use Every Day.
//
// The one job: write a single original line, at most 200 characters,
// roasting a gadget used every day. Node 22, standard library only,
// deterministic, no network, no model calls. Writes exactly one line
// (no trailing newline) to /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ROAST =
  "My printer is the only gadget that asks for a subscription to print the email telling me my subscription expired.";

function main(): void {
  const line = ROAST.trim();
  // Gate: the sealed scorer needs UTF-8 text of 1-200 chars, not only
  // whitespace, on a single line. Enforce it here before writing.
  if (line.length === 0) {
    throw new Error("entry is blank");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line.length > 200) {
    throw new Error(`entry is ${line.length} chars, over the 200-char limit`);
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf-8");
  // Read it back: the file on disk must be byte-identical to the line,
  // so a partial write or encoding slip fails loudly instead of
  // shipping a broken entry.
  const written = readFileSync("/output/entry.txt", "utf-8");
  if (written !== line) {
    throw new Error("round-trip check failed: entry.txt differs from the line");
  }
  console.log(line);
}

main();
