# Contributing

## Requirements

- Install [nodejs](https://nodejs.org/en/) (^v12.0.0)
- Install [yarn](https://yarnpkg.com/en/docs/install) (currently npm is unsupported)

## Setup

Run `yarn install`

### Running Storybook

Run `yarn run start:storybook`

## Commit Guidelines

[Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) provides an easy set of rules for creating an explicit commit history; which makes it easier to write automated tools on top of.

Commits should follow the format <type>: <subject> or <type>(scope): <subject>

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit types

- **feat:** Commits that result in a new features or functionalities. Backwards compatible features will release with the next **MINOR** whereas breaking changes will be in the next **MAJOR**. The body of a commit with breaking changes must begin with `BREAKING CHANGE`, followed by a description of how the API has changed.
- **fix:** Commits that provide fixes for bugs within vuetify's codebase.
- **docs:** Commits that provide updates to the docs.
- **style:** Commits that do not affect how the code runs, these are simply changes to formatting.
- **refactor:** Commits that neither fixes a bug nor adds a feature.
- **perf:** Commits that improve performance.
- **test:** Commits that add missing or correct existing tests.
- **chore:** Other commits that don't modify src or test files.
- **revert:** Commits that revert previous commits.

## Release

Create release branch e.g `release/v1.0.0`, and push to remote.

Run `yarn lerna:publish`.
It will guide you through publishing npm packages.

Then merge release branches to develop.

## Test

### Storybook testing

Add all components into storybook.

Run `yarn test:unit` to test [Storyshots](https://www.npmjs.com/package/@storybook/addon-storyshots).

New storytest will be added automatically at first time.
Update storyshots tests if you need by `yarn test:unit -u`.

### Unit testing

Unit tests are important. They help us secure our processes and work flows, ensuring that the most critical parts of our projects are protected from accidental mistakes or oversights in our development. We use Vue testing utility called [vue-test-utils](https://vue-test-utils.vuejs.org/).

### Server side rendering testing

Users may will use components in server side rendering application(e.g [nuxt.js](https://nuxtjs.org/)).

It will be good to do a smoke test in nuxt.js so we can make sure our components working in server side as well.

The end to end tests are written by [cypress](https://www.cypress.io/).

Run `yarn nuxt:dev` to start a nuxt app instance from location `test/nuxt`.

Run `yarn test:nuxt` to run nuxt tests.

For adding new tests, add a page in `test/nuxt/fixture/pages`. Then add a new end to end test in `test/nuxt/integration`.

## Coding standards

### CSS

A `yourvic` prefix is needed.  
Use [BEM](http://getbem.com/introduction/) methodology to name css class.

**Component class name:**  .yourvic-[component-name]  
**Element class name:**  .yourvic-[component-name]__[element-name]  
**Modifier class name:**  .yourvic-[component-name]--[modifier-name]
