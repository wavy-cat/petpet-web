import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, locals }) => {
    const { env } = locals.runtime;
    const token = env.BOT_TOKEN;
    const userId = params.id;
    const response = await fetch(
        `https://discord.com/api/v10/users/${userId}`,
        {
            headers: {
                "Authorization": `Bot ${token}`,
                "User-Agent": "PetPetBot/1.0"
            }
        }
    );

    switch (response.status) {
        case 404:
            return new Response(
                JSON.stringify({
                    "found": false,
                    "bot": null,
                    "error": false
                }),
                { headers: { "Content-Type": "application/json" } }
            );
        case 200:
            const body = await response.json();
            return new Response(
                JSON.stringify({
                    "found": true,
                    "bot": body.bot === true,
                    "error": false
                }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Cache-Control": "public, max-age=86400"
                    }
                }
            );
        default:
            const text = await response.text();
            console.log({
                "level": "error",
                "user_id": userId,
                "response_status": response.status,
                "response_text": text
            })
            return new Response(
                JSON.stringify({
                    "found": false,
                    "bot": null,
                    "error": true
                }),
                {
                    status: 500,
                    headers: { "Content-Type": "application/json" }
                }
            );
    }
}

export const prerender = false