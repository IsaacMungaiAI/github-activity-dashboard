"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GithubIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { useGithub } from "@/context/GithubContext";
import { SiGithub } from "react-icons/si";

export default function Header({ onSearch }: { onSearch?: (username: string) => void }) {
    const { setUsername } = useGithub();
    const [localUsername, setLocalUsername] = useState("octocat");
    const [loading, setLoading] = useState(false);

    const handleSearch = () => {
        if (!localUsername.trim()) return;
        onSearch?.(localUsername.trim());
    };

    return (
        <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-2xl font-bold flex items-center gap-2">
                <SiGithub className="w-6 h-6" />
                GitHub Activity Dashboard
            </h1>

            <div className="flex gap-2 w-full md:w-auto">
                <Input
                    placeholder="Enter GitHub username"
                    value={localUsername}
                    onChange={(e) => setLocalUsername(e.target.value)}
                />
                <Button onClick={handleSearch} disabled={loading}>
                    {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        "Search"
                    )}
                </Button>
                <ThemeToggle />
            </div>
        </div>
    );
}
