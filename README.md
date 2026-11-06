# CodeSage AI

**Understand your code. Find bugs. Write better software.**

CodeSage AI is a production-ready, AI-powered code review application that provides comprehensive analysis of source code to identify bugs, security vulnerabilities, performance issues, and code quality concerns.

![CodeSage AI](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)
![OpenAI](https://img.shields.io/badge/OpenAI-API-green?style=flat&logo=openai)

## Features

### Core Functionality
- 🔍 **Real-time AI Code Review** - Get instant, streaming feedback on your code
- 🐛 **Bug Detection** - Identify logical errors and potential runtime issues
- 🔒 **Security Audit** - Detect vulnerabilities and security risks
- ⚡ **Performance Analysis** - Optimize bottlenecks and improve efficiency
- ✨ **Code Quality** - Improve readability, maintainability, and best practices

### Technical Features
- 🚀 **Real Streaming AI** - Genuine OpenAI API integration with streaming responses
- 🎨 **Premium Dark UI** - Professional developer-focused interface
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🔐 **Secure Backend** - API keys never exposed to the client
- ✅ **Input Validation** - Both client-side and server-side validation
- 🎯 **Multiple Languages** - Supports 14+ programming languages
- 💾 **Copy Results** - Easy copy-to-clipboard functionality
- 🔄 **Cancellable Reviews** - Stop reviews in progress

## Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5.7** - Type-safe development
- **Tailwind CSS 3.4** - Utility-first styling
- **Lucide React** - Beautiful icon system

### Backend
- **Next.js Route Handlers** - Serverless API endpoints
- **OpenAI SDK** - Real AI integration
- **Streaming HTTP** - Progressive response delivery

### Deployment
- **Vercel** - Production hosting
- **GitHub** - Version control

## Installation

### Prerequisites
- Node.js 18+ and npm
- OpenAI API key (get one at https://platform.openai.com/api-keys)

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/codesage-ai.git
cd codesage-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```bash
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

Available models:
- `gpt-4o-mini` - Fast and cost-effective (recommended)
- `gpt-4o` - Most capable
- `gpt-4-turbo` - Balanced performance

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Basic Code Review

1. **Paste your code** in the code editor
2. **Select programming language** from the dropdown
3. **Choose review type**:
   - Complete Review - Comprehensive analysis
   - Bug Detection - Focus on errors
   - Security Audit - Security vulnerabilities
   - Performance Analysis - Optimization opportunities
   - Code Quality - Best practices
4. **Add context** (optional) - Describe what the code should do
5. **Click "Review Code"** - Watch results stream in real-time

### Example

Try the built-in example by clicking "Load Example Code" - a JavaScript function with a deliberate off-by-one error that CodeSage AI will identify.

## API Documentation

### POST /api/review

Analyzes code and returns streaming AI review.

**Request Body:**
```json
{
  "code": "function example() { ... }",
  "language": "javascript",
  "reviewType": "complete",
  "context": "Optional description"
}
```

**Response:**
- Streaming text/plain response
- Progressive content delivery
- UTF-8 encoded

**Error Responses:**
- `400` - Validation error
- `429` - Rate limit exceeded
- `500` - Server/API error

## Project Structure

```
codesage-ai/
├── app/
│   ├── api/
│   │   └── review/
│   │       └── route.ts          # OpenAI streaming API endpoint
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Main page
│   └── globals.css                # Global styles
├── components/
│   ├── Header.tsx                 # Navigation header
│   ├── ReviewWorkspace.tsx        # Main workspace container
│   ├── CodeEditor.tsx             # Code input component
│   ├── LanguageSelector.tsx       # Language picker
│   ├── ReviewTypeSelector.tsx     # Review type picker
│   ├── ReviewResults.tsx          # Results display
│   ├── LoadingState.tsx           # Loading indicator
│   └── ErrorState.tsx             # Error display
├── lib/
│   ├── validation.ts              # Input validation
│   ├── prompts.ts                 # AI prompt construction
│   └── utils.ts                   # Utility functions
├── types/
│   └── review.ts                  # TypeScript types
├── .env.example                   # Environment template
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Building for Production

```bash
# Create production build
npm run build

# Test production build locally
npm start
```

## Deployment to Vercel

### Via Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Add environment variables**
```bash
vercel env add OPENAI_API_KEY
vercel env add OPENAI_MODEL
```

4. **Deploy to production**
```bash
vercel --prod
```

### Via GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in project settings
5. Deploy automatically on every push

## Security Considerations

### Implemented Security Measures
- ✅ API keys stored server-side only
- ✅ Environment variables never exposed to client
- ✅ Server-side request validation
- ✅ Input sanitization and size limits
- ✅ Safe error messages (no internal details)
- ✅ Secure HTTP headers
- ✅ No unsafe HTML rendering
- ✅ Request cancellation support

### Best Practices
- Never commit `.env` files
- Rotate API keys regularly
- Monitor API usage and costs
- Set up rate limiting in production
- Review OpenAI usage policies

## Testing

### Manual Testing Checklist

**Frontend:**
- [ ] Application loads successfully
- [ ] Responsive design works on mobile
- [ ] All form inputs are functional
- [ ] Validation errors display correctly
- [ ] Example code loads properly

**Backend:**
- [ ] API accepts valid requests
- [ ] API rejects invalid requests
- [ ] Streaming works correctly
- [ ] Error handling is graceful
- [ ] API keys are secure

**Integration:**
- [ ] End-to-end code review works
- [ ] Streaming displays progressively
- [ ] Copy functionality works
- [ ] Cancel review works
- [ ] Retry after error works

### Test Commands

```bash
# Run linter
npm run lint

# Build test
npm run build

# Type check
npx tsc --noEmit
```

## Troubleshooting

### Common Issues

**"API service is not properly configured"**
- Ensure `OPENAI_API_KEY` is set in `.env.local`
- Verify the API key is valid

**"API rate limit reached"**
- Wait a few moments and try again
- Check your OpenAI account usage limits

**"Unable to connect to the AI service"**
- Check your internet connection
- Verify OpenAI API status
- Check for any firewall restrictions

**Build errors**
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Verify Node.js version is 18+

## Performance

### Optimization Features
- Streaming responses for faster perceived performance
- Efficient React component rendering
- Minimal bundle size
- Edge runtime compatible
- Progressive content loading

### Cost Optimization
- Uses `gpt-4o-mini` by default (cost-effective)
- Reasonable token limits (4000 max_tokens)
- No unnecessary API calls
- Efficient prompt engineering

## Contributing

This is a complete, production-ready application. If you'd like to extend it:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for any purpose.

## Support

For issues or questions:
- Review this README
- Check the troubleshooting section
- Open a GitHub issue
- Review OpenAI documentation

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [OpenAI](https://openai.com/)
- Icons by [Lucide](https://lucide.dev/)
- Hosted on [Vercel](https://vercel.com/)

---

**Built with ❤️ for developers who care about code quality**