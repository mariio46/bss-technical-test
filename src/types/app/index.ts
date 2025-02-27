type Params<TParam extends Record<string, string | number>> = {
    params: Promise<TParam>;
};

export type { Params };
