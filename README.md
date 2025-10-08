# 🚀 Portfolio Frontend (Next.js)

Live URL 👉 [https://porfolio-frontend-cw8s.vercel.app](https://porfolio-frontend-cw8s.vercel.app)

This is the **frontend of my personal portfolio application**, built with **Next.js**, featuring a modern UI, dynamic blog and project sections, and integration with a backend API for content management.

---

## ✨ Features

- 🏠 **Home Page** – Clean and responsive hero section with portfolio details.  
- 📝 **Blog Section** – View individual blogs dynamically with SEO-optimized metadata.  
- 💻 **Projects Showcase** – Displays real-time project data with thumbnails, GitHub, and live links.  
- 🔐 **Authentication Support** – Role-based UI (e.g., ADMIN can edit and delete projects).  
- ⚡ **Dynamic Routing** – Blog details page uses dynamic routes (`/blog/[id]`).  
- ♻️ **ISR (Incremental Static Regeneration)** – Improves performance with caching and revalidation.  
- 📱 **Responsive Design** – Optimized for mobile, tablet, and desktop devices.  
- 🪝 **State Management** – Uses Redux Toolkit for authentication and global state.  
- 🔥 **Modern UI Components** – Smooth interactions and clean design using Tailwind CSS.

---

## 🧰 Technology Stack

**Frontend Framework:**  
- [Next.js](https://nextjs.org/) 15  
- [React](https://react.dev/)  

**Styling:**  
- [Tailwind CSS](https://tailwindcss.com/)  

**State Management:**  
- [Redux Toolkit](https://redux-toolkit.js.org/)  
- RTK Query for data fetching and caching

**UI & Utility Libraries:**  
- `react-hot-toast` – beautiful toast notifications  
- `shadcn/ui` – clean UI components  
- `driver.js` – guided tours (optional)  

**Deployment:**  
- [Vercel](https://vercel.com) – for frontend hosting

---

## 🧭 Pages & Routes

| Route                | Description                                 |
|-----------------------|---------------------------------------------|
| `/`                   | Homepage                                   |
| `/blog`               | All blogs listing                          |
| `/blog/[id]`          | Single blog details page                   |
| `/dashboard`          | Admin panel (restricted)                   |
| `/project-edit/[id]`  | Edit project (ADMIN only)                  |

---

## ⚙️ Environment Variables (optional)

If your frontend connects to a backend API, create a `.env` file:

