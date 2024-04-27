import { equal, notEqual } from 'node:assert';
import { describe, it } from 'node:test';
import { $, pipe } from './callpipe.js';

describe('callpipe', () => {
	it('$ is a unique symbol named $', () => {
		equal(typeof $, 'symbol');
		const name = $.description;
		equal(name, '$');
		notEqual($, Symbol.for(name));
	});

	it('pipe returns a closure named call', () => {
		const sentinel = Symbol('sentinel');
		const call = pipe(sentinel);
		equal(typeof call, 'function');
		equal(call.name, 'call');
		equal(call(), sentinel);
		equal(call(), sentinel);
	});

	it('call accepts methods', () => {
		function add(...args) {
			let sum = this;
			for (const arg of args) {
				sum += arg;
			}
			return sum;
		}

		equal(pipe(0)(add)(), 0);
		equal(pipe(0)(add, 1)(), 1);
		equal(pipe(0)(add, 1, 2)(), 3);

		const { concat, join } = Array.prototype;
		const { toUpperCase } = String.prototype;
		equal(
			pipe
				(['hello'])
				(concat, ['world'])
				(join, ' ')
				(toUpperCase)
				(),
			'HELLO WORLD'
		);
	});

	it('call accepts functions with index substitution', () => {
		const at = index => (...$) => {
			if (index < 0) {
				index += $.length;
			}
			for (let i = 0; i < $.length; ++i) {
				if (i === index) {
					return $[i];
				}
			}
		};

		const a0 = Symbol('a0');
		const a1 = Symbol('a1');
		equal(pipe(a0)(0, at(0), a1)(), a0);

		const b0 = Symbol('b0');
		const b1 = Symbol('b1');
		equal(pipe(b1)(-1, at(-1), b0)(), b1);

		const cs = [
			Symbol('c0'),
			Symbol('c1'),
			Symbol('c2'),
			Symbol('c3'),
			Symbol('c4'),
		];
		for (let i = 0; i <= 5; ++i) {
			const c = cs.at(i);
			const args = [...cs.slice(0, i), ...cs.slice(i + 1)];
			equal(pipe(c)(i, at(i), ...args)(), c);
		}
		for (let i = -1; i >= -cs.length; --i) {
			const c = cs.at(i);
			const args = [...cs.slice(-cs.length, i)];
			if (i < -1) {
				args.push(...cs.slice(i + 1));
			}
			equal(pipe(c)(i, at(i), ...args)(), c);
		}

		const d0 = Symbol('d0');
		const d1 = Symbol('d1');
		const d2 = Symbol('d2');
		const d3 = Symbol('d3');
		const d4 = Symbol('d4');
		const d5 = Symbol('d5');

		function d5IsAt(index) {
			equal(pipe(d5)(index, at(5), d0, d1, d2, d3, d4)(), d5);
		}
		d5IsAt(5);
		d5IsAt(6);
		d5IsAt(Infinity);

		function d0IsAt(index) {
			equal(pipe(d0)(index, at(0), d1, d2, d3, d4, d5)(), d0);
		}
		d0IsAt(-6);
		d0IsAt(-7);
		d0IsAt(-Infinity);
		d0IsAt(NaN);
	});

	it('call accepts functions with placeholder substitution', () => {
		const concat = (a, b) => a + b;
		equal(pipe('$')($, concat, $, 'b')(), '$b');
		equal(pipe('$')($, concat, 'a', $)(), 'a$');
		equal(pipe('$')($, concat, $, $)(), '$$');

		const sentinel = Symbol('sentinel');
		equal(pipe('$')($, a => a, sentinel)(), sentinel);
	});
});
