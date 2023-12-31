import path from 'path'
import fs from 'fs-extra'
import { execSync } from 'child_process'

const PATH = '../../../../init'
const INSTALL_COMMAND = 'yarn install'
const ENV_COMMAND = 'yarn env'
const COPY_COMMAND = 'yarn copy'

export function init (target: string = process.cwd()): void {
  copyInitFiles(target)
  installPackages()
}

function copyInitFiles (target: string): void {
  const source = path.resolve(__dirname, PATH)
  fs.readdirSync(source).forEach((value: string): void => {
    fs.copySync(path.resolve(source, value), path.resolve(target, value), { overwrite: true })
  })
}

function installPackages (): void {
  try {
    execSync(INSTALL_COMMAND, { stdio: 'inherit' })
    execSync(ENV_COMMAND, { stdio: 'inherit' })
    execSync(COPY_COMMAND, { stdio: 'inherit' })
    execSync(INSTALL_COMMAND, { stdio: 'inherit' }) // Reinstall with node_modules
  } catch (error: any) {
    console.error(error)
  }
}
