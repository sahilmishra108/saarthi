# SAARTHI – AI Career Coach 🚀

**SAARTHI** is an AI-powered career platform built to guide you through every stage of your job journey. Whether you're building your resume, preparing for interviews, writing cover letters, or analyzing career progress — SAARTHI is your smart, reliable companion.

Harnessing cutting-edge tools like **Gemini AI**, **Inngest**, and **NeonDB**, this full-stack application is modern, fast, and scalable.

---

## 🧠 Features

- ✅ **AI Resume Builder** – Auto-generate ATS-friendly resumes with suggestions.
- ![Screenshot 2025-07-06 004242](https://github.com/user-attachments/assets/0cc022e3-9c21-4721-8ae9-0aa8191d1f54)

- ✅ **Smart Interview Coach** – Practice interviews & get feedback via Gemini AI.
- ![Screenshot 2025-07-06 004323](https://github.com/user-attachments/assets/564c58a1-50fe-4e31-9b64-6b56d543b398)

- ✅ **Cover Letter Assistant** – Generate targeted cover letters with ease.
- ![Screenshot 2025-07-06 004303](https://github.com/user-attachments/assets/2f2dde21-2643-4f3c-9bf1-d0c794d546f2)

- ✅ **Industry Insights** – AI-curated market trends, salaries & job roles.
- ![Screenshot 2025-07-06 004343](https://github.com/user-attachments/assets/9643b5e0-382b-4854-91c6-f1e12438dc97)

- ✅ **Authentication & Roles** – Managed via Clerk.
- ![Screenshot 2025-07-06 014929](https://github.com/user-attachments/assets/94baa34d-c783-4106-8761-7470cef33d18)

  
  
---

## 🔧 Tech Stack

| Technology      | Purpose                                              |
|-----------------|------------------------------------------------------|
| **Next.js**     | App framework (React + SSR/ISR)                      |
| **Tailwind CSS**| Utility-first styling                                |
| **ShadCN UI**   | Accessible & stylish component library               |
| **Clerk**       | Authentication & user session management             |
| **Gemini AI**   | Google GenAI for smart resume & interview features   |
| **Inngest**     | Event-driven workflows & background jobs             |
| **Neon DB**     | Scalable, serverless Postgres with branching support |
| **Prisma ORM**  | Type-safe database access                            |
| **Vercel**      | Cloud hosting & serverless deployment                |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/saarthi.git
cd saarthi
```
### 2. Install Dependencies

```bash
npm install
# or
yarn install
```
### 3. Setup Environmrnt Variables

Create a .env.local file in your project root:

DATABASE_URL – your Neon Postgres database connection string

CLERK_PUBLISHABLE_KEY – your Clerk frontend (public) API key

CLERK_SECRET_KEY – your Clerk backend (secret) API key

NEXT_PUBLIC_CLERK_FRONTEND_API – Clerk frontend API for Next.js integration

GEMINI_API_KEY – your Gemini (Google AI) API key

INNGEST_EVENT_KEY – your Inngest event/key token for background jobs

NEXT_PUBLIC_APP_URL – your app’s base URL (e.g., http://localhost:3000 or production domain)

### 4. Run Local Development Server

```bash
npm run dev
# or
yarn dev
```
Open your browser at: http://localhost:3000

---

## ☁️ Deployment

Deployed on: Vercel (https://saarthi-ze3m.vercel.app/)

📤 Push your code to GitHub – Make sure your latest changes are committed and pushed.

🔗 Import your repository on Vercel – Go to vercel.com and connect your GitHub repo.

🔐 Set environment variables in the Vercel dashboard – Match your .env.local file.

✅ Deploy and go live! 🎉 – Vercel will automatically build and host your app.

---

## 📈 Roadmap
📄 PDF Resume Export – Allow users to download resumes as polished PDF files

🧠 AI-Powered Career Gap Analysis – Recommend learning paths based on job goals and skill gaps

🌐 Multi-language Support – Enable multilingual UI for global users

🔍 Job Board Integration – Pull real-time jobs from Indeed, LinkedIn, etc.

📊 Admin Dashboard for Insights – Monitor user stats, trends, and system usage



 ---

## 📬 Contact
Creator: SAHIL MISHRA

📧 Email: sahilvatsa959@gmail.com

🔗 LinkedIn: https://www.linkedin.com/in/sahil-mishra-b54b59257










