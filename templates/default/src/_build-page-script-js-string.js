const fs = require('fs')
const path = require('path')

const outFilePath = path.join(__dirname, '_page-script-js-string.ts')
const pageScriptPath = path.join(__dirname, 'page-script.js')

try {
  const pageScriptContent = fs.readFileSync(pageScriptPath, 'utf8')
  const escapedContent = pageScriptContent.replace(/\\/g, '\\')
  const finalContent = `export const PAGE_SCRIPT_JS_STRING = \`<script>\n${escapedContent}</script>\``

  fs.writeFileSync(outFilePath, finalContent)
  console.log('Page script was built successfully!')
} catch (error) {
  console.error('Failed to build page script:', error)
}
