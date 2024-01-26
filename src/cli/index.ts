#!/usr/bin/env node

const cmd = process.argv[2];
const domain = process.argv[3];

const usage = () => {
  console.log("Usage: cli <command>");
  console.log("Commands:");
  console.log(
    "init domain_name - Initialize a new project for hosting on domain_name"
  );
};

if (process.argv.length < 3) {
  usage();
  process.exit(1);
}

if (cmd === "init" && domain) {
  console.log("Initializing project for hosting on " + domain);
  process.exit(0);
}

usage();
console.error("Invalid command: " + cmd);
