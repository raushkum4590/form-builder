'use client';
import { 
  Container, Typography, Box, Button, Card, CardContent, 
  useTheme, alpha, Fade, Zoom, Chip, IconButton, Grid,
  Avatar, Rating, Divider, Paper
} from '@mui/material';
import { useRouter } from 'next/navigation';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PreviewIcon from '@mui/icons-material/Preview';
import FolderIcon from '@mui/icons-material/Folder';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import CodeIcon from '@mui/icons-material/Code';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import CloudIcon from '@mui/icons-material/Cloud';
import PaletteIcon from '@mui/icons-material/Palette';
import { useState, useEffect } from 'react';
import FormBuilderChatbot from '../components/FormBuilderChatbot';

export default function Home() {
  const router = useRouter();
  const theme = useTheme();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const features = [
    {
      title: 'AI-Powered Form Builder',
      description: 'Create sophisticated forms with AI assistance, drag & drop interface, and smart validation',
      icon: <AddCircleOutlineIcon fontSize="large" />,
      path: '/form-builder',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      delay: 100,
      badge: 'AI Powered'
    },
    {
      title: 'Real-Time Preview',
      description: 'Test and interact with your forms instantly with live preview and validation feedback',
      icon: <PreviewIcon fontSize="large" />,
      path: '/preview',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      delay: 200,
      badge: 'Live Preview'
    },
    {
      title: 'Smart Dashboard',
      description: 'Organize, manage, and analyze all your forms in one beautiful, intuitive dashboard',
      icon: <FolderIcon fontSize="large" />,
      path: '/myforms',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      delay: 300,
      badge: 'Pro Dashboard'
    },
  ];

  const stats = [
    { label: 'Forms Created', value: '50K+', icon: <RocketLaunchIcon /> },
    { label: 'Happy Users', value: '10K+', icon: <PersonIcon /> },
    { label: 'Uptime', value: '99.9%', icon: <SpeedIcon /> },
    { label: 'User Rating', value: '4.9★', icon: <StarIcon /> },
  ];

  const highlights = [
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: 40 }} />,
      title: 'AI-Powered Generation',
      description: 'Generate complete forms instantly using our advanced AI assistant with natural language processing',
      color: '#FF6B6B'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'Lightning Performance',
      description: 'Built with Next.js 14 and optimized for maximum speed with server-side rendering',
      color: '#4ECDC4'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Enterprise Security',
      description: 'Advanced validation, data encryption, and compliance with industry security standards',
      color: '#45B7D1'
    },
    {
      icon: <MobileScreenShareIcon sx={{ fontSize: 40 }} />,
      title: 'Mobile-First Design',
      description: 'Responsive forms that work flawlessly across all devices and screen sizes',
      color: '#96CEB4'
    },
    {
      icon: <CloudIcon sx={{ fontSize: 40 }} />,
      title: 'Cloud Native',
      description: 'Deploy anywhere with our scalable, cloud-ready architecture and global CDN',
      color: '#FFEAA7'
    },
    {
      icon: <PaletteIcon sx={{ fontSize: 40 }} />,
      title: 'Beautiful Interface',
      description: 'Stunning modern UI with customizable themes and smooth animations',
      color: '#DDA0DD'
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Product Manager',
      company: 'TechFlow Solutions',
      avatar: 'S',
      rating: 5,
      text: 'Form Builder Pro transformed our data collection process. The AI assistant alone saved us 20+ hours per week!'
    },
    {
      name: 'David Chen',
      role: 'Lead Developer',
      company: 'InnovateLab',
      avatar: 'D',
      rating: 5,
      text: 'The most intuitive form builder I\'ve used. Derived fields and real-time validation are absolutely game-changing.'
    },
    {
      name: 'Maria Rodriguez',
      role: 'UX Designer',
      company: 'Creative Studio',
      avatar: 'M',
      rating: 5,
      text: 'Our clients love the beautiful, responsive forms. The preview feature makes iteration so much faster!'
    },
  ];

  const pricingFeatures = [
    'Unlimited Form Creation',
    'AI-Powered Generation',
    'Real-time Live Preview',
    'Advanced Validation Rules',
    'Calculated Derived Fields',
    'Mobile-Responsive Design',
    'Cloud Deployment Ready',
    'Priority Support 24/7'
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Fade in={animate} timeout={1200}>
        <Box 
          sx={{ 
            textAlign: 'center', 
            mb: 8,
            position: 'relative',
            py: 8,
            px: 4,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
            borderRadius: 4,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(ellipse at center, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
              pointerEvents: 'none',
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Chip 
              label="✨ New & Improved" 
              color="primary" 
              sx={{ 
                mb: 3,
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.7 },
                  '100%': { opacity: 1 }
                }
              }} 
            />
            
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                mb: 3,
                fontWeight: 900,
                letterSpacing: '-0.02em',
                fontSize: { xs: '3rem', md: '4rem', lg: '5rem' },
                textShadow: `0 0 60px ${alpha(theme.palette.primary.main, 0.5)}`,
              }}
            >
              Form Builder Pro
            </Typography>
            
            <Typography 
              variant="h6" 
              color="text.secondary" 
              paragraph
              sx={{ 
                maxWidth: 700, 
                mx: 'auto',
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                lineHeight: 1.8,
                mb: 4,
                fontWeight: 400,
              }}
            >
              Create, customize, and deploy dynamic forms with advanced validation, 
              derived fields, and real-time preview capabilities. Experience the future of form building.
            </Typography>
            
            {/* Stats Row */}
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: 4, 
                mb: 6,
                flexWrap: 'wrap'
              }}
            >
              {stats.map((stat, index) => (
                <Zoom key={stat.label} in={animate} timeout={800} style={{ transitionDelay: `${index * 200}ms` }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                      {stat.icon}
                      <Typography variant="h4" fontWeight={700} sx={{ ml: 1, color: theme.palette.primary.main }}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Zoom>
              ))}
            </Box>
            
            {/* Action Buttons */}
            <Box sx={{ mt: 4, display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<RocketLaunchIcon />}
                onClick={() => router.push('/form-builder')}
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
                  textTransform: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.common.white, 0.3)}, transparent)`,
                    transition: 'left 0.6s',
                  },
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: `0 12px 48px ${alpha(theme.palette.primary.main, 0.6)}`,
                    '&:before': {
                      left: '100%',
                    },
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                Get Started
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                startIcon={<FolderIcon />}
                onClick={() => router.push('/myforms')}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  borderWidth: 2,
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  textTransform: 'none',
                  '&:hover': {
                    borderWidth: 2,
                    borderColor: theme.palette.secondary.main,
                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                    color: theme.palette.secondary.main,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                View Gallery
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>

      {/* Features Grid */}
      <Box sx={{ mb: 8 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
          {features.map((feature, index) => (
            <Zoom 
              key={feature.title}
              in={animate} 
              timeout={1000}
              style={{ transitionDelay: `${feature.delay}ms` }}
            >
              <Card 
                sx={{ 
                  width: { xs: '100%', sm: '350px' },
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  borderRadius: 3,
                  boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    boxShadow: `0 20px 60px ${alpha(theme.palette.common.black, 0.2)}`,
                    '& .gradient-bg': {
                      opacity: 0.15,
                    },
                    '& .feature-icon': {
                      transform: 'scale(1.1) rotate(5deg)',
                      color: theme.palette.secondary.main,
                    },
                    '& .feature-badge': {
                      transform: 'scale(1.05)',
                      opacity: 1,
                    }
                  },
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onClick={() => router.push(feature.path)}
              >
                <Box
                  className="gradient-bg"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: feature.gradient,
                    opacity: 0.05,
                    transition: 'opacity 0.3s ease',
                  }}
                />
                <CardContent sx={{ p: 5, position: 'relative', textAlign: 'center' }}>
                  <Box sx={{ position: 'relative', mb: 3 }}>
                    <Chip 
                      label={feature.badge}
                      className="feature-badge"
                      size="small"
                      color="primary"
                      sx={{ 
                        position: 'absolute',
                        top: -10,
                        right: -10,
                        opacity: 0.8,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        transition: 'all 0.3s ease',
                      }}
                    />
                    <Box 
                      className="feature-icon"
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 80,
                        height: 80,
                        borderRadius: 3,
                        background: feature.gradient,
                        color: 'white',
                        mx: 'auto',
                        boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      {feature.icon}
                    </Box>
                  </Box>
                  
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    gutterBottom 
                    textAlign="center" 
                    fontWeight={700}
                    sx={{ 
                      mb: 2,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" textAlign="center" lineHeight={1.6}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Zoom>
          ))}
        </Box>
      </Box>

      {/* Highlights Section */}
      <Fade in={animate} timeout={1200} style={{ transitionDelay: '400ms' }}>
        <Box 
          sx={{ 
            textAlign: 'center',
            py: 6,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
            borderRadius: 4,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight={600} mb={4}>
            Why Choose Form Builder Pro?
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
            {highlights.map((highlight, index) => (
              <Box key={index} sx={{ maxWidth: 280, textAlign: 'center' }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    mb: 2,
                  }}
                >
                  {highlight.icon}
                </Box>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  {highlight.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {highlight.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Fade>
      
      {/* Form Builder Chatbot */}
      <FormBuilderChatbot />
    </Container>
  );
}
