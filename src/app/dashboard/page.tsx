"use client";
import Header from "@/components/header";
import ProfileCard from "@/components/profile-card";
import RepoList from "@/components/repo-list";
import CommitFeed from "@/components/commit-feed";
import LanguageChart from "@/components/language-chart";
import StatsCard from "@/components/stats-card";
import { useGithub } from "@/context/GithubContext";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Loader } from "@/components/Loader";

export default function DashboardPage() {
  const { data: session } = useSession();
  const { username, setUsername } = useGithub();
  const [profile, setProfile] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [userActivity, setUserActivity] = useState<any[]>([]);
  const [langData, setLangData] = useState<any[]>([]);

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
        const langRes= await fetch(`/api/github/langs/${username}`)

        if (!profileRes.ok || !reposRes.ok || !activityRes.ok) {
          throw new Error("Failed to fetch GitHub data");
        }

        const profileData = await profileRes.json();
        const reposData = await reposRes.json();
        const activityData = await activityRes.json();
        const langData = await langRes.json();

        

        setProfile(profileData);
        setRepos(reposData);
        setUserActivity(activityData);
        setLangData(langData);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [username]);

  

  const stars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const commitCount = userActivity.filter((event) => event.type === "PushEvent").length;

  if (!profile) return <Loader/>;

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-6">
      <Header />
      <ProfileCard profile={profile} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard type="repos" count={repos.length} />
        <StatsCard type="commits" count={commitCount} />
        <StatsCard type="followers" count={profile.followers} />
        <StatsCard type="stars" count={stars} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RepoList repos={repos} />
        <CommitFeed activity={userActivity} />
      </div>
      <LanguageChart langData={langData} />
    </div>
  );
}

