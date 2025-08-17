import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, locals }) => {
    const { env } = locals.runtime;
    const token = env.IAM_TOKEN;
    const endpoint = env.CONTAINER_ENDPOINT;
    const url = new URL(request.url);
    console.log(url);
    console.log(`${endpoint}${url.pathname}${url.search}`);
    const resp = await fetch(
        `${endpoint}${url.pathname}${url.search}`,
        {
            headers: {
                "Authorization": `Api-Key ${token}`,
                "User-Agent": "PetPetBot/1.0 (internal)"
            }
        }
    );
    console.log(resp.url);
    return resp;
}

export const prerender = false