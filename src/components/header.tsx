"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
    const [username, setUsername] = useState("octocat");

    const handleSearch = () => {
        console.log("Fetch data for:", username);
        // Later: trigger context/global state to update
    };

    return (
        <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-2xl font-bold flex items-center gap-2">
                <Github className="w-6 h-6" />
                GitHub Activity Dashboard
            </h1>

            <div className="flex gap-2 w-full md:w-auto">
                <Input
                    placeholder="Enter GitHub username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Button onClick={handleSearch}>Search</Button>
                <ThemeToggle />
            </div>
        </div>
    );
}
