# GoalMineAI Frontend

A React-based web application that helps users create personalized learning plans using AI.

## Features

- 🎯 AI-powered goal planning
- 📅 Interactive calendar view
- 🕒 Customizable time scheduling
- 📱 Responsive design
- 🔒 Secure authentication with Firebase
- 📄 PDF export functionality

## Tech Stack

- React 19
- Vite
- TailwindCSS
- Firebase Authentication
- React Router DOM

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/GoalMineAI.git
cd GoalMineAI/GoalMineFrontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
```

4. Start the development server:

```bash
npm run dev
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React context providers
├── pages/              # Page components
├── assets/            # Static assets
└── App.jsx            # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
