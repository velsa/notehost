#!/usr/bin/env node
import { program } from 'commander'
import { version } from '../../package.json'
import { initRepo } from './init-repo'

program
  .name('notehost')
  .description('NoteHost CLI: Deploy and manage Notion websites via Cloudflare workers.')
  .version(version)

program
  .command('init')
  .description('Initialize a new NoteHost worker repo')
  .argument('<domain>', 'domain name')
  .action(initRepo)

program.parse()
