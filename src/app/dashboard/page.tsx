import Header from "@/components/header";
import ProfileCard from "@/components/profile-card";
import RepoList from "@/components/repo-list";
import CommitFeed from "@/components/commit-feed";
import LanguageChart from "@/components/language-chart";
import StatsCard from "@/components/stats-card";
import { getLanguageBreakdown, getUserActivity, getUserProfile, getUserRepos } from "@/lib/github";

type Props = {
  profile: Awaited<ReturnType<typeof getUserProfile>>;
  repos: Awaited<ReturnType<typeof getUserRepos>>;
};

export default async function DashboardPage() {

  const profile=await getUserProfile();
  const repos=await getUserRepos();
  const userActivity= await getUserActivity();
  const langData = await getLanguageBreakdown(repos);

  const stars = repos.reduce((acc: any, repo: { stargazers_count: any; }) => acc + repo.stargazers_count, 0);
  const commitCount = userActivity.filter((event: { type: string; }) => event.type === "PushEvent").length;
  

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
      <LanguageChart langData={langData}/>
    </div>
  );
}
