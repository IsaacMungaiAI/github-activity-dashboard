import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && profile) {
                token.accessToken = account.access_token;
                token.login = (profile as any).login; // GitHub username
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            if (token.login) {
                session.user.login = token.login as string;
            }
            return session;
        },
    },
});


export { handler as GET, handler as POST };

