#!/usr/bin/env node

import stringify from 'csv-stringify'
import readline from 'readline'

import { card, ITEM_ID, login, secureNote } from './convert'
import Bitwarden from './bitwarden'

const csvStringify = (
  items: Array<any>,
  options?: stringify.Options
): Promise<string> =>
  new Promise((resolve, reject) => {
    stringify(items, options ?? {}, (err, output) =>
      err ? reject(err) : resolve(output)
    )
  })

const readStdin = (): Promise<string> =>
  new Promise((resolve) => {
    let lines: string[] = []

    const reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    })

    reader.on('line', (line) => lines.push(line))

    reader.on('close', () => resolve(lines.join('\n')))
  })

async function main() {
  const json = await readStdin()

  const parsed: Bitwarden = JSON.parse(json)

  const l = login(parsed.items.filter((item) => item.type === ITEM_ID.login))
  process.stdout.write(
    await csvStringify(l.lines, { header: true, columns: l.columns })
  )

  const i = secureNote(
    parsed.items.filter((item) => item.type === ITEM_ID.secureNote)
  )
  process.stdout.write(
    await csvStringify(i.lines, { header: true, columns: i.columns })
  )

  const c = card(parsed.items.filter((item) => item.type === ITEM_ID.card))
  process.stdout.write(
    await csvStringify(c.lines, { header: true, columns: c.columns })
  )
}
main().catch((e) => console.error(e))
