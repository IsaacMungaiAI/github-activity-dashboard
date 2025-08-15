interface FetchOptions extends RequestInit {}

async function fetchWithTimeout(
  url: string,
  options: FetchOptions = {},
  timeout = 10000
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("Network is too slow");
    }
    throw err;
  }
}

interface Repo {
  name: string;
  languages_url: string;
}

type LanguageMap = Record<string, number>;

export async function GET(
  req: Request,
  context: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await context.params;

    if (!process.env.GITHUB_TOKEN) {
      return new Response(JSON.stringify({ error: "Missing GITHUB_TOKEN" }), {
        status: 500,
      });
    }

    // Fetch all repos
    const reposRes = await fetchWithTimeout(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "User-Agent": "github-activity-dashboard",
        },
        cache: "no-store",
      }
    );

    if (!reposRes.ok) {
      console.error(`Failed to fetch repos for ${username}`);
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const repos: Repo[] = await reposRes.json();

    // Sequentially fetch languages for each repo
    const languagesArray: LanguageMap[] = [];
    for (const repo of repos) {
      try {
        const langRes = await fetch(repo.languages_url, {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            "User-Agent": "github-activity-dashboard",
          },
        });

        if (langRes.ok) {
          const langs: LanguageMap = await langRes.json();
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
    const languageMap: LanguageMap = {};
    languagesArray.forEach((repoLangs) => {
      Object.entries(repoLangs).forEach(([lang, val]) => {
        languageMap[lang] = (languageMap[lang] || 0) + val;
      });
    });

    // Return array for chart compatibility
    const langArray = Object.entries(languageMap).map(([name, value]) => ({
      name,
      value,
    }));

    return new Response(JSON.stringify(langArray), { status: 200 });
  } catch (err) {
    console.error("API Error:", err);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: err instanceof Error ? err.message : String(err),
      }),
      { status: 500 }
    );
  }
}

