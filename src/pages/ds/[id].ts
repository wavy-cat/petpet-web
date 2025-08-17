import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, locals }) => {
    const { env } = locals.runtime;
    const token = env.IAM_TOKEN;
    const base = env.CONTAINER_ENDPOINT;
    console.log(base);
    console.log(request);
    const source = new URL(request.url);
    const url = new URL(source.pathname + source.search, base);
    console.log(url);
    console.log(url.toString());
    const resp = await fetch(
        url.toString(),
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