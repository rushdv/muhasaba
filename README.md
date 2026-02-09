# Muhasabah

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/Module-Ramadan_Planner-gold?style=for-the-badge" alt="Module">
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel" alt="Vercel">
</p>

> **Muhasabah** is an all-in-one Islamic personal hub designed for self-reflection, spiritual growth, and productivity. Built with a modern aesthetic and deep spiritual focus, it helps users track their religious obligations while striving for excellence (Ihsan).

---

## 🌟 Currently Active: Ramadan Planner 1447 AH

While the broader Muhasabah ecosystem is under active development, the **Ramadan Planner** module is fully operational to help you make the most of the blessed month.

### Key Features:
- 🕋 **Salat Tracker**: Monitor your Fardh and Sunnah prayers with a dedicated interface.
- 📖 **Quran Journey**: Log para, page, and ayat progress with space for personal reflections.
- ⚡ **Spiritual Energy**: Track your daily spiritual highs and lows.
- ✅ **Daily Sunnah Checklist**: Morning/Evening Adhkar, Zikr, Miswak, and more.
- 📝 **Soul’s Reflection**: A private digital journal for your daily spiritual progress.
- 📅 **30-Day Timeline**: Visualise your journey through the holy month.

---

## 🛠️ Tech Stack

### Frontend
- ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
- ![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-FF69B4?style=flat-square)

### Backend
- ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=flat-square&logo=fastapi&logoColor=white)
- ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)
- ![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F00?style=flat-square&logo=sqlalchemy&logoColor=white)

---

## 🚀 Future Roadmap

Muhasabah is evolving into a complete lifestyle suite. Upcoming modules include:

- 💰 **Halal Finance**: Portfolio tracking and Zakat calculator.
- 🍏 **Health & Fitness**: Sunnah-aligned nutrition and fasting schedules.
- 📈 **Habit Builder**: Long-term tracking for Adab and character building.
- 🤝 **Community Hub**: Shared goals and spiritual encouragement.

---

## 💻 Local Setup

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 3. Environment Variables
Create `.env` files in both `frontend/` and `backend/` as per the `.env.example` templates provided.

---

## 🔒 Authentication
The project uses **JWT-based authentication** and supports **Google OAuth 2.0** for a seamless sign-in experience.

---

## 📜 License
This project is licensed under the [MIT License](LICENSE).