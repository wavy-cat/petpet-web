import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, locals }) => {
    const { env } = locals.runtime;
    const vpc = env.VPC_SERVICE;

    const url = new URL(request.url);
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

export const prerender = false