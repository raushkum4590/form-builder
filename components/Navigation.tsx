'use client';
import React from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Box, IconButton, 
  useTheme, alpha, Chip 
} from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import BuildIcon from '@mui/icons-material/Build';
import HomeIcon from '@mui/icons-material/Home';
import PreviewIcon from '@mui/icons-material/Preview';
import FolderIcon from '@mui/icons-material/Folder';
import { useAppSelector } from '../store';

const Navigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const { fields } = useAppSelector(state => state.formBuilder);

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { 
      label: 'Create Form', 
      path: '/create', 
      icon: <BuildIcon />,
      badge: fields.length > 0 ? fields.length : undefined
    },
    { label: 'Preview', path: '/preview', icon: <PreviewIcon /> },
    { label: 'My Forms', path: '/myforms', icon: <FolderIcon /> },
  ];

  return (
    <AppBar 
      position="static" 
      sx={{ 
        mb: 2,
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        boxShadow: '0 8px 40px 0 rgba(99, 102, 241, 0.4)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.common.white, 0.15)}, transparent)`,
          animation: 'shimmer 4s infinite',
        },
        '@keyframes shimmer': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' }
        }
      }}
    >
      <Toolbar sx={{ minHeight: '72px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <BuildIcon sx={{ mr: 2, fontSize: 28 }} />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 700,
              fontSize: '1.25rem',
              background: 'linear-gradient(45deg, #ffffff, #e0e7ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Form Builder Pro
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              onClick={() => router.push(item.path)}
              startIcon={item.icon}
              sx={{
                borderRadius: 2,
                px: 2,
                py: 1,
                position: 'relative',
                backgroundColor: pathname === item.path 
                  ? alpha(theme.palette.common.white, 0.2)
                  : 'transparent',
                backdropFilter: pathname === item.path ? 'blur(10px)' : 'none',
                border: pathname === item.path 
                  ? `1px solid ${alpha(theme.palette.common.white, 0.3)}`
                  : '1px solid transparent',
                fontWeight: pathname === item.path ? 600 : 500,
                transform: pathname === item.path ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.common.white, 0.15),
                  backdropFilter: 'blur(10px)',
                  transform: 'scale(1.05) translateY(-1px)',
                  boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.3)}`,
                },
                '&:active': {
                  transform: 'scale(0.98)',
                },
              }}
            >
              {item.label}
              {item.badge && (
                <Chip 
                  label={item.badge}
                  size="small"
                  sx={{ 
                    ml: 1, 
                    height: 20,
                    backgroundColor: theme.palette.secondary.main,
                    color: 'white',
                    fontSize: '0.75rem'
                  }}
                />
              )}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
