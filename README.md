# bottom-line

A tiny and fast utils library. Bigger changes are coming.

## Documentation

Documentation can be found here: [bottom-line documentation](https://dzek69.github.io/bottom-line).

## Installing

`npm install bottom-line-utils`

## Usage

### TypeScript

Library comes with basic TypeScript support. Some very dynamic methods (like get/set) requires typecasting, and I can't
do much about it. Those shouldn't be often needed with clean code and TypeScript anyway.

### EcmaScript Modules vs CommonJS

Both ESM and CJS code is bundled within library. With recent Node.js and/or bundlers you will get optimized ESM code
automatically and older stuff will fallback to CJS code.

## Motivation

Lodash complexity that causes big bundle sizes just for using single function. Lodash is trying to cover each possible
use case, even very rare while typical observed use case of lodash is basic methods used on basic data. As an example,
let's take a `_.pick` method that simply returns an object, based on source object, with just some properties copied.
Easy, right? Few lines of code? Lodash makes that 114 imports!

`bottom-line` aims to:
- cover only most typical use cases,
- add useful methods that are missing in lodash,
- not include non-useful/rare methods that are present in lodash,
- not being 100% compatible replacement for lodash/underscore, but keeping most behavior identical,
- not being a "polyfill" (no `map`/`forEach` etc.),
- not being inconsistent or trying to guess user intentions (lodash does that, see tests for `get`),
- perform fast and have code size small.

## Name

Underscore character is often used for utils JS libraries. Dollar is taken by jQuery and other DOM related
libraries. Others easy to type on standard layout keyboard, non a-z characters aren't valid JS variable name starters.
"Underscore" is taken. Low-dash ("lodash") is taken. How else could I name a line on the bottom?

Oh, about npm name. `bottom-line` is free. But NPM encourages to use it just until you try to publish the package. Then
it says the name is too similar to another package (not telling which one). It happens to me way too often :( I've run
out of ideas to I just went with `bottom-line-utils`.

## Supported methods

### General use

- coalesce ("better version" of lodash `defaultTo`)
- get
- getMultiple (exclusive)
- insertSeparator (exclusive)
- isEmpty
- last
- makeArray (exclusive)
- mapAsync (exclusive)
- mapValues (exclusive features)
- match (exclusive)
- noop
- omit
- pick
- remove
- rethrow (exclusive)
- seq
- set
- setImmutable (exclusive)
- sortBy (exclusive)
- wait (exclusive)

### Specific use

- pages (exclusive)
- pack (exclusive)

Methods will be added as I need them. I am open for suggestions and PRs. See next heading for list of methods that I
want to add.

## Methods to be supported

(TODO)
- debounce
- throttle

## Tested

This library is fully unit tested and can be used on production.

## To do for 1.0.0

- make a list of important methods to include in this library

## License

MIT
