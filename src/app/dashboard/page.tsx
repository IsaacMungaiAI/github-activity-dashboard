import Header from "@/components/header";
import ProfileCard from "@/components/profile-card";
import RepoList from "@/components/repo-list";
import CommitFeed from "@/components/commit-feed";
import LanguageChart from "@/components/language-chart";
import StatsCard from "@/components/stats-card";

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 space-y-6">
      <Header />
      <ProfileCard />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard type="repos" />
        <StatsCard type="commits" />
        <StatsCard type="followers" />
        <StatsCard type="stars" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RepoList />
        <CommitFeed />
      </div>
      <LanguageChart />
    </div>
  );
}
