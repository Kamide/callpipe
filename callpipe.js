export const $ = Symbol('$');

export function pipe(accumulator) {
	return function call(reducer, ...args) {
		switch (typeof reducer) {
			case 'function':
				accumulator = reducer.apply(accumulator, args);
				return call;
			case 'number':
				let index = reducer;
				reducer = args.shift();
				if (index === 0) {
					accumulator = reducer(accumulator, ...args);
					return call;
				}
				if (index < 0) {
					if (index > -2) {
						accumulator = reducer(...args, accumulator);
						return call;
					}
					++index;
				}
				args.splice(index, 0, accumulator);
				accumulator = reducer(...args);
				return call;
			case 'symbol':
				const placeholder = reducer;
				reducer = args.shift();
				for (let i = args.length - 1; i >= 0; --i) {
					if (args[i] === placeholder) {
						args.splice(i, 1, accumulator);
					}
				}
				accumulator = reducer(...args);
				return call;
		}
		return accumulator;
	};
}
