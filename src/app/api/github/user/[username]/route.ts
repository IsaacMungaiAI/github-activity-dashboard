import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    context: { params: Promise<{ username: string }> }
) {

    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { username } = await context.params
    const res = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
            Authorization: `Bearer ${session.accessToken}`, // 🔹 signed-in user’s token,
            "User-Agent": "github-activity-dashboard"
        },
        cache: "no-store"
    });

    if (!res.ok) {
        return new Response(JSON.stringify({ error: "Failed to fetch user" }), { status: res.status });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
}
