import type { APIRoute } from "astro";
import { importPKCS8, SignJWT } from 'jose';

export const GET: APIRoute = async ({ request, locals }) => {
    const { env } = locals.runtime;
    const base = env.CONTAINER_ENDPOINT;
    const accountEmail = env.ACCOUNT_EMAIL;
    const privateKey = atob(env.PRIVATE_KEY);

    const source = new URL(request.url);
    const url = new URL(source.pathname + source.search, base);

    const idToken = await getIdToken(privateKey, accountEmail, base);

    return await fetch(
        url.toString(),
        {
            headers: {
                "Authorization": `Bearer ${idToken}`,
                "User-Agent": "PetPetBot/1.0 (internal)",
                "X-Request-ID": request.headers.get("cf-ray") || ''
            }
        }
    );
}

async function getIdToken(privateKeyPem: string, accountEmail: string, serviceUrl: string): Promise<string> {
  const privateKey = await importPKCS8(privateKeyPem, 'RS256');
  const now = Math.floor(Date.now() / 1000);
  const jwt = await new SignJWT({
    iss: accountEmail,
    sub: accountEmail,
    aud: 'https://oauth2.googleapis.com/token',
    target_audience: serviceUrl,
    iat: now,
    exp: now + 5,
  })
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .sign(privateKey);

  const resp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(`Error fetching ID token: ${JSON.stringify(data)}`);
  }
  if (!data.id_token) {
    throw new Error('No id_token in response');
  }

  return data.id_token;
}

export const prerender = false