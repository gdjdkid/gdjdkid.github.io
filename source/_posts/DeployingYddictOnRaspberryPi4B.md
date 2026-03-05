---
title: Deploying Yddict On Raspberry Pi 4B
date: 2026-03-05 10:58:26
author: Roy Li
tags: [RPI]
categories: [RPI]
index_img:
sticky:
---

### Overview 
yddict is a lightweight CLI dictionary tool that queries Youdao Dictionary (有道词典) directly from the terminal. It's perfect for developers who want quick English ↔ Chinese lookups without opening a browser or dealing with heavy GUI apps full of ads.

### Features
- English → Chinese translation
- Chinese → English translation
- Phonetic symbols / pronunciation hints
- Web-sourced definitions and examples
- Custom proxy support
- Custom output color
- Completely ad-free

### Requirements
- Node.js ≥ 12.0.0
- npm ≥ 6.0.0

> yddict is pure JavaScript, so it runs fine on ARM64 like Raspberry Pi 4B — no compilation needed.

### Demo
![yddict demo](https://raw.githubusercontent.com/kenshinji/yddict/master/example.gif "Animated demo of yddict in action")  

### Installation Steps
#### Update your system
Always a good first step on fresh Raspberry Pi OS installs.
```shell
sudo apt update && sudo apt upgrade -y
```

#### Install Node.js (LTS recommended)
The Node source repo gives you a clean, up-to-date version. Here we're using v20.x (stable as of 2025–2026).
```shell
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/DeployingYddictOnRaspberryPi4B/Yddict_0.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/DeployingYddictOnRaspberryPi4B/Yddict_1.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/DeployingYddictOnRaspberryPi4B/Yddict_2.png)  

#### Verify versions
```shell
node -v    # should show v20.x.x
npm -v     # should show 10.x.x or similar
```
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/DeployingYddictOnRaspberryPi4B/Yddict_3.png)  

#### Install yddict globally
```shell
sudo npm install -g yddict
```
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/DeployingYddictOnRaspberryPi4B/Yddict_4.png)  

#### Quick check that it's installed
```shell
npm list -g --depth=0
```
You should see yddict listed under global packages.  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/DeployingYddictOnRaspberryPi4B/Yddict_5.png)  

### Optional: Verify Installation Paths
- Check the package metadata
  ```shell
  cat /usr/lib/node_modules/yddict/package.json
  ```
> Look for the `bin` field — it maps the `yd` command to `index.js`.

![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/DeployingYddictOnRaspberryPi4B/Yddict_6.png)  

- Peek at the main script (just for curiosity)
  ```shell
  cat /usr/lib/node_modules/yddict/index.js
  ```
> You'll see it uses `request`, `chalk`, `cli-spinner`, etc., to fetch and pretty-print results from Youdao.

```javascript
#!/usr/bin/env node

const request = require('request')
const chalk = require('chalk')
const Spinner = require('cli-spinner').Spinner
const isChinese = require('is-chinese')
const urlencode = require('urlencode')
const noCase = require('no-case')
const config = require('./lib/config')
const Parser = require('./lib/parser')

let word = process.argv.slice(2).join(' ')
if (!word) {
console.log('Usage: yd <WORD_TO_QUERY>')
process.exit()
}

const spinner = new Spinner('努力查询中... %s')

if (config.spinner) {
spinner.setSpinnerString('|/-\\')
spinner.start()
}

const isCN = isChinese(word)

word = isCN ? word : noCase(word)

const options = {
'url': config.getURL(word) + urlencode(word),
'proxy': config.proxy || null
}

const ColorOutput = chalk.keyword(config.color)
request(options, (error, response, body) => {
if (error) {
console.error(error)
}

        if (config.spinner) {
                spinner.stop(true)
        }
        console.log(ColorOutput(Parser.parse(isCN, body)))
})
```

### Basic Usage
Run lookups directly in the terminal
```shell
yd hello
yd 世界
```
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/DeployingYddictOnRaspberryPi4B/Yddict_7.png)  

> It handles both directions automatically (detects Chinese characters).

### Convenience Tip: Shell Alias
If you prefer a shorter command:
```shell
nano ~/.bashrc
```
Add this line at the end:
```shell
alias y='yd'
```
Save, then reload:
```shell
source ~/.bashrc
```
Now you can just type:
```shell
y hello
```
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/DeployingYddictOnRaspberryPi4B/Yddict_8.png)  

### Uninstall (if needed)
```shell
sudo npm uninstall -g yddict
```

### Notes & Gotchas
- Proxy setup: If you're behind a corporate/VPN/proxy, edit `~/.config/configstore/yddict.json` after first run
  ```json
  {
    "proxy": "https://your-proxy:port",
    "color": "yellow"
  }
  ```
- No releases published on GitHub, but the repo is still active (Hacktoberfest-tagged, ongoing commits). Install via npm is the official way.
- Works great on headless Pi setups — super lightweight for quick lookups while coding or reading docs.

### References
- GitHub repo: [yddict](https://github.com/kenshinji/yddict)
- English README: [yddict English README](https://github.com/kenshinji/yddict/blob/master/README_en.md)

> That's it — you now have a fast, terminal-based dictionary on your Pi. Handy when you're knee-deep in code and need to check a word without breaking flow. Enjoy!