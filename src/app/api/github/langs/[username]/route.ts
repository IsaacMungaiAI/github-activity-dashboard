// src/app/api/github/langs/[username]/route.ts
export async function GET(
    req: Request,
    context: { params: { username: string } }
) {
    try {
        const { username } = context.params;

        if (!process.env.GITHUB_TOKEN) {
            return new Response(JSON.stringify({ error: "Missing GITHUB_TOKEN" }), { status: 500 });
        }


        // Fetch all repos
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                "User-Agent": "github-activity-dashboard",
            },
            cache: "no-store",
        });

        if (!reposRes.ok) {
            return new Response(JSON.stringify({ error: "Failed to fetch repos" }), {
                status: reposRes.status,
            });
        }

        const repos = await reposRes.json();

        // Fetch languages for each repo
        const languagesArray = await Promise.all(
            repos.map(async (repo: any) => {
                const langRes = await fetch(repo.languages_url, {
                    headers: {
                        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                        "User-Agent": "github-activity-dashboard",
                    },
                });
                return langRes.ok ? langRes.json() : {};
            })
        );

        // Aggregate languages
        const languageMap: Record<string, number> = {};
        languagesArray.forEach((repoLangs) => {
            Object.entries(repoLangs).forEach(([lang, val]) => {
                languageMap[lang] = (languageMap[lang] || 0) + (val as number);
            });
        });

        return new Response(JSON.stringify(languageMap), { status: 200 });
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
