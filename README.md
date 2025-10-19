# 🏢 Companies Directory Web App

A **responsive and dynamic web application** built using **React**, **Tailwind CSS**, and **Supabase**, designed to display, search, filter, and manage a list of companies.  
Users can easily switch between grid and table views, apply filters, and browse through companies using pagination or infinite scrolling.

---

## 🚀 Features

- 🔍 **Search Functionality** – Instantly search companies by name.  
- 🏭 **Filter Controls** – Filter companies by **industry**, **location**, or **employee size**.  
- 🧭 **View Toggle** – Switch between **Grid View** and **Table View** layouts.  
- 🔄 **Pagination & Infinite Scroll** – Browse through company data seamlessly.  
- ⚡ **Dynamic Data Fetching** – Integrated with **Supabase** backend for real-time updates.   
- 🧩 **Modular Components** – Reusable and clean component-based structure.  
- 🎨 **Tailwind Styling** – Fully responsive design with modern UI.  
- ⚠️ **Error & Loading States** – User-friendly feedback during data fetching.

---

## ⚙️ Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend | React.js |
| Styling | Tailwind CSS |
| Backend | Supabase |
| Icons | Lucide React |
| Animations | Framer Motion |
| State Management | React Hooks (`useState`, `useEffect`, `useMemo`) |

---

## 📦 Installation & Setup

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/companies-directory.git

2️⃣ Navigate to the Project Folder
cd companies-directory

3️⃣ Install Dependencies
npm install

4️⃣ Create a Supabase Project

Go to Supabase

Create a new project and note your API URL and anon key.

Add a table named companies with columns:

id, name, industry, location, employees, logo, etc.

5️⃣ Configure Environment Variables

Create a .env file in the root folder and add:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_anon_key

6️⃣ Start the Development Server
npm run dev


Visit http://localhost:5173 to view the app.

🧠 Key Components Explained

App.jsx:
Core logic file — manages data fetching, filters, sorting, pagination, and view toggling.

companyService.js:
Handles all Supabase API calls such as fetching company data and unique filters.

FilterControls.jsx:
Manages all dropdown filters and the search bar.

CompanyGrid & CompanyTable:
Two display formats for showing company data with responsive layouts.

Pagination & Infinite Scroll:
Support multiple navigation methods for large datasets.


Render Link

https://companies-directory-ly3z.onrender.com/
