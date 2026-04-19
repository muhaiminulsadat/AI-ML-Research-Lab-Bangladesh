# 🧠 ML & AI Research Lab, Bangladesh

> **Live Research, Education & Administrative Platform** built for the ML & AI Research Lab, Bangladesh.

An integrated, full-stack Next.js application designed to manage and showcase academics, research initiatives, interactive workshops, course enrollments, and executive committee members of the ML & AI Lab.

---

## ✨ Features

* **🎓 Course & Workshop Management:** Browse and register for upcoming courses and interactive AI/ML workshops.
* **🔬 Research Repository:** Public directory of publications and cutting-edge lab research.
* **🛡️ Secure Authentication:** Custom-built robust authentication with protected routes and Role-Based Access Controls (RBAC).
* **⚙️ Comprehensive Admin Panel:** Mange users, courses, workshops, enrollments, and publications through a unified, access-restricted dashboard.
* **👨‍💼 Executive Profiles & Portfolios:** Showcases the lab's honorable directors, research teams, advisors, and administration members gracefully (using Framer Motion).
* **🌓 Design System:** A highly polished, custom dark aesthetic built natively with Tailwind CSS v4, `shadcn/ui` components, and Lucide Icons.

---

## 🛠 Tech Stack

* **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) & React 19
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
* **Database:** MongoDB & [Mongoose](https://mongoosejs.com/) (ODM)
* **Icons:** Lucide React
* **Backend logic:** Next.js Server Actions (`src/actions`) natively handling fast backend execution.

---

## 📁 Project Structure

* **`src/app/`**: Contains the Next.js App Router definitions map divided securely into `(main)` (public/standard layout) and `(auth)` (secure layout).
* **`src/components/`**: Deeply modular component architecture. Reusable primitives sit under `/ui/`, alongside feature-specific folders for `landing/`, `layouts/`, etc.
* **`src/models/`**: MongoDB schema blueprints (User, Course, Workshop, Enrollments, Publications).
* **`src/actions/`**: Server Actions removing the need for a traditional API layer resulting in faster DB transitions and mutations.
* **`src/lib/`**: Core shared utilities including cached DB connection pooling, mailing handlers, permissions maps, and custom authentication handling.
* **`src/constants/`**: Hardcoded statics and external image mapping properties.

---

## 🚀 Getting Started

### Prerequisites
* Node.js v18.17+ 
* An active [MongoDB](https://www.mongodb.com/) cluster instance.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/muhaiminulsadat/AI-ML-Research-Lab-Bangladesh.git
   cd ai-ml-lab
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or yarn, or pnpm
   ```

3. **Environment Setup:**
   Create a `.env.local` file at the root of the project and populate the following variables:
   ```env
   # MongoDB Database
   MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/dbname

   # Authentication Secrets (Replace or map your specific config params)
   # NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Launch Development Server:**
   ```bash
   npm run dev
   ```

5. Navigate to [http://localhost:3000](http://localhost:3000) using your browser of choice to view the application locally.

---

## 💡 Code Assumptions & Contribution Rules

* **Data-Fetching:** The system favors calling Server Components invoking straightforward MongoDB `.lean()` queries for robust passing without client-side hydration issues.
* **Client Overrides:** The `'use client'` directory header should only exist if `useState`/`useEffect` lifecycle methods or interactive client observations are absolutely necessary.
* **Styling Structure:** Class variants are managed seamlessly via `cva` inside UI primitives.
* **Navigation:** External links (portfolios/university sites) explicitly trigger HTML `<a>` tags configuring `target="_blank"`, avoiding `next/link` pre-fetching errors for non-app routing.
* **Asset Mapping:** Make sure new asset deployment paths (like Google Drive blobs) are declared as explicit hostnames in `next.config.mjs` image mappings to dodge component exceptions.

---

## 📄 License & Contact
*This project is maintained inherently for the ML & AI Research Lab operations. All academic materials, imagery, and user data remain internal.*
