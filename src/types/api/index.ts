type ApiResponse<TData> = {
    count: number;
    next?: string;
    previous?: string;
    results: TData;
};

type FieldError = {
    error: string;
    code: string;
};

type ApiErrorValidation<TError extends Record<string, FieldError[]>> = {
    error: string;
    detail: TError;
};

export type { ApiErrorValidation, ApiResponse, FieldError };
