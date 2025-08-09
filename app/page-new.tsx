'use client';
import { 
  Container, Typography, Box, Button, Card, CardContent, 
  useTheme, alpha, Fade, Zoom 
} from '@mui/material';
import { useRouter } from 'next/navigation';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PreviewIcon from '@mui/icons-material/Preview';
import FolderIcon from '@mui/icons-material/Folder';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const theme = useTheme();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const features = [
    {
      title: 'Create Forms',
      description: 'Build dynamic forms with drag & drop, validations, and derived fields',
      icon: <AddCircleOutlineIcon fontSize="large" />,
      path: '/create',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      delay: 100,
    },
    {
      title: 'Live Preview',
      description: 'Test and interact with your forms in real-time with validation',
      icon: <PreviewIcon fontSize="large" />,
      path: '/preview',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      delay: 200,
    },
    {
      title: 'Form Library',
      description: 'Organize and manage all your forms in one beautiful dashboard',
      icon: <FolderIcon fontSize="large" />,
      path: '/myforms',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      delay: 300,
    },
  ];

  const highlights = [
    {
      icon: <AutoAwesomeIcon />,
      title: 'Smart Fields',
      description: 'Derived fields with custom formulas'
    },
    {
      icon: <SpeedIcon />,
      title: 'Lightning Fast',
      description: 'Built with Next.js and TypeScript'
    },
    {
      icon: <SecurityIcon />,
      title: 'Validation Ready',
      description: 'Advanced validation rules built-in'
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Fade in={animate} timeout={800}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
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
            }}
          >
            Form Builder Pro
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            paragraph
            sx={{ 
              maxWidth: 600, 
              mx: 'auto',
              fontSize: '1.25rem',
              lineHeight: 1.6,
            }}
          >
            Create, customize, and deploy dynamic forms with advanced validation, 
            derived fields, and real-time preview capabilities
          </Typography>
          
          {/* Action Buttons */}
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => router.push('/create')}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                },
              }}
            >
              Start Building
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => router.push('/myforms')}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              View Gallery
            </Button>
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
                  width: { xs: '100%', sm: '320px' },
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    '& .gradient-bg': {
                      opacity: 0.1,
                    }
                  },
                  transition: 'all 0.3s ease-in-out',
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
                <CardContent sx={{ p: 4, position: 'relative' }}>
                  <Box 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 64,
                      height: 64,
                      borderRadius: 2,
                      background: feature.gradient,
                      color: 'white',
                      mb: 3,
                      mx: 'auto',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom textAlign="center" fontWeight={600}>
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
    </Container>
  );
}
