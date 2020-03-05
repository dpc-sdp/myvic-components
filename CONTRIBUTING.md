# Contributing

## Requirements

- Install [nodejs](https://nodejs.org/en/) (^v10.0.0)
- Install [yarn](https://yarnpkg.com/en/docs/install) (currently npm is unsupported)

## Setup

Run `yarn install`

### Running Storybook

Run `yarn run start:storybook`

## Release

Create release branch e.g `release/v1.0.0`, and push to remote.

Run `yarn lerna:publish`.
It will guide you through publishing npm packages.

Then merge release branches to develop.

## Test

Add all components into storybook.

Run `yarn test:unit` to test [Storyshots](https://www.npmjs.com/package/@storybook/addon-storyshots).

New storytest will be added automatically at first time.
Update storyshots tests if you need by `yarn test:unit -u`.
