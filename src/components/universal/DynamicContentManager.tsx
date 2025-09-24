/**
 * Dynamic Content Manager - Client-side component for theme and language switching
 * This component handles the dynamic switching that Astro's static generation can't handle
 */

import React, { useState, useEffect } from 'react';
import type { Language, Theme, SiteContent } from '../../content/types';
import { getTheme, applyTheme } from '../../config/themes';

interface DynamicContentManagerProps {
  initialLanguage?: Language;
  initialTheme?: Theme;
  initialContent?: SiteContent;
}

export default function DynamicContentManager({
  initialLanguage = 'en',
  initialTheme = 'dark',
  initialContent
}: DynamicContentManagerProps) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [content, setContent] = useState<SiteContent | null>(initialContent || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load content dynamically
  const loadContent = async (lang: Language) => {
    setLoading(true);
    setError(null);

    try {
      let contentModule;
      if (lang === 'en') {
        contentModule = await import('../../content/data/en');
      } else {
        contentModule = await import('../../content/data/zh');
      }

      setContent(contentModule.default);
    } catch (err) {
      console.error('Failed to load content:', err);
      setError(`Failed to load content for language: ${lang}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle language change
  const handleLanguageChange = async (newLanguage: Language) => {
    if (newLanguage === language) return;

    setLanguage(newLanguage);
    await loadContent(newLanguage);

    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLanguage);
    url.searchParams.set('theme', theme);
    window.history.pushState({}, '', url.toString());
  };

  // Handle theme change
  const handleThemeChange = (newTheme: Theme) => {
    if (newTheme === theme) return;

    setTheme(newTheme);
    applyTheme(newTheme);

    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    url.searchParams.set('theme', newTheme);
    window.history.pushState({}, '', url.toString());
  };

  // Initialize from URL parameters
  useEffect(() => {
    const url = new URL(window.location.href);
    const urlLang = url.searchParams.get('lang') as Language;
    const urlTheme = url.searchParams.get('theme') as Theme;

    if (urlLang && (urlLang === 'en' || urlLang === 'zh') && urlLang !== language) {
      setLanguage(urlLang);
      loadContent(urlLang);
    }

    if (urlTheme && (urlTheme === 'dark' || urlTheme === 'light') && urlTheme !== theme) {
      setTheme(urlTheme);
      applyTheme(urlTheme);
    }
  }, []);

  // Load initial content if not provided
  useEffect(() => {
    if (!content) {
      loadContent(language);
    }
  }, []);

  // Apply theme on mount and changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Theme-specific classes
  const getThemeClasses = () => {
    const themeConfig = getTheme(theme);
    return {
      card: theme === 'light'
        ? 'bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow'
        : 'bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 hover:bg-zinc-800/50 transition-colors',
      heading: theme === 'light' ? 'text-gray-900' : 'text-white',
      text: theme === 'light' ? 'text-gray-600' : 'text-zinc-300',
      button: theme === 'light'
        ? 'bg-red-600 text-white hover:bg-red-700'
        : 'bg-red-600 text-white hover:bg-red-700',
      link: theme === 'light'
        ? 'text-red-600 hover:text-red-800'
        : 'text-red-400 hover:text-red-300'
    };
  };

  const classes = getThemeClasses();

  if (loading && !content) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className={`text-xl ${classes.text}`}>
          {language === 'zh' ? '加载中...' : 'Loading...'}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="text-red-500 text-center">
          <p className="text-xl mb-2">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className={`text-xl ${classes.text}`}>
          No content available
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className={`text-5xl font-bold mb-4 ${classes.heading}`}>
          {content.pages?.home?.hero?.title || 'SINTHOME'}
        </h1>
        <p className={`text-xl mb-8 ${classes.text}`}>
          {content.pages?.home?.hero?.subtitle || 'Empowering Communities Through Technology'}
        </p>

        {/* Language and Theme Switchers */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-4 py-2 rounded transition-colors cursor-pointer ${
                language === 'en'
                  ? classes.button
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              English
            </button>
            <button
              onClick={() => handleLanguageChange('zh')}
              className={`px-4 py-2 rounded transition-colors cursor-pointer ${
                language === 'zh'
                  ? classes.button
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              中文
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleThemeChange('dark')}
              className={`px-4 py-2 rounded transition-colors cursor-pointer ${
                theme === 'dark'
                  ? classes.button
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              Dark 🌙
            </button>
            <button
              onClick={() => handleThemeChange('light')}
              className={`px-4 py-2 rounded transition-colors cursor-pointer ${
                theme === 'light'
                  ? classes.button
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              Light ☀️
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        {content.pages?.home?.hero?.cta && (
          <div className="flex justify-center gap-4">
            {content.pages.home.hero.cta.map((cta) => (
              <a
                key={cta.href}
                href={cta.href}
                className={`px-6 py-3 rounded-lg font-medium ${classes.button} transition-colors`}
              >
                {cta.text}
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Mission Section */}
      <section className="py-12">
        <h2 className={`text-3xl font-bold mb-8 text-center ${classes.heading}`}>
          {content.pages?.whoWeAre?.sections?.[0]?.title || 'Our Mission'}
        </h2>
        <div className={classes.card}>
          <p className={classes.text}>
            {content.pages?.whoWeAre?.sections?.[0]?.content || 'Loading...'}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <h2 className={`text-3xl font-bold mb-8 text-center ${classes.heading}`}>
          {language === 'zh' ? '我们的项目' : 'Our Projects'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.projects?.slice(0, 3).map((project) => (
            <div key={project.id} className={classes.card}>
              <h3 className={`text-xl font-bold mb-2 ${classes.heading}`}>
                {project.title}
              </h3>
              <p className={`mb-4 ${classes.text}`}>
                {project.description}
              </p>
              {project.impact && (
                <ul className={`list-disc list-inside space-y-1 ${classes.text}`}>
                  {project.impact.slice(0, 2).map((item, index) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
              )}
              <a
                href={project.href}
                className={`inline-block mt-4 text-sm font-medium ${classes.link} transition-colors`}
              >
                {language === 'zh' ? '了解更多 →' : 'Learn More →'}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Current Settings Display */}
      <section className="py-12">
        <div className={`${classes.card} text-center`}>
          <h3 className={`text-xl font-bold mb-4 ${classes.heading}`}>
            {language === 'zh' ? '当前设置' : 'Current Settings'}
          </h3>
          <p className={classes.text}>
            {language === 'zh' ? '语言' : 'Language'}: <strong>{language === 'en' ? 'English' : '中文'}</strong><br />
            {language === 'zh' ? '主题' : 'Theme'}: <strong>{theme === 'dark' ? (language === 'zh' ? '深色模式' : 'Dark Mode') : (language === 'zh' ? '浅色模式' : 'Light Mode')}</strong>
          </p>
          <p className={`mt-4 text-sm ${classes.text}`}>
            {language === 'zh'
              ? '此页面展示了支持多主题和多语言的新通用架构，具有单一代码库和集中式内容管理。内容和主题现在可以动态切换，无需页面刷新。'
              : 'This page demonstrates the new universal architecture that supports multiple themes and languages with a single codebase and centralized content management. Content and themes now switch dynamically without page refresh.'
            }
          </p>
          {loading && (
            <p className={`mt-2 text-sm ${classes.text}`}>
              {language === 'zh' ? '⏳ 加载中...' : '⏳ Loading...'}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}