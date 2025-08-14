export async function GET(
    req: Request,
    context: { params: Promise<{ username: string }> }
) {
    try {
        const { username } = await context.params;

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

        // Sequentially fetch languages for each repo
        const languagesArray: Record<string, number>[] = [];
        for (const repo of repos) {
            try {
                const langRes = await fetch(repo.languages_url, {
                    headers: {
                        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                        "User-Agent": "github-activity-dashboard",
                    },
                });

                if (langRes.ok) {
                    const langs = await langRes.json();
                    languagesArray.push(langs);
                } else {
                    languagesArray.push({});
                }
            } catch (err) {
                console.error(`Failed to fetch languages for ${repo.name}:`, err);
                languagesArray.push({});
            }
        }

        // Aggregate languages
        const languageMap: Record<string, number> = {};
        languagesArray.forEach((repoLangs) => {
            Object.entries(repoLangs).forEach(([lang, val]) => {
                languageMap[lang] = (languageMap[lang] || 0) + (val as number);
            });
        });

        // Return array for chart compatibility
        const langArray = Object.entries(languageMap).map(([name, value]) => ({
            name,
            value,
        }));

        return new Response(JSON.stringify(langArray), { status: 200 });
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
