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
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Container maxWidth="xl">
        <Fade in={animate} timeout={1200}>
          <Box 
            sx={{ 
              textAlign: 'center', 
              py: { xs: 8, md: 12 },
              position: 'relative',
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
                label="✨ AI-Powered Form Builder" 
                color="primary" 
                sx={{ 
                  mb: 4,
                  px: 3,
                  py: 1,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 1, transform: 'scale(1)' },
                    '50%': { opacity: 0.8, transform: 'scale(1.05)' },
                    '100%': { opacity: 1, transform: 'scale(1)' }
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
                  mb: 4,
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '6rem' },
                  lineHeight: 0.9,
                }}
              >
                Build Beautiful Forms
                <br />
                <Typography 
                  component="span" 
                  variant="h1"
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.error.main} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: 'inherit',
                    fontWeight: 'inherit'
                  }}
                >
                  in Minutes
                </Typography>
              </Typography>
              
              <Typography 
                variant="h5" 
                color="text.secondary" 
                paragraph
                sx={{ 
                  maxWidth: 800, 
                  mx: 'auto',
                  fontSize: { xs: '1.1rem', md: '1.4rem' },
                  lineHeight: 1.6,
                  mb: 6,
                  fontWeight: 400,
                }}
              >
                Create professional, responsive forms with AI assistance, advanced validation, 
                and real-time preview. No coding required – just describe what you need.
              </Typography>
              
              {/* Action Buttons */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 3, 
                  justifyContent: 'center', 
                  flexWrap: 'wrap',
                  mb: 8
                }}
              >
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
                    boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
                    textTransform: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.5)}`,
                    },
                  }}
                >
                  Start Building Free
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => router.push('/preview')}
                  sx={{
                    px: 6,
                    py: 2,
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    borderWidth: 2,
                    textTransform: 'none',
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    '&:hover': {
                      borderWidth: 2,
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Watch Demo
                </Button>
              </Box>

              {/* Stats Row */}
              <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
                {stats.map((stat, index) => (
                  <Grid item xs={6} sm={3} key={stat.label}>
                    <Zoom in={animate} timeout={800} style={{ transitionDelay: `${index * 200}ms` }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          mb: 1,
                          color: theme.palette.primary.main
                        }}>
                          {stat.icon}
                          <Typography variant="h3" fontWeight={800} sx={{ ml: 1 }}>
                            {stat.value}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                          {stat.label}
                        </Typography>
                      </Box>
                    </Zoom>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Fade>
      </Container>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: alpha(theme.palette.primary.main, 0.02) }}>
        <Container maxWidth="xl">
          <Fade in={animate} timeout={1000} style={{ transitionDelay: '200ms' }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="h2" fontWeight={700} gutterBottom>
                Everything You Need
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                Powerful features designed to make form building effortless and enjoyable
              </Typography>
            </Box>
          </Fade>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={feature.title}>
                <Zoom in={animate} timeout={800} style={{ transitionDelay: `${feature.delay}ms` }}>
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      borderRadius: 4,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      background: alpha(theme.palette.background.paper, 0.8),
                      backdropFilter: 'blur(20px)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.2)}`,
                        '& .feature-badge': {
                          transform: 'scale(1.1)',
                        },
                        '& .feature-icon': {
                          transform: 'scale(1.1) rotate(5deg)',
                        }
                      },
                    }}
                    onClick={() => router.push(feature.path)}
                  >
                    {/* Gradient Background */}
                    <Box
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
                            boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.3)}`,
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
                        fontWeight={700}
                        sx={{ 
                          mb: 2,
                          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" lineHeight={1.6}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Highlights Section */}
      <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
        <Fade in={animate} timeout={1200} style={{ transitionDelay: '400ms' }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" fontWeight={700} gutterBottom>
              Why Choose Form Builder Pro?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Advanced features that set us apart from the competition
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={4}>
          {highlights.map((highlight, index) => (
            <Grid item xs={12} md={6} lg={4} key={highlight.title}>
              <Zoom in={animate} timeout={800} style={{ transitionDelay: `${500 + index * 100}ms` }}>
                <Paper
                  sx={{
                    p: 4,
                    height: '100%',
                    textAlign: 'center',
                    borderRadius: 3,
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: `0 15px 40px ${alpha(highlight.color, 0.15)}`,
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: alpha(highlight.color, 0.1),
                      color: highlight.color,
                      mb: 3,
                    }}
                  >
                    {highlight.icon}
                  </Box>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    {highlight.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                    {highlight.description}
                  </Typography>
                </Paper>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: alpha(theme.palette.secondary.main, 0.02) }}>
        <Container maxWidth="lg">
          <Fade in={animate} timeout={1000} style={{ transitionDelay: '600ms' }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="h2" fontWeight={700} gutterBottom>
                Loved by Professionals
              </Typography>
              <Typography variant="h6" color="text.secondary">
                See what our users say about Form Builder Pro
              </Typography>
            </Box>
          </Fade>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={testimonial.name}>
                <Zoom in={animate} timeout={800} style={{ transitionDelay: `${700 + index * 150}ms` }}>
                  <Paper
                    sx={{
                      p: 4,
                      height: '100%',
                      borderRadius: 3,
                      position: 'relative',
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    }}
                  >
                    <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                    <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic', lineHeight: 1.7 }}>
                      "{testimonial.text}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role} at {testimonial.company}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Fade in={animate} timeout={1000} style={{ transitionDelay: '800ms' }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" fontWeight={700} gutterBottom>
              Simple, Transparent Pricing
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Everything you need to build amazing forms
            </Typography>
          </Box>
        </Fade>

        <Zoom in={animate} timeout={1000} style={{ transitionDelay: '900ms' }}>
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: 4,
              border: `2px solid ${theme.palette.primary.main}`,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Chip 
              label="🚀 Most Popular" 
              color="primary" 
              sx={{ 
                mb: 3,
                fontSize: '1rem',
                fontWeight: 600,
                px: 3,
                py: 1
              }} 
            />
            
            <Typography variant="h3" fontWeight={800} gutterBottom>
              Free Forever
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              All features included, no limits, no credit card required
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Grid container spacing={2}>
                {pricingFeatures.map((feature, index) => (
                  <Grid item xs={12} sm={6} key={feature}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleIcon color="primary" fontSize="small" />
                      <Typography variant="body1">{feature}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

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
                textTransform: 'none',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Get Started Now
            </Button>
          </Paper>
        </Zoom>
      </Container>

      {/* CTA Section */}
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 },
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Fade in={animate} timeout={1000} style={{ transitionDelay: '1000ms' }}>
            <Typography variant="h2" fontWeight={700} gutterBottom>
              Ready to Build Something Amazing?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of professionals who trust Form Builder Pro
            </Typography>
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
                backgroundColor: 'white',
                color: theme.palette.primary.main,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: alpha('white', 0.9),
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Start Building Today
            </Button>
          </Fade>
        </Container>
      </Box>
      
      {/* Form Builder Chatbot */}
      <FormBuilderChatbot />
    </Box>
  );
}
