# Ticket Management System

A modern, React-based ticket management system with real-time analytics and AI-powered support assistance.

![Ticket Management System](https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=2000)

## Live Demo
🌐 [Visit the Live Application](https://ticket-system-portfolio-2025.nn.r.appspot.com/)

## Features

- 🎫 Comprehensive ticket tracking and management
- 🤖 AI-powered support assistance using Deep Seek Chat API
- 📊 Real-time analytics and performance monitoring
- 🔄 Priority queue management
- 📱 Multi-channel support (email, phone)
- 📈 Resolution time tracking
- 📋 Activity pattern analysis

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Express.js
- **AI Integration**: Deep Seek Chat API
- **Cloud Platform**: Google Cloud Platform (App Engine)
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Google Cloud SDK (for deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MikeDominic92/New-ticket-system.git
cd New-ticket-system
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Add your API keys to `.env`:
```env
DEEPSEEK_API_KEY=your_api_key
DEEPSEEK_API_ENDPOINT=your_endpoint
```

### Development

Run the development server:
```bash
npm run dev
```

### Production Build

Build the project:
```bash
npm run build
```

## Deployment

The application is automatically deployed to Google Cloud Platform using GitHub Actions when changes are pushed to the Main branch.

Visit the deployed application at: [https://ticket-system-portfolio-2025.nn.r.appspot.com/](https://ticket-system-portfolio-2025.nn.r.appspot.com/)

## Documentation

- [Technical Guide](./docs/TECHNICAL_GUIDE.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Contributing](./docs/CONTRIBUTING.md)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React and TypeScript
- Styled with Tailwind CSS
- Icons provided by Lucide React
- Developed with Vite
