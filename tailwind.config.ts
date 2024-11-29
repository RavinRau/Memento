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
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			primary: {
  				DEFAULT: 'var(--primary-100)',
  				foreground: 'var(--primary-2)',
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
  				foreground: 'var(--secondary-2)',
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
