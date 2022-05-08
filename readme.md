<div align=center>

# `@brlt/n`

##### An extended fork of **`@antfu/ni`** - _"use the right package manager"_

<br>
  
[![Open in Gitpod](https://cdn.jsdelivr.net/gh/nberlette/static/svg/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/nberlette/n) [![Open in Stackblitz](https://cdn.jsdelivr.net/gh/nberlette/static/svg/open-in-stackblitz.svg)](https://stackblitz.com/github/nberlette/n) [![Open in CodeSandbox](https://cdn.jsdelivr.net/gh/nberlette/static/svg/open-in-codesandbox.svg)](https://codesandbox.io/s/github/nberlette/n)

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
  
<br>
 
**Bin Links**: `na`, `nb`, `nci`, `nd`, `ne`, `nh`, `ni`, `nl`, `no`, `np`, `nr`, `nt`, `nu`, `nun`, `nv`

</div><br>

This package expands upon the original `ni` package created by Anthony Fu, adding several new commands. 

My primary motivation has been laziness, leading to more shorthand aliases to functions often used in my workflows. There are also **commands that have been renamed** to resolve binary naming conflicts. For example, I had some trouble with [Nx workspaces](https://nx.dev) for monorepo projects, since `nx` was occupied. So `nx` was renamed to `ne`.

You may or may not find these useful. 

> **Disclaimer**: This is very much a work in progress. I haven't had time to add any tests for the updated commands yet, and I'm sure some of them are partially (maybe even completely) broken. Please create an Issue (or multiple issues) or a Discussion, with any kind of criticism or comments you have. I could really use your help!

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

<br><hr><br>

## New Commands (unique to this fork)

As the description states, this is an _extended fork_ of the parent project, @antfu/ni, which means it comes with several new additions to it's list of features.

> ***Note***: in the examples below, `{npm,yarn,pnpm}` indicates "either pnpm, yarn, or npm". `{npm,pnpm}` means "npm and pnpm", and so on.

### `nb` - bin

```bash
nb
# {npm,yarn,pnpm} bin
```

```bash
nb -g

# npm bin --global
# yarn global bin
# pnpm -g bin
```

<br>


### `nd` - diff

```bash
nd 
# {npm,yarn,pnpm} diff
```

<br>

### `nh` - help

```bash
nh
# {npm,yarn,pnpm} help 

nh [topic]
# {npm,yarn,pnpm} help [topic]
```

#### Example

```bash
nh version

# {npm,yarn,pnpm} help version
```

<br>


### `nl` - link

```bash
nl next

# {npm,yarn,pnpm} link next
```

<br>

### `no` - outdated

```bash
no
# {npm,yarn,pnpm} outdated
```

```bash
no [...options]
# {npm,yarn,pnpm} outdated [...options]
```

#### Examples

```bash
no --long
# {npm,yarn,pnpm} outdated --long
```

```bash
no --global
# {npm,pnpm} outdated --global
# yarn global outdated
```

<br>

### `np` - publish

```bash
np
# {npm,yarn,pnpm} publish
```

```bash
np [<tarball>|<dir>] [--tag <tag>] [--access <public|restricted>] [options]

# {npm,yarn,pnpm} publish [...arguments]
```

#### Example

```bash
np --registry=https://npm.pkg.github.com

# {npm,yarn,pnpm} publish --registry=https://npm.pkg.github.com
```

<br>

### `nt` - test

Execute a package's `test` script, if it exists.

```bash
nt
# {npm,yarn,pnpm} test
```

<br>

### `nv` - version

Without any arguments, returns a list of versions for all local dependencies.  
Provided arguments, modifies (or "bumps") a package's version number according to [semver](https://semver.org) guidelines.

```bash
nv
# {npm,yarn,pnpm} version
```

```bash
nv [arguments]
# {npm,yarn,pnpm}
```

#### Example

```bash
nv patch
# {npm,yarn,pnpm} version patch
```

<br><hr><br>


## Renamed Commands

I've made the decision to change a couple of names of existing commands, to help resolve naming conflicts I've encountered with other projects (like [Nx](https://nx.dev) by @nrwl).

<br>

### ~~`nx`~~ `ne` - execute

> Renamed to `ne` to eliminate conflict with [Nx monorepo tool](https://nx.dev)

```bash
ne jest

# npx jest
# {pnpm,yarn} dlx jest
```

<br><hr><br>


## Existing Commands - inherited from [`@antfu/ni`](https://github.com/antfu/ni)

<br>

### `ni` - install


#### Usage

```bash
ni [package] [options]
# {npm,yarn,pnpm} install [package] [options]
```

#### Examples

```bash
ni axios
```

```bash
ni @types/node -D

# npm i @types/node -D
# yarn add @types/node -D
# pnpm add -D @types/node
```

#### Options

##### `--frozen`

```bash
ni --frozen # or nci

# npm ci
# {pnpm,yarn} install --frozen-lockfile
```

##### `-g, --global`

```bash
ni -g iroiro

# npm i -g iroiro
# yarn global add iroiro
# pnpm add -g iroiro

# this uses default agent, regardless your current working directory
```

##### `-C`: run command in a different directory

```bash
ni -C packages/foo vite
nr -C playground dev
```

<br>

### `nci` - clean install

```bash
nci

# npm ci
# {pnpm,yarn} install --frozen-lockfile
```

> If the corresponding node manager is not present, this command will install it globally.

<br>

### `nr` - run

#### Usage

```bash
nr [script] [options]

# {pnpm,yarn} <script> [options]
# npm run <script> [options
```

##### Interactively select a script to run

```bash
nr
```

> Supports https://www.npmjs.com/package/npm-scripts-info convention


##### Re-run the last command

```bash
nr -
```

```bash
nr dev --port=3000

# npm run dev -- --port=3000
# yarn run dev --port=3000
# pnpm run dev -- --port=3000
```

<br>


### `na` - agent alias

```bash
na
# {npm,yarn,pnpm}
```

<br>

### `nu` - upgrade

```bash
nu

# pnpm update
# <npm|yarn> upgrade
```

#### Examples

```bash
nu -i # interactive update

# (currently not available for npm)
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

<br><hr><br>
<div align=center>

[MIT](https://mit-license.org) © [Nicholas Berlette](https://github.com/nberlette) and [Anthony Fu](https://github.com/antfu)
  
</div>
