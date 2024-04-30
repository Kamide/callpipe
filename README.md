# callpipe

callpipe lets you chain functions linearly in JavaScript without syntax transformers. It is a combination of the proposed [call](https://github.com/tc39/proposal-call-this) and [pipe](https://github.com/tc39/proposal-pipeline-operator) operators.

## Methods

To invoke a method of any arity, pass the function as the first argument to `call` (the internal name of the closure returned by `pipe`) and the rest of the parameters. To extract the result, call it without any parameters.

```js
import { pipe } from 'callpipe';

const { concat, toUpperCase } = String.prototype;

function exclaim() {
	return this + '!';
}

function prepend(string) {
	return string + this;
}

console.assert(
	pipe
		('hello')
		(concat, ' ', 'world')
		(toUpperCase)
		(exclaim)
		(prepend, '🌎 ')
		()
	=== '🌎 HELLO WORLD!'
);

/*
prepend.call(
	exclaim.call(
		'hello'
			.concat(' ', 'world')
			.toUpperCase()),
	'🌎 ')
*/
```

## Data-First Functions

There are two ways of invoking regular functions. You can either pass in an index as the first parameter or a symbol. For index substitution, type inferencing is supported by up to 10 parameters. For placeholder substitution, it is best to use a unique symbol such as the one exported by callpipe: `$`. For data-first functions, using index substitution and passing `0` is preferred since it's shorter.

```js
import { $, pipe } from 'callpipe';

function* count() {
	for (let i = 0; ; ++i) {
		yield i;
	}
}

function* take(iterator, length) {
	iterator = iterator[Symbol.iterator]();
	while (length-- > 0) {
		const result = iterator.next();
		if (result.done) {
			return;
		}
		yield result.value;
	}
}

function* map(iterator, callback) {
	for (const value of iterator) {
		yield callback(value);
	}
}

function reduce(iterator, callback, accumulator) {
	for (const value of iterator) {
		accumulator = callback(accumulator, value);
	}
	return accumulator;
}

const double = x => x * 2;
const add = (x, y) => x + y;

console.assert(
	pipe
		(count())
		(0, take, 10)
		(0, map, double)
		(0, reduce, add, 0)
		()
	=== 90
);

console.assert(
	pipe
		(count())
		($, take, $, 10)
		($, map, $, double)
		($, reduce, $, add, 0)
		()
	=== 90
);

/*
reduce(
	map(
		take(
			count(),
			10),
		double),
	add,
	0);
*/
```

## Data-Last Functions

Data-last functions are invoked the same way as data-first functions, except you'll have to pass in `-1` instead of `0`. Placeholder substitution works the same.

```js
import { $, pipe } from 'callpipe';

function add(x, y, z) {
	return x + y + z;
}

console.assert(
	pipe
		(3)
		(-1, add, 1, 2)
		()
	=== 6
);

console.assert(
	pipe
		(3)
		($, add, 1, 2, $)
		()
	=== 6
);

/*
add(1, 2, 3);
*/
```

## Data-N Functions

You're not restricted to `0` and `-1` as indexes.

```js
import { $, pipe } from 'callpipe';

function add(x, y, z) {
	return x + y + z;
}

console.assert(
	pipe
		(2)
		(1, add, 1, 3)
		()
	=== 6
);

console.assert(
	pipe
		(2)
		($, add, 1, $, 3)
		()
	=== 6
);

/*
add(1, 2, 3);
*/
```

## Internals

As mentioned earlier, `pipe` returns a function `call` that closes over the passed in value referred to as the `accumulator`. Please keep in mind that the `accumulator` is overwritten whenever `call` is invoked with a function (referred to as the `reducer`). Unless no parameters are passed to `call`, it will always return itself.

```js
import { pipe } from 'callpipe';

// reducer
function increment() {
	return this + 1;
}

// accumulator
const initial = 0;

// closure
const call = pipe(initial);

const a = call(increment);
console.assert(a() === 1);

const b = call(increment);
console.assert(b() === 2);

console.assert(a() === 2);
console.assert(b() === 2);
console.assert(a === b);
```
