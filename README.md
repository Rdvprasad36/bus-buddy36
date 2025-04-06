# Bus_Buddy
 
# Bus Buddy Locator 🚌📍

<div align="center">
  <img src="/logo.png" alt="Bus Buddy Logo" width="200"/>
  <h1>Bus Buddy Locator 🚌📍</h1>
</div>

A real-time bus tracking and location sharing application that helps users track buses and share their locations with others.

## Features ✨

- Real-time bus location tracking
- Live location sharing between users
- Interactive map interface
- Bus route information
- Estimated arrival times
- User-friendly mobile-responsive design

## Technology Stack 🛠️

- **Frontend**: 
  - React 18
  - TypeScript
  - Vite (Build Tool)
  - shadcn-ui (UI Components)
  - Tailwind CSS (Styling)
  
- **Mapping**:
  - Mapbox/Google Maps API *(configure in .env)*

- **State Management**:
  - React Context API
  - React Query

## Getting Started 🚀

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

### Installation
1. Clone the repository:
```bash
git clone https://github.com/your-repo/bus-buddy-locator.git
cd bus-buddy-locator
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```
Edit the `.env` file with your API keys and configuration.

### Running the App
- Development mode:
```bash
npm run dev
```
- Production build:
```bash
npm run build
npm run preview
```

## Configuration ⚙️

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```
VITE_MAP_API_KEY=your_map_provider_api_key
VITE_API_BASE_URL=https://api.your-backend.com
VITE_GOOGLE_ANALYTICS_ID=UA-XXXXX-Y
```

### Project Structure
```
bus-buddy-locator/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable components
│   ├── pages/         # Application pages
│   ├── hooks/         # Custom hooks
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── .env.example       # Environment variables template
├── vite.config.ts     # Build configuration
└── package.json       # Project dependencies
```

## Deployment 🚀

The application can be deployed to any static hosting service:

### Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

### Netlify
[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy)

### Manual Deployment
1. Build the application:
```bash
npm run build
```
2. Deploy the `dist` folder to your preferred hosting provider.

## Contributing 🤝

We welcome contributions! Please follow these steps:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support ❤️

For support or feature requests, please open an issue on our [GitHub repository](https://github.com/your-repo/bus-buddy-locator/issues).
