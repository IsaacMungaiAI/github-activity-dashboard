"use client";

import Header from "@/components/header";
import ProfileCard from "@/components/profile-card";
import RepoList from "@/components/repo-list";
import CommitFeed from "@/components/commit-feed";
import LanguageChart from "@/components/language-chart";
import StatsCard from "@/components/stats-card";
import { useGithub } from "@/context/GithubContext";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { ProfileCardSkeleton } from "@/components/skeletons/ProfileCardLoader";
import { StatsCardSkeleton } from "@/components/skeletons/StatsCardLoader";
import { RepoListSkeleton } from "@/components/skeletons/RepoListLoader";
import { CommitFeedSkeleton } from "@/components/skeletons/CommitFeedLoader";
import { LanguageChartSkeleton } from "@/components/skeletons/LangChartLoader";

// GitHub API types
interface GitHubProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  description: string | null;
}

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string; url: string };
  payload: Record<string, unknown>;
  [key: string]: unknown;
}

interface LanguageData {
  name: string;
  value: number;
}

export default function DashboardPage() {
  const { data: session, status} = useSession();
  const { username, setUsername } = useGithub();

  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [userActivity, setUserActivity] = useState<GitHubEvent[]>([]);
  const [langData, setLangData] = useState<LanguageData[]>([]);

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [loadingLang, setLoadingLang] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (status === "loading") {
    return <p className="text-center mt-10">Loading session...</p>;
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="mb-4 text-lg">You’re not signed in</p>
        <button
          onClick={() => signIn("github")}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Sign in with GitHub
        </button>
      </div>
    );
  }


  useEffect(() => {
    if (session?.user?.login) {
      setUsername(session.user.login);
    }
  }, [session, setUsername]);

  useEffect(() => {
    if (!username) return;

    async function fetchData() {
      try {
        // 🔹 Calls your Next.js API routes (safe, token stays on server)
        const profileRes = await fetch(`/api/github/user/${username}`);
        const reposRes = await fetch(`/api/github/repos/${username}`);
        const activityRes = await fetch(`/api/github/activity/${username}`);
        const langRes = await fetch(`/api/github/langs/${username}`)

        if (!profileRes.ok || !reposRes.ok || !activityRes.ok || !langRes.ok) {
          throw new Error("Failed to fetch GitHub data");
        }

        /*const profileData = await profileRes.json();
        const reposData = await reposRes.json();
        const activityData = await activityRes.json();
        const langData = await langRes.json();



        setProfile(profileData);
        setRepos(reposData);
        setUserActivity(activityData);
        setLangData(langData);*/

        setProfile(await profileRes.json());
        setLoadingProfile(false);

        setRepos(await reposRes.json());
        setLoadingRepos(false);

        setUserActivity(await activityRes.json());
        setLoadingActivity(false);

        setLangData(await langRes.json());
        setLoadingLang(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
        setLoadingProfile(false);
        setLoadingRepos(false);
        setLoadingActivity(false);
        setLoadingLang(false);
      }
    }

    fetchData();
  }, [username]);



  const stars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const commitCount = userActivity.filter((event) => event.type === "PushEvent").length;



  return (
    <div className="min-h-screen p-4 md:p-8 space-y-6">
      <Header onSearch={(newUsername) => {
        setUsername(newUsername);
        //reset the skeleton loaders
        setLoadingProfile(true);
        setLoadingRepos(true);
        setLoadingActivity(true);
        setLoadingLang(true);

        // Reset error and old data
        setError(null);
        setProfile(null);
        setRepos([]);
        setUserActivity([]);
        setLangData([]);
      }} />
      {loadingProfile ? (<ProfileCardSkeleton />) : profile ? (<ProfileCard profile={profile} />) : null}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {loadingRepos ? <StatsCardSkeleton /> : <StatsCard type="repos" count={repos.length} />}
        {loadingActivity ? <StatsCardSkeleton /> : <StatsCard type="commits" count={commitCount} />}
        {loadingProfile ? (<StatsCardSkeleton />) : <StatsCard type="followers" count={profile?.followers ?? 0} />}
        {loadingRepos ? <StatsCardSkeleton /> : <StatsCard type="stars" count={stars} />}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loadingRepos ? (<RepoListSkeleton />) : repos ? (<RepoList repos={repos} />) : null}
        {loadingActivity ? <CommitFeedSkeleton /> : <CommitFeed activity={userActivity} />}
      </div>
      {loadingLang ? <LanguageChartSkeleton /> : <LanguageChart langData={langData} />}
    </div>
  );
}

