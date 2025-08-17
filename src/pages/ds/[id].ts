import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, locals }) => {
    const { env } = locals.runtime;
    const token = env.IAM_TOKEN;
    const base = env.CONTAINER_ENDPOINT;
    const url = new URL(request.url, base);
    console.log(url);
    const resp = await fetch(
        url,
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