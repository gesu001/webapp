'use client';

import { useTheme } from '@/app/context/ThemeContext';
import { usePreferences } from '@/app/context/PreferencesContext';
import { useState } from 'react';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { preferences, setPreference, resetPreferences } = usePreferences();
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const handlePreferenceChange = <K extends keyof typeof preferences>(key: K, value: (typeof preferences)[K]) => {
    setPreference(key, value);
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 2000);
  };

  const handleResetPreferences = () => {
    resetPreferences();
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 2000);
  };

  return (
    <div className="flex-1 w-full bg-white dark:bg-black">
      {/* Page Header */}
      <section className="bg-linear-to-r from-teal-600 to-cyan-700 dark:from-teal-900 dark:to-cyan-950 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Settings</h1>
          <p className="text-lg text-teal-100">
            Customize your RSS2LMS experience
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        {showSaveMessage && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200 flex items-center gap-2">
            <span className="text-xl">✓</span>
            <span>Settings saved successfully!</span>
          </div>
        )}

        {/* Theme Settings */}
        <div className="mb-8 p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Appearance</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Theme
              </label>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Current theme: <strong>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</strong>
              </p>
              <button
                onClick={toggleTheme}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-slate-800"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? '🌙 Switch to Dark Mode' : '☀️ Switch to Light Mode'}
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                Your theme preference is automatically saved and will persist across sessions.
              </p>
            </div>
          </div>
        </div>

        {/* Layout Preferences */}
        <div className="mb-8 p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Layout Preferences</h2>

          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={preferences.compactLayout}
                  onChange={(e) => handlePreferenceChange('compactLayout', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 dark:border-slate-600 text-teal-600"
                  aria-label="Enable compact layout"
                />
                <span className="font-semibold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  Compact Layout
                </span>
              </label>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 ml-7">
                Reduces spacing and sizing for a more condensed interface.
              </p>
            </div>

            <div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={preferences.showReadTime}
                  onChange={(e) => handlePreferenceChange('showReadTime', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 dark:border-slate-600 text-teal-600"
                  aria-label="Show estimated read time"
                />
                <span className="font-semibold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  Show Read Time Estimates
                </span>
              </label>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 ml-7">
                Display estimated reading time for each article.
              </p>
            </div>

          </div>
        </div>

        {/* Data & Privacy */}
        <div className="mb-8 p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Data & Privacy</h2>

          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Local Storage:</strong> Your preferences (theme, layout settings) are stored locally in your browser. No data is sent to external servers.
            </p>
            <p>
              <strong>Clear Data:</strong> You can reset all settings to their defaults using the button below.
            </p>
            <button
              onClick={handleResetPreferences}
              className="px-4 py-2 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 text-red-800 dark:text-red-200 font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-slate-800"
              aria-label="Reset all settings to defaults"
            >
              Reset to Defaults
            </button>
          </div>
        </div>

        {/* Accessibility Settings */}
        <div className="settings-accessibility-card p-6 bg-teal-50 dark:bg-teal-900 rounded-lg border border-teal-200 dark:border-teal-800">
          <h2 className="settings-accessibility-heading text-2xl font-bold text-teal-900 dark:text-teal-100 mb-4">Accessibility</h2>
          <ul className="settings-accessibility-list space-y-2 text-teal-900 dark:text-teal-100">
            <li>✓ Full keyboard navigation support</li>
            <li>✓ WCAG AA color contrast compliance</li>
            <li>✓ Semantic HTML structure</li>
            <li>✓ ARIA labels and descriptions</li>
            <li>✓ Focus indicators on all interactive elements</li>
            <li>✓ Responsive text sizing</li>
          </ul>
          <p className="settings-accessibility-note text-sm text-teal-800 dark:text-teal-200 mt-4">
            If you encounter any accessibility issues, please report them so we can improve the experience for all users.
          </p>
        </div>
      </section>
    </div>
  );
}
