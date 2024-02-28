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

  console.log('Copying files to SDK: ', originDir, '->', sdkDir)
  console.log('Files: ', files)

  fs.mkdirSync(sdkDir, { recursive: true })

  files.forEach((file) => {
    const fileName = file === '_gitignore' ? '.gitignore' : file
    const filePath = path.join(originDir, fileName)

    console.log('copying: ', fileName)

    if (fs.lstatSync(filePath).isDirectory()) {
      copyFilesToSDK({
        parserConfig,
        originDir: path.join(originDir, file),
        sdkDir: path.join(sdkDir, file),
      })
    } else {
      try {
        const templateFile = fs.readFileSync(filePath, 'utf8')
        const renderedFile = ejs.render(templateFile, parserConfig)
        const sdkFilePath = path.join(sdkDir, fileName)
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
