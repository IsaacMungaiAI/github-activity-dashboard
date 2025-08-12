export async function GET(
    req: Request,
    context: { params: Promise<{ username: string }> }
) {
    try {
        const { username } = await context.params; // ✅ Await before use

        const res = await fetch(`https://api.github.com/users/${username}/events`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                "User-Agent": "github-activity-dashboard"
            },
            cache: "no-store",
        });

        console.log("GitHub Token present:", !!process.env.GITHUB_TOKEN);


        if (!res.ok) {
            return new Response(JSON.stringify({ error: "Failed to fetch activity" }), { status: res.status });
        }

        const data = await res.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (err: any) {
        console.error("API Error:", err);
        return new Response(
            JSON.stringify({
                error: "Internal Server Error",
                details: err.message || err,
            }),
            { status: 500 }
        );
    }

}
