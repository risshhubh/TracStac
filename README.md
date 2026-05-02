# <p align="center">TracStac - v1.0</p>

<p align="center">
  <a href="https://tracstac-progresstrackr.up.railway.app/">
    <img src="https://img.shields.io/badge/%F0%9F%94%B4%20Live%20Demo-0078D4?style=for-the-badge&logoColor=white" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <img src="./public/mockup.png" alt="TracStac Mockup" width="100%" />
</p>

---

**TracStac** is a premium, high-performance project management ecosystem...

## ✨ Core Pillars

### 🎯 Role-Based Intelligence
- **Administrators**: Full global oversight. Create projects, deploy tasks, and monitor the entire team's velocity from a high-altitude dashboard.
- **Executors (Employees)**: Focused, distraction-free environment. Access only the tasks assigned to you, moving them through the pipeline without the noise of unrelated projects.

### 🎮 Immersive User Experience
- **Interactive Landing Portal**: Test the workflow live on the home page with a simulated task board before even signing up.
- **Game-Style Auth Sequence**: A technical, full-screen loading sequence with CRT scanlines and telemetry bars that triggers on login, making entry into the system feel high-stakes.
- **Active Navigation**: Smark Navbar with real-time route tracking and mobile-optimized iconography.

### 📊 Real-Time Analytics (Pulse)
- **Global Velocity**: Track completion percentages across all projects.
- **Activity Stream**: Live audit logs (e.g., "Admin logged in", "Task Created") to keep the heartbeat of the organization visible.

---

## 🛠️ Technical Architecture

| Component | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router / Turbopack) |
| **Database** | MongoDB Atlas (NoSQL) |
| **ORM** | Prisma with automated client generation |
| **Authentication** | NextAuth.js (JWT Strategy / Secure Credentials) |
| **Styling** | Vanilla Tailwind CSS 4 (Custom Neo-Brutalist System) |
| **Icons** | Lucide-React & Custom SVGs |
| **Deployment** | Railway with CI/CD integration |

---

## 🚀 Local Installation

### 1. Clone & Install
```bash
git clone https://github.com/risshubgit/TracStac.git
cd TracStac
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
MONGO_DB_URI="your_mongodb_connection_string"
NEXTAUTH_SECRET="your_random_secret_key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Database Initialization
Sync the Prisma schema with your MongoDB instance:
```bash
npx prisma db push
```

### 4. Deploy Locally
```bash
npm run dev
```
Portal active at: `http://localhost:3000`

---

## 🛰️ Production Deployment (Railway)

TracStac is optimized for Railway's `railpack` build system.

1. **Connect Repository**: Link your GitHub repo to Railway.
2. **Set Variables**: Add `MONGO_DB_URI`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL` (your deployment link) in the Railway dashboard.
3. **Build Script**: The project uses `prisma generate && next build` to ensure the database client is always in sync on the server.
4. **Build Output**: Railway will automatically provision the environment and serve the application globally.

---

## 🔐 Security & Privacy
- **Encrypted Passwords**: All user credentials are hashed using `bcryptjs` before storage.
- **Protected Routes**: Middleware strictly enforces session-based access control.
- **Sanitized API**: Internal data fetching is restricted by user ownership and role.

---

## 📜 License
This project is licensed under the MIT License.

---
*Built for the bold. Managed on the stack.* 🚀🌒
