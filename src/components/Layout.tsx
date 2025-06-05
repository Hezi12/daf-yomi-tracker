import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Home, 
  Plus, 
  BarChart3, 
  Settings,
  Calendar,
  Menu,
  X
} from 'lucide-react';
import { clsx } from 'clsx';

interface LayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'דף הבית', href: '/', icon: Home },
  { name: 'תיעוד דף חדש', href: '/add', icon: Plus },
  { name: 'הדפים שלי', href: '/dafim', icon: BookOpen },
  { name: 'סטטיסטיקות', href: '/stats', icon: BarChart3 },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600 ml-2 sm:ml-3" />
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 hebrew-text">
                מעקב דף היומי
              </h1>
            </div>
            
            <div className="flex items-center">
              {/* Desktop Settings */}
              <button className="hidden sm:block p-2 text-gray-400 hover:text-gray-500">
                <Settings className="h-5 w-5" />
              </button>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden p-2 text-gray-400 hover:text-gray-500"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={clsx(
                      'flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors',
                      isActive
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    <Icon className="h-5 w-5 ml-3" />
                    <span className="hebrew-text">{item.name}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Settings */}
              <button className="flex items-center w-full px-3 py-3 rounded-lg text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50">
                <Settings className="h-5 w-5 ml-3" />
                <span className="hebrew-text">הגדרות</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Desktop Navigation */}
      <nav className="hidden sm:block bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 space-x-reverse overflow-x-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    'flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                    isActive
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )}
                >
                  <Icon className="h-4 w-4 ml-2" />
                  <span className="hebrew-text">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {children}
      </main>

      {/* Mobile Bottom Navigation - Alternative */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 mobile-bottom-nav">
        <div className="grid grid-cols-4 py-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  'flex flex-col items-center py-2 px-1 text-xs font-medium transition-colors',
                  isActive
                    ? 'text-primary-600'
                    : 'text-gray-500'
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="hebrew-text leading-none text-center">
                  {item.name.split(' ')[0]}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Content Padding Bottom */}
      <div className="sm:hidden h-16"></div>
    </div>
  );
}; 