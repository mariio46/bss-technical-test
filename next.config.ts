import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    compiler: {
        removeConsole: !!Number(process.env.REMOVE_CONSOLE_LOG),
    },
    eslint: {
        ignoreDuringBuilds: !!Number(process.env.ENABLE_QUICK_PREVIEW),
    },
    typescript: {
        ignoreBuildErrors: !!Number(process.env.ENABLE_QUICK_PREVIEW),
    },
};

export default nextConfig;
