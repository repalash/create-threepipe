# create-threepipe <a href="https://npmjs.com/package/create-threepipe"><img src="https://img.shields.io/npm/v/create-threepipe" alt="npm package"></a>

## Scaffolding Your First Threepipe Project

> **Compatibility Note:**
> Projects requires [Node.js](https://nodejs.org/en/) version 18+, 20+. However, some templates require a higher Node.js version to work, please upgrade if your package manager warns about it.

With NPM:

```bash
$ npm create threepipe@latest
```

[//]: # (With Yarn:)

[//]: # ()
[//]: # (```bash)

[//]: # ($ yarn create threepipe)

[//]: # (```)

[//]: # ()
[//]: # (With PNPM:)

[//]: # ()
[//]: # (```bash)

[//]: # ($ pnpm create threepipe)

[//]: # (```)

[//]: # (With Bun:)

[//]: # ()
[//]: # (```bash)

[//]: # ($ bun create threepipe)

[//]: # (```)

Then follow the prompts!

You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold a Threepipe + Vite + Typescript project, run:

```bash
# npm 7+, extra double-dash is needed:
npm create threepipe@latest my-three-app -- --template vanilla-ts
```

[//]: # (```)

[//]: # (# yarn)

[//]: # (yarn create threepipe my-three-app --template vanilla-ts)

[//]: # ()
[//]: # (# pnpm)

[//]: # (pnpm create threepipe my-three-app --template vanilla-ts)

[//]: # ()
[//]: # (# Bun)

[//]: # (bun create threepipe my-three-app --template vanilla-ts)

[//]: # (```)

Currently supported template presets include:

- `vanilla`
- `vanilla-ts`

You can use `.` for the project name to scaffold in the current directory.

## Notes

This `create-threepipe` project is a fork of [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite), just changed the `vite` to `threepipe` and the templates.
