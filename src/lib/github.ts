// lib/github.ts
export interface Repo {
  name: string;
  full_name: string;
  languages_url: string;
  html_url: string;
  [key: string]: any; // allows extra fields without error
}



const GITHUB_API = "https://api.github.com";


const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000); // 10s

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "User-Agent": "github-activity-dashboard",
        ...(options.headers || {}),
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.error(`GitHub API Error: ${res.status} - ${url}`);
      throw new Error(`GitHub API Error: ${res.status}`);
    }

    return res.json();
  } catch (err) {
    console.error(`Network error or timeout on: ${url}`, err);
    throw err;
  }
}

export async function fetchFromGitHub(endpoint: string) {
  return fetchWithAuth(`${GITHUB_API}${endpoint}`, {
    next: { revalidate: 60 },
  });
}

export async function getUserProfile(username: string) {
  return fetchFromGitHub(`/users/${username}`);
};

export async function getUserRepos(username: string) {
  return fetchFromGitHub(`/users/${username}/repos?per_page=100`);
};

export async function getUserActivity(username: string) {
  return fetchFromGitHub(`/users/${username}/events`);
};


export async function getLanguageBreakdown(repos: Repo[]): Promise<any[]> {
  try {
    return await Promise.all(
      repos.map(async (repo) => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const res = await fetch(repo.languages_url, {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            "User-Agent": "github-activity-dashboard",
          },
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        return await res.json();
      })
    );
  } catch (error) {
    console.error("Failed to fetch language breakdown:", error);
    return []; // fallback to empty
  }
}


