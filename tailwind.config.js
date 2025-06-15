/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#2563EB', // Deep blue (primary) - blue-600
        'primary-50': '#EFF6FF', // Very light blue (50-level shade) - blue-50
        'primary-100': '#DBEAFE', // Light blue (100-level shade) - blue-100
        'primary-500': '#3B82F6', // Medium blue (500-level shade) - blue-500
        'primary-700': '#1D4ED8', // Dark blue (700-level shade) - blue-700
        'primary-900': '#1E3A8A', // Very dark blue (900-level shade) - blue-900
        
        // Secondary Colors
        'secondary': '#64748B', // Sophisticated slate (secondary) - slate-500
        'secondary-50': '#F8FAFC', // Very light slate (50-level shade) - slate-50
        'secondary-100': '#F1F5F9', // Light slate (100-level shade) - slate-100
        'secondary-200': '#E2E8F0', // Light slate (200-level shade) - slate-200
        'secondary-300': '#CBD5E1', // Medium light slate (300-level shade) - slate-300
        'secondary-600': '#475569', // Medium dark slate (600-level shade) - slate-600
        'secondary-700': '#334155', // Dark slate (700-level shade) - slate-700
        'secondary-800': '#1E293B', // Very dark slate (800-level shade) - slate-800
        
        // Accent Colors
        'accent': '#059669', // Success-oriented emerald (accent) - emerald-600
        'accent-50': '#ECFDF5', // Very light emerald (50-level shade) - emerald-50
        'accent-100': '#D1FAE5', // Light emerald (100-level shade) - emerald-100
        'accent-500': '#10B981', // Medium emerald (500-level shade) - emerald-500
        'accent-700': '#047857', // Dark emerald (700-level shade) - emerald-700
        
        // Background Colors
        'background': '#FAFBFC', // Soft off-white background - gray-50
        'surface': '#FFFFFF', // Pure white surface - white
        
        // Text Colors
        'text-primary': '#1E293B', // Rich charcoal primary text - slate-800
        'text-secondary': '#64748B', // Muted slate secondary text - slate-500
        
        // Status Colors
        'success': '#10B981', // Vibrant emerald success - emerald-500
        'success-50': '#ECFDF5', // Light emerald success background - emerald-50
        'success-100': '#D1FAE5', // Light emerald success background - emerald-100
        
        'warning': '#F59E0B', // Warm amber warning - amber-500
        'warning-50': '#FFFBEB', // Light amber warning background - amber-50
        'warning-100': '#FEF3C7', // Light amber warning background - amber-100
        
        'error': '#EF4444', // Clear red error - red-500
        'error-50': '#FEF2F2', // Light red error background - red-50
        'error-100': '#FEE2E2', // Light red error background - red-100
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'caption': ['Inter', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontWeight: {
        'heading-normal': '400',
        'heading-medium': '500',
        'heading-semibold': '600',
        'body-normal': '400',
        'body-medium': '500',
        'caption-normal': '400',
        'data-normal': '400',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'modal': '0 4px 6px rgba(0, 0, 0, 0.07)',
        'elevation': '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
      borderColor: {
        'border': '#E2E8F0', // Light slate border - slate-200
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '240': '60rem',
      },
      zIndex: {
        '999': '999',
        '1000': '1000',
        '1001': '1001',
        '1002': '1002',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}