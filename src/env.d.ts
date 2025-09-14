type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
    interface Locals extends Runtime {
        otherLocals: {
            BOT_TOKEN: string,
            ACCOUNT_EMAIL: string,
            PRIVATE_KEY: string,
            CONTAINER_ENDPOINT: string,
        };
    }
}