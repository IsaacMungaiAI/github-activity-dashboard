"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GithubIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { useGithub } from "@/context/GithubContext";
import { SiGithub } from "react-icons/si";
import { signOut, useSession } from "next-auth/react";

export default function Header({ onSearch }: { onSearch?: (username: string) => void }) {
    const { data: session } = useSession();
    const [localUsername, setLocalUsername] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (session?.user?.login) {
            setLocalUsername(session.user.login);
            onSearch?.(session.user.login); // auto-load user’s data
        }
    }, [session?.user?.login]);

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
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />
                <Button onClick={handleSearch} disabled={loading}>
                    {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        "Search"
                    )}
                </Button>
                <ThemeToggle />
                <Button onClick={() => signOut()} className="px-4 py-2 bg-black text-white rounded-lg">
                    Sign out
                </Button>

            </div>
        </div>
    );
}
