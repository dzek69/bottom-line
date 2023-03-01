# @ezez/utils

> Formerly: bottom-line-utils, but I never liked the name

A tiny and fast utils library.

## Documentation

Documentation can be found here: [documentation](https://ezez.dev/docs/utils/latest).

## Installing

`npm install @ezez/utils`

## Motivation

Lodash complexity that causes big bundle sizes just for using single function (even with tree shaking!).

Lodash is trying to cover each possible use case, even very rare while typical observed use case of lodash is basic
methods used on basic data. As an example, let's take a `_.pick` method that simply returns an object, based on source
object, with just some properties copied. Easy, right? Few lines of code? Lodash makes that 114 imports!

`@ezez/utils` aims to:
- cover only most typical use cases of given functions,
- add useful methods that are missing in lodash,
- NOT being 100% compatible replacement for lodash/underscore, while keeping MOST behavior identical,
- not being a "polyfill" (no `map`/`forEach` functions etc.),
- perform fast and have code size small.

## Supported methods

### String related
- `addPrefix` - add prefix to a string if not already present
- `addSuffix` - add suffix to a string if not already present
- `capitalize` - capitalize a string, optionally lower casing the rest
- `isNumericString` - check if given value is a numeric string, features configurable
- `occurrences` - count occurrences of a substring in a string, optionally allow overlapping
- `stripPrefix` - strip prefix from a string
- `stripSuffix` - strip suffix from a string

### Number related
- `cap` - cap a value between lower and upper bound
- `scale` - scale given value from old range to new range

### Array related
- `ensureArray` - ensure that given value is an array
- `insertSeparator` - insert a separator between every character in an array
- `last` - get last element of an array
- `match` - split your array into two groups - one that matches given predicate, and one that doesn't
- `mostFrequent` - find most frequent value in an array
- `pull` - remove values from an array (by mutating)
- `remove` - remove values from an array (by mutating) using predicate function and return removed values
- `sortBy` - sort an array by given property (create callback function for `Array.prototype.sort`)

### Object related
- `isPlainObject` - check if given value is a plain object
- `mapValues` - map values of an object
- `merge` - merge two objects shallowly, allowing to remove properties while doing so
- `omit` - omit properties from an object
- `pick` - pick some properties from an object

### Date related
- `ensureDate` - ensure that given value is a Date instance
- `ensureTimestamp` - ensure that given value is a numeric timestamp

### Type safety
- `coalesce` - return first non-nullish value
- `ensureError` - ensure that given value is an error

### Flow related
- `mapAsync` - map an array asynchronously if sync version blocks your event loop for too long
- `noop` - do nothing
- `rethrow` - throw given value
- `seq` - sequentially execute Promise-returning functions until one returns a value
- `wait` - wait given amount of time (async)
- `waitSync` - wait given amount of time (sync)
- `waitFor` - wait for a condition to be true, checking every given amount of time

### Various
- `get` - extract a value from a deep object using specified path, optionally with a default value
- `getMultiple` - same as above, but test multiple paths
- `set` - set a value in a deep object using specified path
- `setImmutable` - set a value in a deep object using specified path, but return a new object
- `isEmpty` - check if given value is empty
- `throttle` - throttle a function, very configurable
- `truthy` - is value truthy? (useful for filtering with more correct TypeScript support than `filter(Boolean)`)

Methods will be added as I need them. I am open for suggestions and PRs. See next heading for list of methods that I
want to add.

## Methods to be supported

(TODO)
- debounce

## Tested

This library is fully unit tested and can be used on production. See License.

## License

MIT
