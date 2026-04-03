# Smart Interview Preparation & Skill Evaluation Platform (Frontend Only)

A frontend-only web application for conducting online MCQ tests and skill evaluation with performance analytics using localStorage.

## ✅ FEATURES

### 🔐 1. User Authentication System
- Student and Admin registration/login
- LocalStorage-based authentication
- Protected routes
- Role-based access control

### 🧠 2. Online MCQ Test Module
- Topic-wise tests: DSA, OS, DBMS, CN, Aptitude
- 10 questions per test with 10-minute timer
- Random question selection
- Auto-submit when time expires
- Question navigator

### ✅ 3. Auto Evaluation System
- Automatic answer comparison
- Real-time score calculation
- Percentage calculation
- Results stored in localStorage

### 📊 4. Performance Analytics Dashboard
- Score history with charts
- Topic-wise performance analysis
- Weakness detection (topics with <60% average)
- Progress tracking over time
- Interactive charts using Chart.js

### 👨💻 5. Admin Panel
- Add/Edit/Delete MCQ questions
- Manage question categories
- View all student results
- Question difficulty levels

## Tech Stack

**Frontend:**
- React 18 with Vite
- React Router for navigation
- Chart.js for analytics
- LocalStorage for data persistence
- Modern CSS styling

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to frontend directory:
```bash
cd frontend/vite-project
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend runs on http://localhost:5173

## Usage Guide

### For Students:
1. Register with role "student"
2. Login to access dashboard
3. View performance analytics
4. Take topic-wise tests
5. View results and progress

### For Admins:
1. Register with role "admin"
2. Login to access admin panel
3. Add/Edit/Delete questions
4. View all student results
5. Manage question categories

## Sample Test Data

The system includes 10 questions for each category:
- **DSA**: Data structures, algorithms, complexity
- **OS**: Process management, scheduling, deadlocks
- **DBMS**: Normalization, ACID properties, SQL
- **CN**: OSI model, protocols, networking
- **Aptitude**: Mathematical reasoning, percentages

## Data Storage

All data is stored in browser's localStorage:
- Users data
- Questions database
- Test results
- Performance analytics

## Running the Application

1. Run frontend: `cd frontend/vite-project && npm run dev`
2. Access application at http://localhost:5173
3. Register as student or admin to start

This platform provides a complete frontend solution for interview preparation without requiring a backend server.
