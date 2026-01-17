# ModernApp - Math Solutions Platform

A comprehensive mathematics learning platform built with Next.js 16, featuring file-based JSON storage and full CRUD operations.

## 🚀 Quick Start

```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture

- **Framework**: Next.js 16 with React 19
- **API**: Next.js API routes (serverless functions)
- **Storage**: File-based JSON storage (`data/items.json`)
- **Styling**: Tailwind CSS
- **Authentication**: Mock authentication system

## 📚 Features

- **Math Topics Management**: Full CRUD operations for math solutions
- **Categories**: Algebra, Calculus, Geometry, Statistics, Trigonometry, Number Theory, Logic
- **Difficulty Levels**: Beginner, Intermediate, Advanced, Expert
- **Authentication**: Simple login system (admin@example.com / 123456)
- **File Storage**: Persistent JSON-based data storage
- **Responsive Design**: Works on all devices
- **Loading States**: Beautiful loading spinners and animations

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/login` - Login with credentials

### Math Topics
- `GET /api/items` - Get all topics
- `GET /api/items/:id` - Get specific topic
- `POST /api/items` - Create new topic
- `PUT /api/items/:id` - Update topic
- `DELETE /api/items/:id` - Delete topic

### Health Check
- `GET /api/health` - API status check

## 📁 Project Structure

```
modernapp-nextjs/
├── src/
│   ├── app/
│   │   ├── api/               # Next.js API routes
│   │   │   ├── auth/login/    # Authentication endpoint
│   │   │   ├── items/         # CRUD endpoints
│   │   │   └── health/        # Health check
│   │   ├── items/             # Math topics pages
│   │   ├── login/             # Authentication page
│   │   └── ...                # Other pages
│   ├── components/            # Reusable UI components
│   └── lib/                   # Utilities and data management
├── data/                      # JSON data storage (auto-created)
│   └── items.json            # Math topics data
└── public/                   # Static assets
```

## 💾 Data Storage

The application uses file-based JSON storage:
- **Location**: `data/items.json`
- **Auto-creation**: Directory and file created automatically on first API call
- **Default Data**: 8 comprehensive math topics included
- **Persistence**: Data persists between server restarts

## 🔐 Authentication

Default credentials:
- **Email**: admin@example.com
- **Password**: 123456

## 🎨 Default Math Topics

The application comes with 8 pre-loaded math topics:
1. **Algebra Fundamentals** (Beginner)
2. **Calculus Mastery** (Advanced)
3. **Geometry Essentials** (Intermediate)
4. **Statistics & Probability** (Intermediate)
5. **Linear Algebra** (Advanced)
6. **Trigonometry Basics** (Intermediate)
7. **Number Theory** (Advanced)
8. **Mathematical Logic** (Advanced)

## 🚀 Deployment

### Vercel Deployment
```bash
npm run build
```
Deploy to Vercel with zero configuration.

**Note**: File-based storage works on Vercel but data may not persist between deployments. For production, consider using a database.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request