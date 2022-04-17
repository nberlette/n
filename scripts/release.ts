// TODO: scripts/release.ts - workflow for publishing to NPM+GPR
// 1. [ ] test, lint, format, repeat...
// 2. [x] map command files to all of their various paths (src, dist, .d.ts, bin)
// 3. [x] pnpm run build -- build all commands and types with tsup
// 4. [x] esno scripts/postbuild.ts -- create the appropriate bin links
// 5. [x] update exports, bin, files, etc. in package.json
// 6. [ ] bump version, commit and clean files, publish to NPM
// 7. [ ] change pkg.name = @nberlette/n, publish to GPR (--no-git-tag)
// 8. [ ] change pkg.name = @brlt/n, pnpm run clean
