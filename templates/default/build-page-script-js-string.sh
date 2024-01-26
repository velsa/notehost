#!/bin/bash
OUT_FILE=./src/_page-script-js-string.ts
echo 'export const PAGE_SCRIPT_JS_STRING = `<script>' >$OUT_FILE
cat ./src/page-script.js | sed 's/\\/\\\\/g' >>$OUT_FILE
echo '</script>`' >>$OUT_FILE
