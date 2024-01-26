#!/bin/bash
OUT_FILE=./src/rewriters/_body-js-string.ts
echo 'export const BODY_JS_STRING = `' >$OUT_FILE
cat ./src/rewriters/body.js >>$OUT_FILE
echo '`' >>$OUT_FILE
