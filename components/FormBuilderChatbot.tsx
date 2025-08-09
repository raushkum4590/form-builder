'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Fab,
  Collapse,
  List,
  ListItem,
  Chip,
  useTheme,
  alpha,
  Fade,
  Avatar,
  CircularProgress
} from '@mui/material';
import {
  Chat as ChatIcon,
  Close as CloseIcon,
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  AutoAwesome as SparkleIcon
} from '@mui/icons-material';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const FORM_BUILDING_RESPONSES = {
  greeting: [
    "Hi there! 👋 I'm your Form Builder assistant. I can help you create amazing forms!",
    "Hello! 🤖 Ready to build some incredible forms? I'm here to guide you!",
    "Welcome! ✨ I'm here to help you master form building. What would you like to create?"
  ],
  
  fieldTypes: "Our Form Builder supports 7 field types:\n\n📝 **Text** - Single line text input\n🔢 **Number** - Numeric values with validation\n📄 **Textarea** - Multi-line text areas\n📋 **Select** - Dropdown menus\n🔘 **Radio** - Single choice options\n☑️ **Checkbox** - Multiple selections\n📅 **Date** - Date picker fields\n\nEach field can have custom validation rules and be marked as required!",
  
  validation: "Form validation is powerful! 🛡️\n\nYou can add:\n• **Required fields** - Must be filled\n• **Min/Max length** - Text length limits\n• **Pattern matching** - Regex validation\n• **Custom rules** - Your own validation logic\n\nValidation happens in real-time as users type!",
  
  derivedFields: "Derived fields are amazing! 🔗\n\nThey automatically calculate values based on other fields using custom formulas. For example:\n• Age from birth date\n• Total price from quantity × unit price\n• BMI from height and weight\n\nJust use field names in {} brackets like: {Height} * {Weight}",
  
  aiAssistant: "Our AI Assistant is incredible! 🤖✨\n\nIt can:\n• **Generate entire forms** from descriptions\n• **Create smart formulas** for derived fields\n• **Suggest field configurations**\n• **Help with validation rules**\n\nJust describe what you want and let AI build it for you!",
  
  features: "Form Builder Pro features:\n\n🎨 **Modern UI** - Beautiful, responsive design\n⚡ **Real-time Preview** - See changes instantly\n💾 **Auto-save** - Never lose your work\n🔄 **Drag & Drop** - Reorder fields easily\n📱 **Mobile Ready** - Works on all devices\n🚀 **Export Ready** - Deploy anywhere\n\nPlus advanced validation, derived fields, and AI assistance!",
  
  gettingStarted: "Getting started is easy! 🚀\n\n1. **Click 'Create New Form'** on the homepage\n2. **Add fields** using the '+' button\n3. **Configure each field** - labels, validation, options\n4. **Preview your form** to test it\n5. **Save and deploy** when ready\n\nTip: Try the AI Assistant for instant form generation!",
  
  help: "I can help you with:\n\n🏗️ **Form creation** - Step-by-step guidance\n🔧 **Field configuration** - Setup and validation\n🤖 **AI features** - Smart form generation\n📊 **Best practices** - Professional form design\n🚀 **Advanced features** - Derived fields, formulas\n\nWhat would you like to learn about?"
};

const QUICK_ACTIONS = [
  { label: "Field Types", key: "fieldTypes", icon: "📝" },
  { label: "Validation", key: "validation", icon: "🛡️" },
  { label: "AI Assistant", key: "aiAssistant", icon: "🤖" },
  { label: "Getting Started", key: "gettingStarted", icon: "🚀" },
];

export default function FormBuilderChatbot() {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send welcome message when chatbot opens for the first time
      setTimeout(() => {
        addBotMessage(FORM_BUILDING_RESPONSES.greeting[0]);
        setTimeout(() => {
          addBotMessage("What would you like to know about form building? Try one of the quick actions below! 👇");
        }, 1000);
      }, 500);
    }
  }, [isOpen]);

  const addMessage = (text: string, isBot: boolean = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(text, true);
    }, 1000 + Math.random() * 1000); // Random delay for natural feel
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue);
    const userMessage = inputValue.toLowerCase();
    setInputValue('');

    // Simple keyword-based responses
    let response = "That's a great question! 🤔 Let me help you with form building specifics. Try asking about field types, validation, AI features, or getting started!";

    if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
      response = FORM_BUILDING_RESPONSES.greeting[Math.floor(Math.random() * FORM_BUILDING_RESPONSES.greeting.length)];
    } else if (userMessage.includes('field') || userMessage.includes('type')) {
      response = FORM_BUILDING_RESPONSES.fieldTypes;
    } else if (userMessage.includes('validation') || userMessage.includes('validate')) {
      response = FORM_BUILDING_RESPONSES.validation;
    } else if (userMessage.includes('derived') || userMessage.includes('formula') || userMessage.includes('calculate')) {
      response = FORM_BUILDING_RESPONSES.derivedFields;
    } else if (userMessage.includes('ai') || userMessage.includes('assistant')) {
      response = FORM_BUILDING_RESPONSES.aiAssistant;
    } else if (userMessage.includes('feature') || userMessage.includes('what can')) {
      response = FORM_BUILDING_RESPONSES.features;
    } else if (userMessage.includes('start') || userMessage.includes('begin') || userMessage.includes('create')) {
      response = FORM_BUILDING_RESPONSES.gettingStarted;
    } else if (userMessage.includes('help')) {
      response = FORM_BUILDING_RESPONSES.help;
    }

    addBotMessage(response);
  };

  const handleQuickAction = (key: string) => {
    const response = FORM_BUILDING_RESPONSES[key as keyof typeof FORM_BUILDING_RESPONSES];
    if (response) {
      if (Array.isArray(response)) {
        addBotMessage(response[Math.floor(Math.random() * response.length)]);
      } else {
        addBotMessage(response);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Fab Button */}
      <Fab
        color="primary"
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
            transform: 'scale(1.1)',
          },
          transition: 'all 0.3s ease',
          boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
        }}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </Fab>

      {/* Chat Window */}
      <Collapse in={isOpen}>
        <Paper
          elevation={24}
          sx={{
            position: 'fixed',
            bottom: 100,
            right: 24,
            width: { xs: '90vw', sm: 400 },
            height: 500,
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 3,
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            boxShadow: `0 24px 80px ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
              <BotIcon />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={600}>
                Form Builder Assistant
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Your form building expert 🚀
              </Typography>
            </Box>
            <IconButton onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box sx={{ flex: 1, overflow: 'auto', p: 1 }}>
            <List sx={{ p: 0 }}>
              {messages.map((message) => (
                <ListItem
                  key={message.id}
                  sx={{
                    display: 'flex',
                    justifyContent: message.isBot ? 'flex-start' : 'flex-end',
                    px: 1,
                    py: 0.5,
                  }}
                >
                  <Fade in timeout={300}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1,
                        maxWidth: '85%',
                        flexDirection: message.isBot ? 'row' : 'row-reverse',
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: message.isBot ? theme.palette.primary.main : theme.palette.secondary.main,
                        }}
                      >
                        {message.isBot ? <BotIcon fontSize="small" /> : <PersonIcon fontSize="small" />}
                      </Avatar>
                      <Paper
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: message.isBot
                            ? alpha(theme.palette.primary.main, 0.1)
                            : theme.palette.primary.main,
                          color: message.isBot ? 'text.primary' : 'white',
                          whiteSpace: 'pre-line',
                        }}
                      >
                        <Typography variant="body2">
                          {message.text}
                        </Typography>
                      </Paper>
                    </Box>
                  </Fade>
                </ListItem>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <ListItem sx={{ display: 'flex', justifyContent: 'flex-start', px: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
                      <BotIcon fontSize="small" />
                    </Avatar>
                    <Paper
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <CircularProgress size={16} />
                      <Typography variant="body2" color="text.secondary">
                        Typing...
                      </Typography>
                    </Paper>
                  </Box>
                </ListItem>
              )}
              <div ref={messagesEndRef} />
            </List>

            {/* Quick Actions */}
            {messages.length <= 2 && (
              <Box sx={{ p: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                  Quick actions:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {QUICK_ACTIONS.map((action) => (
                    <Chip
                      key={action.key}
                      label={`${action.icon} ${action.label}`}
                      onClick={() => handleQuickAction(action.key)}
                      variant="outlined"
                      size="small"
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          {/* Input */}
          <Box
            sx={{
              p: 2,
              borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              background: alpha(theme.palette.background.paper, 0.8),
            }}
          >
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
              <TextField
                fullWidth
                placeholder="Ask me about form building..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                multiline
                maxRows={3}
                variant="outlined"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
              <IconButton
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: 'white',
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark,
                  },
                  '&:disabled': {
                    bgcolor: alpha(theme.palette.primary.main, 0.3),
                    color: 'rgba(255,255,255,0.5)',
                  },
                }}
              >
                <SendIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Collapse>
    </>
  );
}
