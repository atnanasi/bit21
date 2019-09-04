#!/usr/bin/env node

import stringify from "csv-stringify"
import readline from "readline"

import { Login } from "./convert"
import Bitwarden, { Item } from "./bitwarden"

const csvStringify = (items: Array<any>, options?: stringify.Options): Promise<string> => {
  return new Promise((resolve, reject) => {
    stringify(items, options || {}, (err, output) => {
      if (err) reject(err)
      resolve(output)
    });
  })
}

const readStdin = (): Promise<string> => {
  return new Promise(resolve => {
    let lines: string[] = [];

    const reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    })

    reader.on('line', function (line) {
      lines.push(line);
    })

    reader.on('close', function () {
      resolve(lines.join("\n"))
    })
  })
}

(async () => {
  const json = await readStdin()

  const parsed: Bitwarden = JSON.parse(json)

  const converted = parsed.items.map((item: Item) => {return Login(item)})

  process.stdout.write(await csvStringify(converted))
})().catch(err => {console.error(err)})
