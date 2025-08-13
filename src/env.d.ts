type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
    interface Locals extends Runtime {
        otherLocals: {
            BOT_TOKEN: string,
            IAM_TOKEN: string,
            CONTAINER_ENDPOINT: string,
        };
    }
}