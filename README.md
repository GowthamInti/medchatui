# Medical Chat Assistant Frontend

A modern, production-ready React application for medical consultation chat interface built with cutting-edge technologies and best practices.

## 🚀 Features

- **Modern React Architecture**: Built with React 18, React Router, and Context API
- **Beautiful UI**: Styled with Tailwind CSS and Lucide React icons
- **Authentication**: Complete auth flow with login/register and protected routes
- **Real-time Chat**: Interactive chat interface with typing indicators and message history
- **Responsive Design**: Mobile-first design that works on all devices
- **PWA Ready**: Progressive Web App with offline support and push notifications
- **Production Optimized**: Code splitting, lazy loading, and performance optimizations
- **Comprehensive Testing**: Jest and React Testing Library setup with coverage reports
- **Docker Ready**: Multi-stage Docker build for production deployment
- **Error Handling**: Robust error handling with user-friendly messages
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🛠️ Technology Stack

- **Frontend**: React 18, React Router 6, Context API
- **Styling**: Tailwind CSS, custom CSS utilities
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Testing**: Jest, React Testing Library
- **Linting**: ESLint, Prettier
- **Type Safety**: PropTypes (ready for TypeScript)
- **PWA**: Service Worker, Web App Manifest
- **Deployment**: Docker, Nginx

## 📋 Prerequisites

- Node.js 18+ and npm 8+
- Docker and Docker Compose (for containerized deployment)
- Git

## 🚀 Quick Start

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd medchatui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   Navigate to http://localhost:3000
   ```

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview production build**
   ```bash
   npm run preview
   ```

## 🐳 Docker Deployment

### Single Container

1. **Build Docker image**
   ```bash
   docker build -t medchatui .
   ```

2. **Run container**
   ```bash
   docker run -p 3000:3000 medchatui
   ```

### Full Stack with Docker Compose

1. **Start all services**
   ```bash
   docker-compose up -d
   ```

2. **View logs**
   ```bash
   docker-compose logs -f frontend
   ```

3. **Stop services**
   ```bash
   docker-compose down
   ```

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure
```
src/
  components/
    __tests__/
      Login.test.js
      Chat.test.js
  test/
    setup.js
    __mocks__/
```

## 🎨 Code Quality

### Linting and Formatting
```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Check Prettier formatting
npm run check-format

# Format code with Prettier
npm run format
```

### Pre-commit Hooks
The project uses Husky and lint-staged for pre-commit hooks to ensure code quality.

## 📁 Project Structure

```
medchatui/
├── public/                 # Static assets
│   ├── icons/             # PWA icons
│   ├── manifest.json      # PWA manifest
│   └── sw.js              # Service worker
├── src/                   # Source code
│   ├── api/               # API services
│   ├── auth/              # Authentication
│   ├── components/        # React components
│   ├── utils/             # Utility functions
│   ├── test/              # Test configuration
│   ├── App.js             # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── docker-compose.yml     # Docker compose config
├── Dockerfile             # Docker configuration
├── nginx.conf             # Nginx configuration
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
├── jest.config.js         # Jest configuration
└── package.json           # Dependencies and scripts
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:8000/api` |
| `VITE_APP_NAME` | Application name | `Medical Chat Assistant` |
| `VITE_ENABLE_ANALYTICS` | Enable analytics | `false` |
| `VITE_ENABLE_PWA` | Enable PWA features | `true` |

### Vite Configuration
The Vite configuration includes:
- React plugin setup
- Development server with API proxy
- Production optimizations
- Code splitting configuration

### Tailwind Configuration
Custom Tailwind setup with:
- Extended color palette
- Custom animations
- Utility classes for common patterns
- Responsive design tokens

## 🚀 Deployment

### Production Checklist

- [ ] Update environment variables for production
- [ ] Build and test the application
- [ ] Set up SSL certificates
- [ ] Configure domain and DNS
- [ ] Set up monitoring and logging
- [ ] Test error handling and fallbacks
- [ ] Verify PWA functionality
- [ ] Test on different devices and browsers

### Hosting Options

1. **Docker Container**
   - Deploy to any cloud provider
   - Scale horizontally with load balancers
   - Use with Kubernetes for orchestration

2. **Static Hosting**
   - Build with `npm run build`
   - Deploy `dist` folder to CDN
   - Configure redirects for SPA routing

3. **Nginx Server**
   - Use provided nginx configuration
   - Enable HTTPS with SSL certificates
   - Configure caching and compression

## 🔍 Monitoring and Analytics

### Performance Monitoring
- Web Vitals integration
- Error boundary reporting
- Network request monitoring

### Error Reporting
- Global error handler
- User-friendly error messages
- Development vs production logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Coding Standards

- Use functional components with hooks
- Follow React best practices
- Write comprehensive tests
- Use semantic commit messages
- Maintain accessibility standards

## 📚 API Integration

The frontend expects a REST API with the following endpoints:

- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `GET /api/chat/history` - Get chat history
- `POST /api/chat/message` - Send chat message
- `GET /api/grammar/rules` - Get grammar rules
- `POST /api/grammar/rules` - Create grammar rule

## 🔒 Security

### Security Features
- Content Security Policy (CSP)
- XSS protection headers
- CSRF protection
- Secure authentication tokens
- Input validation and sanitization

### Security Headers
The nginx configuration includes security headers:
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy

## 📱 PWA Features

- **Offline Support**: Service worker caches resources
- **App-like Experience**: Installable on mobile devices
- **Push Notifications**: Real-time notification support
- **Background Sync**: Sync data when connection is restored

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify environment variables

2. **API Connection Issues**
   - Check VITE_API_BASE_URL configuration
   - Verify backend is running
   - Check CORS settings

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for CSS conflicts
   - Verify PostCSS configuration

### Debug Mode
```bash
# Enable verbose logging
DEBUG=* npm run dev

# Run with source maps
npm run build -- --sourcemap
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icon set
- Vite for the fast build tool

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the troubleshooting guide

---

Built with ❤️ for better healthcare communication 
