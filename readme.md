<div align=center>

# `@brlt/n`

##### An extended fork of **`@antfu/ni`** - _"use the right package manager"_

<br>

### [**`pnpm`**](https://pnpm.io)  ·  [**`yarn`**](https://yarnpkg.com)  ·  [**`npm`**](https://docs.npmjs.com/cli/v6/commands/npm)

<br>

```bash
pnpm add -g @brlt/n
```

```bash
yarn global add @brlt/n
```

```bash
npm i -g @brlt/n
```

</div><br>

This package expands upon the original `@antfu/ni` by Anthony Fu by adding several new commands, but also renaming a couple to eliminate some conflicts I encountered.

For example, I had some trouble with [Nx workspaces](https://nx.dev) for monorepo projects, since `nx` was occupied. So `nx` was renamed to `nex`.

This is very much a work in progress. I haven't had time to add any tests for the updated commands yet, and I'm sure some of them are partially (maybe even completely) broken. Please contribute! PRs welcome!

<br>

## How does it work?

**ni** assumes that you work with lockfiles (and you should). See the list of commands.

Before it runs, it will detect your `yarn.lock` / `pnpm-lock.yaml` / `package-lock.json` to know current package manager (or `packageManager` field in your packages.json), and runs the corresponding commands.

<br>

## Config

```ini
; ~/.nirc

; fallback when no lock found
defaultAgent=npm # default "prompt"

; for global installs
globalAgent=npm
```

```bash
# ~/.bashrc

# custom configuration file path
export NI_CONFIG_FILE="$HOME/.config/ni/nirc"
```

<br>

## Commands

<br>

### `ni` - install

```bash
ni
# npm install
# yarn install
# pnpm install
```

```bash
ni axios
```

```bash
ni @types/node -D

# npm i @types/node -D
# yarn add @types/node -D
# pnpm add -D @types/node
```

```bash
ni --frozen # or nci

# npm ci
# yarn install --frozen-lockfile
# pnpm install --frozen-lockfile
```

```bash
ni -g iroiro

# npm i -g iroiro
# yarn global add iroiro
# pnpm add -g iroiro

# this uses default agent, regardless your current working directory
```

#### Change Directory

```bash
ni -C packages/foo vite
nr -C playground dev
```

<br>

### `nci` - clean install

```bash
nci

# npm ci
# yarn install --frozen-lockfile
# pnpm install --frozen-lockfile
```

> If the corresponding node manager is not present, this command will install it globally.

<br>

### `nr` - run

```bash
nr

# interactively select the script to run
# supports https://www.npmjs.com/package/npm-scripts-info convention
```

```bash
nr -

# rerun the last command
```

```bash
nr dev --port=3000

# npm run dev -- --port=3000
# yarn run dev --port=3000
# pnpm run dev -- --port=3000
```
<br>

### ~~`nx`~~ `nex` - execute

> Renamed to `nex` to eliminate conflict with [Nx monorepos](https://nx.dev)

```bash
nex jest

# npx jest
# yarn dlx jest
# pnpm dlx jest
```

<br>

### `nu` - upgrade

```bash
nu

# npm upgrade
# yarn upgrade
# pnpm update
```

```bash
nu -i

# (not available for npm)
# yarn upgrade-interactive
# pnpm update -i
```

<br>

### `nun` - uninstall

```bash
nun axios

# npm uninstall axios
# yarn remove axios
# pnpm remove axios
```

```bash
nun @types/node -D

# npm uninstall @types/node -D
# yarn remove @types/node -D
# pnpm remove -D @types/node
```

```bash
nun -g eslint

# npm uninstall -g eslint
# yarn global remove eslint
# pnpm remove -g eslint
```

<br>

### `nl` - link

```bash
nl next

# npm link next
# yarn link next
# pnpm link next
```

<br>

### `nb` - bin

```bash
nb

# npm bin
# yarn bin
# pnpm bin
```

```bash
nb -g

# npm bin --global
# yarn global bin
# pnpm -g bin
```

<br>

### `nh` - help

```bash
nh

# npm help # yarn help # pnpm help
```

```bash
nh version

# npm help version
# yarn help version
# pnpm help version
```

<br>

### `nv` - version

```bash
nv

# npm version
# yarn version
# pnpm version
```

<br>

### `np` - publish

```bash
np

# npm publish
# yarn publish 
# pnpm publish
```

```bash
np --registry=https://npm.pkg.github.com
```

<br>

### `na` - agent alias

```bash
na

# npm
# pnpm
# yarn
```

<br>

### `no` - outdated

```bash
no

# npm outdated
# yarn outdated
# pnpm outdated
```

```bash
no --long

# npm outdated --long
# yarn outdated --long
# pnpm outdated --long
```

<br>

### `nt` - test

```bash
nt

# npm test
# yarn test
# pnpm test
```

---

[MIT](https://mit-license.org)
