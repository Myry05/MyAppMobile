import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Globe, 
  MessageCircle, 
  Video, 
  Settings, 
  LogOut, 
  UserPlus, 
  CheckCircle, 
  Phone,
  Send,
  MoreVertical,
  ChevronLeft,
  Camera,
  Mic,
  MicOff,
  VideoOff
} from 'lucide-react';

const MobileApp = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [language, setLanguage] = useState('es');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });

  const texts = {
    es: {
      welcome: 'Bienvenido',
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      email: 'Correo Electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      name: 'Nombre',
      role: 'Rol',
      admin: 'Administrador',
      user: 'Usuario',
      forgotPassword: '¿Olvidaste tu contraseña?',
      createAccount: 'Crear Cuenta',
      alreadyHave: '¿Ya tienes cuenta?',
      verifyEmail: 'Verificar Email',
      verificationSent: 'Hemos enviado un enlace de verificación a tu correo',
      checkEmail: 'Revisa tu bandeja de entrada',
      resend: 'Reenviar',
      home: 'Inicio',
      chat: 'Chat',
      settings: 'Configuración',
      logout: 'Cerrar Sesión',
      language: 'Idioma',
      profile: 'Perfil',
      videocall: 'Videollamada',
      typeMessage: 'Escribe un mensaje...',
      send: 'Enviar',
      calling: 'Llamando...',
      endCall: 'Finalizar'
    },
    en: {
      welcome: 'Welcome',
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      name: 'Name',
      role: 'Role',
      admin: 'Administrator',
      user: 'User',
      forgotPassword: 'Forgot your password?',
      createAccount: 'Create Account',
      alreadyHave: 'Already have an account?',
      verifyEmail: 'Verify Email',
      verificationSent: 'We sent a verification link to your email',
      checkEmail: 'Check your inbox',
      resend: 'Resend',
      home: 'Home',
      chat: 'Chat',
      settings: 'Settings',
      logout: 'Logout',
      language: 'Language',
      profile: 'Profile',
      videocall: 'Video Call',
      typeMessage: 'Type a message...',
      send: 'Send',
      calling: 'Calling...',
      endCall: 'End Call'
    }
  };

  const t = texts[language];

  const mockChats = [
    { id: 1, name: 'María González', lastMessage: 'Hola, ¿cómo estás?', time: '10:30', avatar: '👩‍💼' },
    { id: 2, name: 'Carlos Ruiz', lastMessage: 'La reunión es a las 3 PM', time: '09:15', avatar: '👨‍💻' },
    { id: 3, name: 'Ana López', lastMessage: 'Perfecto, gracias!', time: '08:45', avatar: '👩‍🎨' }
  ];

  const mockMessages = [
    { id: 1, text: 'Hola, ¿cómo estás?', sender: 'other', time: '10:30' },
    { id: 2, text: 'Todo bien, gracias. ¿Y tú?', sender: 'me', time: '10:32' },
    { id: 3, text: 'Excelente! ¿Podemos hacer una videollamada?', sender: 'other', time: '10:35' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simular autenticación
    setUser({ name: 'Usuario Demo', email: formData.email, role: formData.role });
    setCurrentScreen('home');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    setCurrentScreen('verify-email');
  };

  const handleEmailVerification = () => {
    setUser({ name: formData.name, email: formData.email, role: formData.role });
    setCurrentScreen('home');
  };

  const sendMessage = () => {
    if (message.trim()) {
      // Aquí enviarías el mensaje
      setMessage('');
    }
  };

  const startVideoCall = () => {
    setIsVideoCall(true);
  };

  const endVideoCall = () => {
    setIsVideoCall(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
  };

  // Pantalla de Bienvenida
  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center p-6">
      <div className="text-white text-center mb-12">
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
          <MessageCircle size={48} className="text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">ConnectApp</h1>
        <p className="text-xl opacity-90">{t.welcome}</p>
      </div>
      
      <div className="w-full max-w-sm space-y-4">
        <button 
          onClick={() => setCurrentScreen('login')}
          className="w-full bg-white text-purple-600 font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          {t.login}
        </button>
        <button 
          onClick={() => setCurrentScreen('register')}
          className="w-full bg-white/10 text-white font-semibold py-4 rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
        >
          {t.register}
        </button>
      </div>
      
      <div className="mt-8 flex items-center space-x-4">
        <button
          onClick={() => setLanguage('es')}
          className={`px-4 py-2 rounded-lg ${language === 'es' ? 'bg-white/20 text-white' : 'text-white/60'}`}
        >
          ES
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-4 py-2 rounded-lg ${language === 'en' ? 'bg-white/20 text-white' : 'text-white/60'}`}
        >
          EN
        </button>
      </div>
    </div>
  );

  // Pantalla de Login
  const LoginScreen = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white px-6 py-4 shadow-sm">
        <button 
          onClick={() => setCurrentScreen('welcome')}
          className="flex items-center text-gray-600"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      
      <div className="flex-1 px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.login}</h2>
          <p className="text-gray-600">Ingresa a tu cuenta</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                placeholder={t.email}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={t.password}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <button type="button" className="text-purple-600 text-sm">
              {t.forgotPassword}
            </button>
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {t.login}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <span className="text-gray-600">{t.alreadyHave} </span>
          <button 
            onClick={() => setCurrentScreen('register')}
            className="text-purple-600 font-semibold"
          >
            {t.register}
          </button>
        </div>
      </div>
    </div>
  );

  // Pantalla de Registro
  const RegisterScreen = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white px-6 py-4 shadow-sm">
        <button 
          onClick={() => setCurrentScreen('welcome')}
          className="flex items-center text-gray-600"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      
      <div className="flex-1 px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.createAccount}</h2>
          <p className="text-gray-600">Crea tu cuenta nueva</p>
        </div>
        
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={t.name}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                placeholder={t.email}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={t.password}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder={t.confirmPassword}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <div className="relative">
              <UserPlus className="absolute left-3 top-3 text-gray-400" size={20} />
              <select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="user">{t.user}</option>
                <option value="admin">{t.admin}</option>
              </select>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {t.createAccount}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <span className="text-gray-600">{t.alreadyHave} </span>
          <button 
            onClick={() => setCurrentScreen('login')}
            className="text-purple-600 font-semibold"
          >
            {t.login}
          </button>
        </div>
      </div>
    </div>
  );

  // Pantalla de Verificación de Email
  const VerifyEmailScreen = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm text-center shadow-lg">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="text-green-600" size={40} />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.verifyEmail}</h2>
        <p className="text-gray-600 mb-6">{t.verificationSent}</p>
        <p className="text-sm text-gray-500 mb-8">{t.checkEmail}</p>
        
        <button
          onClick={handleEmailVerification}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 rounded-xl mb-4"
        >
          Verificar (Demo)
        </button>
        
        <button className="text-purple-600 text-sm">
          {t.resend}
        </button>
      </div>
    </div>
  );

  // Pantalla Principal
  const HomeScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{user?.name}</h3>
              <p className="text-sm text-gray-600">{user?.role === 'admin' ? t.admin : t.user}</p>
            </div>
          </div>
          <button
            onClick={() => setCurrentScreen('settings')}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Settings size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{t.home}</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setCurrentScreen('chat-list')}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <MessageCircle className="text-purple-600 mb-2" size={32} />
            <h3 className="font-semibold text-gray-800">{t.chat}</h3>
          </button>
          
          <button
            onClick={() => setCurrentScreen('video-call')}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <Video className="text-green-600 mb-2" size={32} />
            <h3 className="font-semibold text-gray-800">{t.videocall}</h3>
          </button>
        </div>
      </div>
    </div>
  );

  // Lista de Chats
  const ChatListScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setCurrentScreen('home')}
            className="flex items-center text-gray-600"
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">{t.chat}</h2>
          <div className="w-6"></div>
        </div>
      </div>
      
      <div className="p-4">
        {mockChats.map(chat => (
          <div
            key={chat.id}
            onClick={() => {
              setSelectedChat(chat);
              setCurrentScreen('chat');
            }}
            className="bg-white p-4 rounded-lg mb-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{chat.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">{chat.name}</h3>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-600">{chat.lastMessage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Pantalla de Chat
  const ChatScreen = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setCurrentScreen('chat-list')}
              className="text-gray-600"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="text-xl">{selectedChat?.avatar}</div>
            <div>
              <h3 className="font-semibold text-gray-800">{selectedChat?.name}</h3>
              <p className="text-xs text-green-600">En línea</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={startVideoCall}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Video size={20} className="text-gray-600" />
            </button>
            <button
              onClick={() => setCurrentScreen('voice-call')}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Phone size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {mockMessages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl ${
                msg.sender === 'me'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              <p>{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === 'me' ? 'text-purple-200' : 'text-gray-500'
              }`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-4 border-t">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder={t.typeMessage}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );

  // Pantalla de Videollamada
  const VideoCallScreen = () => (
    <div className="min-h-screen bg-black relative">
      {isVideoCall ? (
        <div className="flex flex-col h-full">
          <div className="flex-1 relative">
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-32 h-32 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={64} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold">{selectedChat?.name || 'Contacto'}</h3>
                <p className="text-gray-400">{t.calling}</p>
              </div>
            </div>
            
            <div className="absolute top-4 right-4 w-24 h-32 bg-gray-700 rounded-lg flex items-center justify-center">
              <User size={32} className="text-gray-400" />
            </div>
          </div>
          
          <div className="bg-black/50 p-6 flex justify-center space-x-6">
            <button
              onClick={toggleMute}
              className={`p-4 rounded-full ${isMuted ? 'bg-red-600' : 'bg-gray-600'}`}
            >
              {isMuted ? <MicOff size={24} className="text-white" /> : <Mic size={24} className="text-white" />}
            </button>
            
            <button
              onClick={endVideoCall}
              className="p-4 bg-red-600 rounded-full"
            >
              <Phone size={24} className="text-white rotate-135" />
            </button>
            
            <button
              onClick={toggleVideo}
              className={`p-4 rounded-full ${!isVideoEnabled ? 'bg-red-600' : 'bg-gray-600'}`}
            >
              {isVideoEnabled ? <Video size={24} className="text-white" /> : <VideoOff size={24} className="text-white" />}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full items-center justify-center text-white">
          <Video size={64} className="mb-4" />
          <h2 className="text-2xl font-bold mb-8">{t.videocall}</h2>
          <button
            onClick={startVideoCall}
            className="bg-green-600 px-8 py-3 rounded-full text-white font-semibold"
          >
            Iniciar Videollamada
          </button>
          <button
            onClick={() => setCurrentScreen('home')}
            className="mt-4 text-gray-400"
          >
            Volver
          </button>
        </div>
      )}
    </div>
  );

  // Pantalla de Configuraciones
  const SettingsScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setCurrentScreen('home')}
            className="flex items-center text-gray-600"
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">{t.settings}</h2>
          <div className="w-6"></div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">{t.profile}</h3>
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-xl">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">{user?.name}</h4>
              <p className="text-sm text-gray-600">{user?.email}</p>
              <p className="text-xs text-purple-600">{user?.role === 'admin' ? t.admin : t.user}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">{t.language}</h3>
          <div className="space-y-2">
            <button
              onClick={() => setLanguage('es')}
              className={`w-full p-3 rounded-lg text-left ${
                language === 'es' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-50'
              }`}
            >
              Español
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`w-full p-3 rounded-lg text-left ${
                language === 'en' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-50'
              }`}
            >
              English
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <button
            onClick={() => {
              setUser(null);
              setCurrentScreen('welcome');
            }}
            className="w-full flex items-center justify-center space-x-2 text-red-600 font-semibold"
          >
            <LogOut size={20} />
            <span>{t.logout}</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Renderizado condicional de pantallas
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'login':
        return <LoginScreen />;
      case 'register':
        return <RegisterScreen />;
      case 'verify-email':
        return <VerifyEmailScreen />;
      case 'home':
        return <HomeScreen />;
      case 'chat-list':
        return <ChatListScreen />;
      case 'chat':
        return <ChatScreen />;
      case 'video-call':
        return <VideoCallScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
      {renderScreen()}
    </div>
  );
};

export default MobileApp;