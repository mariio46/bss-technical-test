declare namespace NodeJS {
    export interface ProcessEnv {
        // Client
        readonly NEXT_PUBLIC_BASE_APP_URL: string;

        readonly NEXT_PUBLIC_ACCESS_TOKEN_COOKIE_KEY: string;
        readonly NEXT_PUBLIC_REFRESH_TOKEN_COOKIE_KEY: string;
        readonly NEXT_PUBLIC_USER_SESSION_COOKIE_KEY: string;

        // ------------------------------------------

        // Server
        readonly ENABLE_QUICK_PREVIEW: string;
        readonly REMOVE_CONSOLE_LOG: string;

        readonly BASE_API_URL: string;
        readonly DB_TOKEN: string;
    }
}
