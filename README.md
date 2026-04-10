# 🧠 Personal Knowledge Base Graph

A visual knowledge management tool built using **Next.js + React Flow** that allows users to create, connect, and manage ideas in a graph format.

🔗 **Live Demo**:  
https://personal-knowledge-base-graph-iota.vercel.app/

---

## ✨ Features

- 📌 Add, edit, and delete nodes (ideas)
- 🔗 Create relationships between nodes (edges)
- 📝 Edit title and description in a clean sidebar UI
- 💾 Persistent storage using localStorage
- 🎯 Preloaded seed data (first-time users)
- 🔄 Reset graph to initial state
- 🎨 Clean and minimal UI with smooth UX

---

## 🛠️ Tech Stack

- **Next.js 14**
- **React**
- **React Flow**
- **TypeScript**
- **CSS (Custom Styling)**

---

## 📂 Project Structure
/app
├── page.tsx # Main graph UI
├── layout.tsx # Root layout
├── globals.css # Global styles

/data
├── seed.ts # Initial nodes and edges


---

## ⚙️ How It Works

- On first load → Seed data is loaded
- After any change → Data is saved in `localStorage`
- On reload → Saved graph is restored
- Reset button → Clears localStorage and reloads seed data

---

## 🚀 Run Locally

```bash
npm install
npm run dev

Visit:
http://localhost:3000

🚀 Deployment

Deployed using Vercel

npm run build
📸 Demo Flow
Click + Add Node
Select node → Edit title & description
Connect nodes by dragging edges
Click edge → Delete connection
Use Reset to restore initial graph
🎯 Key Highlights
Fully client-side graph management
Clean state handling using React hooks
Dynamic UI updates without reload
Recruiter-friendly UI and interaction
👨‍💻 Author

Ashutosha Samal