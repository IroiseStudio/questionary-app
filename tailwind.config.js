/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				bg: 'hsl(225 15% 10%)', // page background
				'bg-elev': 'hsl(225 14% 14%)', // elevated surfaces
				card: 'hsl(225 16% 16%)',
				'card-2': 'hsl(225 18% 20%)',
				text: 'hsl(210 20% 96%)',
				muted: 'hsl(215 12% 65%)',
				primary: 'hsl(168 84% 48%)', // teal/green neon
				'primary-2': 'hsl(200 90% 60%)', // cyan neon
			},
			borderRadius: {
				xl: '1rem',
				'2xl': '1.25rem',
				'3xl': '1.75rem',
			},
			boxShadow: {
				soft: '0 10px 30px rgba(0,0,0,0.35)',
				glow: '0 0 0 2px rgba(0,0,0,0.2), 0 10px 30px rgba(0,0,0,0.45)',
				neon: '0 0 24px rgba(0,255,200,0.25)',
			},
			backdropBlur: {
				xs: '2px',
			},
			backgroundImage: {
				'grad-continue':
					'linear-gradient(135deg, hsl(210 90% 55%), hsl(185 90% 55%))',
				'grad-validate':
					'linear-gradient(135deg, hsl(160 80% 45%), hsl(140 80% 50%))',
				'grad-close':
					'linear-gradient(135deg, hsl(30 95% 55%), hsl(45 95% 55%))',
				'grad-delete':
					'linear-gradient(135deg, hsl(340 85% 60%), hsl(0 85% 55%))',
				'grad-cancel':
					'linear-gradient(135deg, hsl(220 10% 45%), hsl(220 10% 25%))',
				'grad-accent':
					'linear-gradient(135deg, hsl(270 80% 65%), hsl(320 85% 65%))',
			},
		},
	},
	plugins: [],
}
