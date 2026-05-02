TRACSTAC - v1.0
================================================================================
THE ULTIMATE COMMAND CENTER
================================================================================

LIVE DEMO: https://tracstac-progresstrackr.up.railway.app/

TracStac is a premium, high-performance project management ecosystem designed 
for speed, precision, and visual excellence. Built with a "Ship-First" 
philosophy, it combines a sleek Neo-Brutalist aesthetic with powerful 
role-based workflows to streamline team collaboration.

--------------------------------------------------------------------------------
CORE PILLARS
--------------------------------------------------------------------------------

* Role-Based Intelligence:
  - Administrators: Full global oversight. Create projects, deploy tasks, and 
    monitor velocity.
  - Executors (Employees): Focused, distraction-free environment. Access only 
    assigned tasks.

* Immersive User Experience:
  - Interactive Landing Portal: Test the workflow live on the home page.
  - Game-Style Auth Sequence: Technical full-screen loading with telemetry.
  - Active Navigation: Smart Navbar with real-time route tracking.

* Real-Time Analytics (Pulse):
  - Global Velocity: Track completion percentages across all projects.
  - Activity Stream: Live audit logs to keep the organization's heartbeat visible.

--------------------------------------------------------------------------------
SYSTEM ARCHITECTURE & ECOSYSTEM
--------------------------------------------------------------------------------

TracStac is engineered as a full-stack monolith using the Next.js App Router 
architecture. It leverages a centralized data layer to ensure consistency 
between the Admin control panel and the Employee task views.

* Core Modules:
  - Identity Engine: Custom NextAuth implementation with JWT strategy.
  - Pulse API: Aggregate project progress and user activity streams.
  - Kanban Pipeline: Responsive, state-managed task board.

--------------------------------------------------------------------------------
TECHNICAL ARCHITECTURE
--------------------------------------------------------------------------------

- Framework: Next.js 15 (App Router / Turbopack)
- Database: MongoDB Atlas (NoSQL)
- ORM: Prisma with automated client generation
- Authentication: NextAuth.js (JWT Strategy / Secure Credentials)
- Styling: Vanilla Tailwind CSS 4 (Custom Neo-Brutalist System)
- Icons: Lucide-React & Custom SVGs
- Deployment: Railway with CI/CD integration

--------------------------------------------------------------------------------
PROJECT STRUCTURE
--------------------------------------------------------------------------------

R:\TRACKSTACK
├── prisma/               # Database Schema & Migrations
├── public/               # Static Assets & Global Media
├── src/
│   ├── app/              # Next.js App Router (Pages & API Routes)
│   │   ├── api/          # Unified REST API Layer
│   │   ├── dashboard/    # Admin Control Center
│   │   ├── tasks/        # Employee Task Module
│   │   └── progress/     # Pulse Analytics Page
│   ├── components/       
│   │   ├── dashboard/    # Specialized Admin UI Components
│   │   ├── layout/       # Navigation & Global Wrappers
│   │   └── sections/     # High-Impact Marketing Components
│   ├── lib/              # Shared Utilities (Prisma Client, Auth Config)
│   ├── types/            # Global TypeScript Definitions
│   └── middleware.ts     # Edge-level Security & Role Routing
├── .env                  # Environment Configuration
├── package.json          # Dependencies & Scripts
└── tsconfig.json         # TypeScript Configuration

--------------------------------------------------------------------------------
TECHNICAL HIGHLIGHTS
--------------------------------------------------------------------------------

- Edge-Level Security: Middleware handles role-based redirection at the network edge.
- Dynamic Data Aggregation: Complex Prisma queries with _count and include optimizations.
- Premium Performance: Utilizing Next.js Turbopack for ultra-fast development.
- Scalable NoSQL: Backed by MongoDB Atlas for flexible schemas.

--------------------------------------------------------------------------------
LOCAL INSTALLATION
--------------------------------------------------------------------------------

1. Clone & Install:
   git clone https://github.com/risshubgit/TracStac.git
   cd TracStac
   npm install

2. Environment Configuration:
   Create a .env file:
   MONGO_DB_URI="your_mongodb_connection_string"
   NEXTAUTH_SECRET="your_random_secret_key"
   NEXTAUTH_URL="http://localhost:3000"

3. Database Initialization:
   npx prisma db push

4. Deploy Locally:
   npm run dev

--------------------------------------------------------------------------------
PRODUCTION DEPLOYMENT (RAILWAY)
--------------------------------------------------------------------------------

1. Connect Repository: Link GitHub repo to Railway.
2. Set Variables: Add MONGO_DB_URI, NEXTAUTH_SECRET, and NEXTAUTH_URL.
3. Build Script: Uses "prisma generate && next build".

--------------------------------------------------------------------------------
SECURITY & PRIVACY
--------------------------------------------------------------------------------

- Encrypted Passwords: All user credentials hashed using bcryptjs.
- Protected Routes: Middleware enforces session-based access control.
- Sanitized API: Internal data fetching restricted by user ownership and role.

--------------------------------------------------------------------------------
LICENSE: MIT
--------------------------------------------------------------------------------
Built for the bold. Managed on the stack. 🚀🌒
