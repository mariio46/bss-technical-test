'use client';

import { useQueryAuthUser } from '@/queries/client/auth-user';

const AuthUserProvider = ({ children }: { children: React.ReactNode }) => {
    useQueryAuthUser();

    return children;
};

export { AuthUserProvider };
