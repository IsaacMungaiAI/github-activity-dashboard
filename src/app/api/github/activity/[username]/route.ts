import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    context: { params: Promise<{ username: string }> }
) {
    try {

        const session = await getServerSession(authOptions);

        if (!session?.accessToken) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }


        const { username } = await context.params; // ✅ Await before use

        const res = await fetch(`https://api.github.com/users/${username}/events`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,

                "User-Agent": "github-activity-dashboard"
            },
            cache: "no-store",
        });

        console.log("GitHub Token present:", !!process.env.GITHUB_TOKEN);


        if (!res.ok) {
            return new Response(JSON.stringify({ error: "Failed to fetch activity" }), { status: res.status });
        }

        const data = await res.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (err: unknown) {
        console.error("API Error:", err);
        return new Response(
            JSON.stringify({
                error: "Internal Server Error",
                details: err instanceof Error ? err.message : 'Unexpected error occurred',
            }),
            { status: 500 }
        );
    }

}
