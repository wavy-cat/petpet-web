import type {APIRoute} from "astro";
import {env} from "cloudflare:workers";

export const GET: APIRoute = async ({request}) => {
    const vpc = env.VPC_SERVICE;

    const url = new URL(request.url);
    // noinspection HttpUrlsUsage
    const targetUrl = new URL(`http://petpet:3000${url.pathname}${url.search}`);
    const proxyRequest = new Request(targetUrl, {
        method: request.method,
        headers: {
            "User-Agent": "PetPetBot/1.0 (internal)",
            "X-Request-ID": request.headers.get("cf-ray") || ''
        },
        body: request.body,
    });

    return await vpc.fetch(proxyRequest);
}