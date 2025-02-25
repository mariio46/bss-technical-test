'use client';

import * as React from 'react';

import { logout } from './action';

import { ServerActionSubmitButton } from '@/components/button';

const LogoutButton = () => {
    const [loading, setLoading] = React.useState(false);

    function handleLogout() {
        setLoading(true);
        logout();
        setTimeout(() => setLoading(false), 1000);
    }

    return <ServerActionSubmitButton onClick={handleLogout} disabled={loading} text='Logout' />;
};

export { LogoutButton };
