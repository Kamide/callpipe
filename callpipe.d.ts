export declare const $: unique symbol;

export declare function pipe<A>(accumulator: A): Call<A>;

export type Call<A> = {
	(): A;

	<B, C extends any[]>(reducer: (this: A, ...args: C) => B, ...args: C): Call<B>;

	<B, C extends any[]>(index: 0, reducer: (...args: [A, ...C]) => B, ...args: C): Call<B>;
	<B, C extends any[], D>(index: 1, reducer: (...args: [D, A, ...C]) => B, ...args: [D, ...C]): Call<B>;
	<B, C extends any[], D, E>(index: 2, reducer: (...args: [D, E, A, ...C]) => B, ...args: [D, E, ...C]): Call<B>;
	<B, C extends any[], D, E, F>(index: 3, reducer: (...args: [D, E, F, A, ...C]) => B, ...args: [D, E, F, ...C]): Call<B>;
	<B, C extends any[], D, E, F, G>(index: 4, reducer: (...args: [D, E, F, G, A, ...C]) => B, ...args: [D, E, F, G, ...C]): Call<B>;
	<B, C extends any[], D, E, F, G, H>(index: 5, reducer: (...args: [D, E, F, G, H, A, ...C]) => B, ...args: [D, E, F, G, H, ...C]): Call<B>;
	<B, C extends any[], D, E, F, G, H, I>(index: 6, reducer: (...args: [D, E, F, G, H, I, A, ...C]) => B, ...args: [D, E, F, G, H, I, ...C]): Call<B>;
	<B, C extends any[], D, E, F, G, H, I, J>(index: 7, reducer: (...args: [D, E, F, G, H, I, J, A, ...C]) => B, ...args: [D, E, F, G, H, I, J, ...C]): Call<B>;
	<B, C extends any[], D, E, F, G, H, I, J, K>(index: 8, reducer: (...args: [D, E, F, G, H, I, J, K, A, ...C]) => B, ...args: [D, E, F, G, H, I, J, K, ...C]): Call<B>;
	<B, C extends any[], D, E, F, G, H, I, J, K, L>(index: 9, reducer: (...args: [D, E, F, G, H, I, J, K, L, A, ...C]) => B, ...args: [D, E, F, G, H, I, J, K, L, ...C]): Call<B>;

	<B, C extends any[]>(index: -1, reducer: (...args: [...C, A]) => B, ...args: C): Call<B>;
	<B, C extends any[], D>(index: -2, reducer: (...args: [...C, A, D]) => B, ...args: [...C, D]): Call<B>;
	<B, C extends any[], D, E>(index: -3, reducer: (...args: [...C, A, D, E]) => B, ...args: [...C, D, E]): Call<B>;
	<B, C extends any[], D, E, F>(index: -4, reducer: (...args: [...C, A, D, E, F]) => B, ...args: [...C, D, E, F]): Call<B>;
	<B, C extends any[], D, E, F, G>(index: -5, reducer: (...args: [...C, A, D, E, F, G]) => B, ...args: [...C, D, E, F, G]): Call<B>;
	<B, C extends any[], D, E, F, G, H>(index: -6, reducer: (...args: [...C, A, D, E, F, G, H]) => B, ...args: [...C, D, E, F, G, H]): Call<B>;
	<B, C extends any[], D, E, F, G, H, I>(index: -7, reducer: (...args: [...C, A, D, E, F, G, H, I]) => B, ...args: [...C, D, E, F, G, H, I]): Call<B>;
	<B, C extends any[], D, E, F, G, H, I, J>(index: -8, reducer: (...args: [...C, A, D, E, F, G, H, I, J]) => B, ...args: [...C, D, E, F, G, H, I, J]): Call<B>;
	<B, C extends any[], D, E, F, G, H, I, J, K>(index: -9, reducer: (...args: [...C, A, D, E, F, G, H, I, J, K]) => B, ...args: [...C, D, E, F, G, H, I, J, K]): Call<B>;
	<B, C extends any[], D, E, F, G, H, I, J, K, L>(index: -10, reducer: (...args: [...C, A, D, E, F, G, H, I, J, K, L]) => B, ...args: [...C, D, E, F, G, H, I, J, K, L]): Call<B>;

	<B, C extends any[], D extends symbol>(
		placeholder: D,
		reducer: (
			...args: {
				[K in keyof C]: C[K] extends D ? A : C[K];
			}
		) => B,
		...args: C
	): Call<B>;
};
