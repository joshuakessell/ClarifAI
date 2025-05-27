# Clarif-AI 🤖📰

**AI-Powered Unbiased News Analysis Platform**

Clarif-AI delivers factually verified, bias-neutral news analysis using advanced artificial intelligence to provide multi-perspective reporting on the topics that matter most to you.

## 🌟 Features

### 🎯 Core Functionality
- **Multi-Perspective Analysis**: View news events from left, center, and right political viewpoints
- **AI-Powered Bias Detection**: Advanced algorithms identify and neutralize editorial bias
- **Factual Verification**: Cross-reference information across multiple reliable sources
- **Real-Time News Aggregation**: Fresh content from trusted news sources worldwide
- **Topic-Based Organization**: Curated categories including Politics, Technology, Business, Health, Science, Climate, and Entertainment

### 🔍 Deep Research Feature
- **External Article Analysis**: Submit any article or social media post for comprehensive analysis
- **Interactive Follow-Up Questions**: AI-guided clarification for deeper insights
- **Progress Tracking**: Real-time updates with estimated completion times
- **Saved Research Reports**: Access your analysis history anytime
- **Multi-Source Validation**: Comprehensive fact-checking across multiple databases

### 👤 User Experience
- **Guest Access**: Explore the platform without registration
- **Personalized Feeds**: Customize news topics based on your interests
- **Clean, Modern Interface**: Intuitive design with smooth animations
- **Mobile-Responsive**: Seamless experience across all devices
- **Dark/Light Mode Support**: Comfortable reading in any environment

### 🛡️ Trust & Transparency
- **Source Attribution**: Clear citations for all news content
- **Confidence Scoring**: AI confidence levels for each analysis
- **Methodology Transparency**: Open about our bias detection processes
- **Privacy-First**: User data protection and GDPR compliance

## 🚀 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Wouter** for routing
- **TanStack Query** for state management
- **Framer Motion** for animations
- **Shadcn/UI** component library

### Backend
- **Node.js** with Express
- **PostgreSQL** database
- **Drizzle ORM** for database operations
- **Passport.js** for authentication
- **OpenAI API** for AI analysis
- **NewsData.io API** for news content

### Key Features Implementation
- **Real-time News Processing**: Automated content ingestion and analysis
- **Multi-perspective Analysis Engine**: AI-powered viewpoint generation
- **Bias Detection Algorithms**: Machine learning models for editorial analysis
- **Fact-checking Integration**: Cross-referencing with multiple verification sources
- **Research Request System**: Asynchronous processing for deep analysis

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- OpenAI API key
- NewsData.io API key

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/clarif-ai.git
   cd clarif-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Configure the following variables:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/clarifai
   SESSION_SECRET=your-session-secret
   OPENAI_API_KEY=your-openai-api-key
   NEWS_DATA_API_KEY=your-newsdata-api-key
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🎮 Usage

### For General Users
1. **Visit the platform** - Access Clarif-AI through your web browser
2. **Choose your experience**:
   - **Continue as Guest** - Explore without registration
   - **Create Account** - Save preferences and access research features
3. **Browse Topics** - Select from curated news categories
4. **View Multi-Perspective Analysis** - See left/center/right viewpoints on stories
5. **Submit Research Requests** - Analyze external articles for bias and accuracy

### For Authenticated Users
- **Personalize Feed** - Select topics of interest
- **Save Articles** - Bookmark important stories
- **Access Research Dashboard** - Track your analysis requests
- **Manage Preferences** - Customize your experience

## 🔄 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/user` - Get current user

### News & Analysis
- `GET /api/news` - Fetch news articles
- `GET /api/news/:id` - Get specific article
- `GET /api/analysis/:articleId` - Get bias analysis
- `GET /api/topics` - List all topics

### Research Features
- `POST /api/research` - Submit research request
- `GET /api/research` - Get user's research history
- `GET /api/research/:id` - Get specific research result

## 🤝 Contributing

We welcome contributions to make Clarif-AI even better! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Areas for Contribution
- Additional news source integrations
- Enhanced bias detection algorithms
- UI/UX improvements
- Performance optimizations
- Documentation improvements

## 📊 Roadmap

### Upcoming Features
- [ ] **Mobile App** - Native iOS and Android applications
- [ ] **RSS Feeds** - Custom feeds based on user preferences
- [ ] **Social Sharing** - Share analysis with social media integration
- [ ] **API Access** - Public API for developers
- [ ] **Advanced Analytics** - Detailed bias and sentiment tracking
- [ ] **Multilingual Support** - Analysis in multiple languages
- [ ] **Browser Extension** - Real-time analysis while browsing

### Long-term Goals
- **Global Expansion** - Support for international news sources
- **AI Model Improvements** - More sophisticated bias detection
- **Community Features** - User discussions and fact-checking
- **Educational Tools** - Media literacy resources

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Documentation**: [docs.clarif-ai.com](https://docs.clarif-ai.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/clarif-ai/issues)
- **Contact**: support@clarif-ai.com

## 🙏 Acknowledgments

- **OpenAI** for providing advanced AI capabilities
- **NewsData.io** for reliable news content
- **Open Source Community** for the amazing tools and libraries
- **Our Users** for valuable feedback and support

---

**Built with ❤️ by the Clarif-AI Team**

*Empowering informed decision-making through intelligent, unbiased news analysis.*