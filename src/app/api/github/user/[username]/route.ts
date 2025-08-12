export async function GET(
    req: Request,
    context: { params: Promise<{ username: string }> }
) {
    const { username } = await context.params
    const res = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            "User-Agent": "github-activity-dashboard"
        },
        cache: "no-store"
    });

    if (!res.ok) {
        return new Response(JSON.stringify({ error: "Failed to fetch user" }), { status: res.status });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
}
