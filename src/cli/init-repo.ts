import { confirm, select } from '@inquirer/prompts'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { copyFilesToSDK } from './copy-files'
import { getParserConfig } from './parser-config'

export async function initRepo(domain) {
  const sdkDir = path.join(process.cwd(), domain)
  const originDir = buildOriginDir(process.argv[1])
  const parserConfig = await getParserConfig(domain)
  const templates = fs.readdirSync(path.join(originDir, 'templates'))
  const template =
    templates.length > 1
      ? await select({
          message: 'Generate from template:',
          choices: templates.map((t) => ({ name: t, value: t })),
        })
      : templates[0]

  console.log(`\n🎬 Ready to generate NoteHost worker in: ${sdkDir}`)
  await confirm({ message: 'Continue?', default: true })

  console.log('Generating...')

  copyFilesToSDK({
    parserConfig,
    originDir: path.join(originDir, 'templates', template),
    sdkDir,
  })

  console.log(`\n🎉 Done! Your worker is in`, sdkDir)
  console.log(`\nGo into this directory and run ${chalk.bold('npm install')}`)
  console.log(`Edit ${chalk.bold('src/site-config.ts')} to setup your website.`)
  console.log(`Review ${chalk.bold('wrangler.toml')} and make sure your worker name is correct.`)
  console.log(`And finally run ${chalk.bold('npm run deploy')} to publish your website.`)

  process.exit(0)
}

function buildOriginDir(appPath: string) {
  const runDir = path.parse(appPath).dir
  const parts = runDir.split(path.sep)
  const last = parts[parts.length - 1]
  const beforeLast = parts[parts.length - 2]

  // console.error('appPath', appPath)
  // console.error('runDir', runDir)
  // console.error('parts', parts)

  // running locally
  if (process.env.NOTEHOST_CLI_DEBUG) {
    return path.join(runDir, '..', '..')
  }

  if (last === '.bin' && beforeLast === 'node_modules') {
    // npx (installed)
    return path.join(runDir, '..', 'notehost')
  }

  if (last === 'cli' && beforeLast === 'dist') {
    // npx (tmp)
    return path.join(runDir, '..', '..')
  }

  if (beforeLast === 'notehost') {
    // pnpx
    return path.join(runDir, '..')
  }

  // npx
  return path.join(runDir, '..', 'notehost')
}
