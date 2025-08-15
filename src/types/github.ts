export type GitHubUser = {
  avatar_url: string;
};

export type GitHubRepoInfo = {
  name: string;
};

export type GitHubCommit = {
  sha: string;
  message: string;
  author: {
    name: string;
    email?: string;
  };
};

export type GitHubPushEvent = {
  id: string;
  type: "PushEvent";
  created_at: string;
  actor: GitHubUser;
  repo: GitHubRepoInfo;
  payload: {
    commits: GitHubCommit[];
  };
};

export type GitHubEvent = GitHubPushEvent | {
  id: string;
  type: string; // other events
  [key: string]: any;
};

export type GitHubLanguages = {
  [language: string]: number; // e.g., { "JavaScript": 12345, "TypeScript": 6789 }
};
