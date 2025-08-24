import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, locals }) => {
    const { env } = locals.runtime;
    const token = env.IAM_TOKEN;
    const base = env.CONTAINER_ENDPOINT;
    const source = new URL(request.url);
    const url = new URL(source.pathname + source.search, base);
    const resp = await fetch(
        url.toString(),
        {
            headers: {
                "Authorization": `Api-Key ${token}`,
                "User-Agent": "PetPetBot/1.0 (internal)"
            }
        }
    );
    return resp;
}

export const prerender = false;