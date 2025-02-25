type ApiResponse<TData> = {
    count: number;
    next?: string;
    previous?: string;
    results: TData;
};

export type { ApiResponse };
