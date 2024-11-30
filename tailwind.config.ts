import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		textColor: {
			h1: 'var(--neutral-100)',
			h2: 'var(--neutral-90)',
			h3: 'var(--neutral-90)',
			body: 'var(--neutral-80)',
			label: 'var(--neutral-100)',
		  },
		  fontSize: {
			h1: ['2rem', { fontWeight: '700' }],
			h2: ['1.5rem', { fontWeight: '700' }],
			h3: ['1.125rem', { fontWeight: '600' }],
			body: ['1rem', { fontWeight: '500' }],
			label: ['0.875rem', { fontWeight: '400' }],
		  },
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			neutral: {
  				DEFAULT: 'var(--neutral-100)',
  				100: 'var(--neutral-100)',
  				90: 'var(--neutral-90)',
  				80: 'var(--neutral-80)',
  				70: 'var(--neutral-70)',
  				60: 'var(--neutral-60)',
  				50: 'var(--neutral-50)',
  				40: 'var(--neutral-40)',
  				30: 'var(--neutral-30)',
  				20: 'var(--neutral-20)',
  				10: 'var(--neutral-10)',
  				0: 'var(--neutral-0)',
  			},
  			primary: {
  				DEFAULT: 'var(--primary-100)',
  				foreground: 'var(--neutral-0)',
  				100: 'var(--primary-100)',
  				80: 'var(--primary-80)',
  				60: 'var(--primary-60)',
  				40: 'var(--primary-40)',
  				20: 'var(--primary-20)',
  				10: 'var(--primary-10)',
  				5: 'var(--primary-5)',
  				2: 'var(--primary-2)',
  			},
  			secondary: {
  				DEFAULT: 'var(--secondary-100)',
  				foreground: 'var(--neutral-0)',
  				100: 'var(--secondary-100)',
  				80: 'var(--secondary-80)',
  				60: 'var(--secondary-60)',
  				40: 'var(--secondary-40)',
  				20: 'var(--secondary-20)',
  				10: 'var(--secondary-10)',
  				5: 'var(--secondary-5)',
  				2: 'var(--secondary-2)',
  			},
  			destructive: {
  				DEFAULT: 'var(--destructive-100)',
  				foreground: 'var(--background)',
  				100: 'var(--destructive-100)',
  				80: 'var(--destructive-80)',
  				60: 'var(--destructive-60)',
  				40: 'var(--destructive-40)',
  				20: 'var(--destructive-20)',
  				10: 'var(--destructive-10)',
  			},
  			accent: {
  				DEFAULT: 'var(--accent-100)',
  				foreground: 'var(--accent-foreground)',
  			},
  			border: 'var(--border)',
  			input: 'var(--input)',
  			ring: 'var(--ring)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [animate],
} satisfies Config;
