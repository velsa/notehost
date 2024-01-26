#!/usr/bin/env node
import path from "path";

const cmd = process.argv[2];
const domain = process.argv[3];

const usage = () => {
  console.log("Usage: cli <command>");
  console.log("Commands:");
  console.log("init domain_name - Initialize a new NoteHost worker repo");
};

if (process.argv.length < 3) {
  usage();
  process.exit(1);
}

if (cmd === "init" && domain) {
  const myDir = path.join(process.argv[1], "..");
  const localDir = process.cwd();
  console.log(`Initializing NoteHost worker repo in: ${localDir}/${domain}`);
  console.log(`myDir: ${myDir}`);
  process.exit(0);
}

usage();
console.error("Invalid command: " + cmd);
