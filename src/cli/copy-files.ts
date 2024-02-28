import * as ejs from 'ejs'
import fs from 'fs'
import path from 'path'
import { ParserConfig } from './parser-config'

interface CopyFilesToSDKParams {
  parserConfig: ParserConfig
  originDir: string
  sdkDir: string
}

export async function copyFilesToSDK({ parserConfig, originDir, sdkDir }: CopyFilesToSDKParams) {
  const files = fs.readdirSync(originDir)

  fs.mkdirSync(sdkDir, { recursive: true })

  files.forEach((file) => {
    const destFile = file === '_gitignore' ? '.gitignore' : file
    const filePath = path.join(originDir, file)

    if (isDirectory(filePath)) {
      copyFilesToSDK({
        parserConfig,
        originDir: path.join(originDir, file),
        sdkDir: path.join(sdkDir, file),
      })
    } else {
      try {
        const templateFile = fs.readFileSync(filePath, 'utf8')
        const renderedFile = ejs.render(templateFile, parserConfig)
        const sdkFilePath = path.join(sdkDir, destFile)
        const fileExt = path.extname(sdkFilePath)

        fs.writeFileSync(sdkFilePath, renderedFile, {
          mode: fileExt === '.sh' ? 0o755 : 0o644,
        })
      } catch (e) {
        console.error('Error generating SDK file: ', filePath)
        console.error(e)
        process.exit(1)
      }
    }
  })
}

function isDirectory(path: string) {
  try {
    return fs.lstatSync(path).isDirectory()
  } catch (e) {
    return false
  }
}
