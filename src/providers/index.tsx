import { TanstackQueryProvider } from './tanstack-query-provider';

const RootProvider = ({ children }: { children: React.ReactNode }) => {
    return <TanstackQueryProvider>{children}</TanstackQueryProvider>;
};

export { RootProvider };
