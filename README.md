# 🧑‍💻 GitHub Activity Dashboard

A developer-focused dashboard that visualizes your GitHub profile, repositories, contributions, and public activity. Built with **Next.js**, **React**, and the **GitHub GraphQL/REST APIs**.

> 📌 Made for developers, open-source contributors, and those applying to the GitHub Developer Program.

---

## 🚀 Features

- 🔐 **GitHub OAuth Login** — Sign in with your GitHub account securely
- 👤 **Profile Overview** — Avatar, bio, followers, public repo stats
- 📊 **Contribution Graph** — Activity calendar like GitHub’s heatmap
- 📁 **Repository Insights** — Stars, forks, topics, last updated, languages
- 📰 **Activity Feed** — Recent pushes, PRs, issues, and contributions
- ⚖️ **Compare Mode (Coming Soon)** — Compare two developers side by side

---

## 🧰 Tech Stack

| Technology   | Description                          |
|--------------|--------------------------------------|
| [Next.js](https://nextjs.org) | React framework for SSR and routing |
| [NextAuth.js](https://next-auth.js.org/) | GitHub OAuth authentication         |
| [Octokit](https://github.com/octokit) | GitHub REST and GraphQL API SDK     |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling               |
| [ShadCN UI](https://ui.shadcn.dev) | Modern component library             |
| [Recharts](https://recharts.org/) | Data visualization (charts, graphs) |

---

## 📸 Screenshots

> _(Add screenshots or screen recordings here after MVP is ready)_

---

## 🧪 Live Demo

> 🔗 [https://github-activity-dashboard.vercel.app](https://github-activity-dashboard.vercel.app) (Coming Soon)

---

## 🧑‍🔧 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/github-activity-dashboard.git
cd github-activity-dashboard


2. Install Dependencies
npm install


3. Configure Environment Variables
Create a .env.local file in the root and add:
GITHUB_ID=your_github_oauth_client_id
GITHUB_SECRET=your_github_oauth_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

Get your GitHub credentials from: https://github.com/settings/developers


4. Run Locally
npm run dev
Open http://localhost:3000


📦 Build & Deploy
This project is automatically deployed with Vercel. Every push to main will trigger a deployment.


✨ Roadmap
 GitHub login with OAuth
 Fetch user profile
 Contribution calendar
 Repo list with filters
 Activity feed with pagination
 Comparison view for two users
 PDF export of GitHub stats
 Weekly email summary (via CRON)
 Dark mode toggle


 🙋‍♂️ Contributing
 Contributions are welcome!
 1. Fork the repo
 2. Create a new branch (git checkout -b feature/feature-name)
 3. Commit your changes (git commit -m 'Add new feature')
 4. Push to the branch (git push origin feature/feature-name)
 5. Open a Pull Request


🛡 License
This project is licensed under the MIT License. See the LICENSE file for details.


💬 Let's Connect
🐙 GitHub: @IsaacMungaiAI

📧 Email: imbugua839@gmail.com

🧠 Built for GitHub Developer Program



🌟 If you like this project...
Give it a ⭐️ on GitHub to show support and share it with others!









## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.