# bottom-line

A tiny and fast lodash-inspired utils library.

## Documentation

Documentation can be found here: [bottom-line documentation](https://dzek69.github.io/bottom-line).

## Motivation

Lodash complexity that causes big bundle sizes just for using single function. Lodash is trying to cover each possible
use case, even very rare while typical observed use case of lodash is basic methods used on basic data. As an example,
let's take a `_.pick` method that simply returns an object, based on source object, with just some properties copied.
Easy, right? Few lines of code? Lodash makes that 114 imports.

`bottom-line` aims to:
- cover only most typical use cases,
- add useful methods that are missing in lodash,
- not include non-useful/rare methods that are present in lodash,
- not being 100% compatible replacement for lodash/underscore, but keeping most of behavior identical,
- not being a "polyfill" (no `map`/`forEach` etc.),
- not being inconsistent or trying to guess user intentions (lodash does that, see tests for `get`),
- perform fast and have code size small.

## Name

Underscore was taken. Low-dash (lodash) was taken. How else could I name a line on the bottom?

PS. Underscore character is often used for utils JS libraries. Dollar is taken by jQuery and other DOM related
libraries. Others easy to type on standard layout keyboard, non a-z characters aren't valid JS variable name starters.
So I followed the rest and personally I am going to use my library as `_`.

## Supported methods

- get
- getMultiple (exclusive)
- isEmpty
- last
- mapValues

Methods will be added as I need them. I am open for suggestions and PRs. See next heading for list of methods that I
want to add. 

## Methods to be supported

- pick
- omit
(TODO)

## Features

- unit tests with `mocha` & `must.js`
- es6+ first approach, with es5 transpiled version to be found inside `dist` folder *

\* - transpiling kills JS engines optimizations, makes codes longer and tree shaking harder to do and/or slower

## To do for 1.0.0

- make a list of important methods to include in this library
- prepare a build script to mess-free development and easy importing like `import _get from "bottom-line/get"`
- consider making all methods non-crashy, as some already are

## License

MIT
