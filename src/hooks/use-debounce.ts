import * as React from 'react';

export const useDebounce = <TValue>(value: TValue, delay?: number): TValue => {
    const [debounceValue, setDebounceValue] = React.useState<TValue>(value);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(value);
        }, delay || 700);

        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debounceValue;
};
