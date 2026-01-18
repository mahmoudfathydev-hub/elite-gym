/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                montserrat: ['Montserrat', 'sans-serif'],
                openSans: ['"Open Sans"', 'sans-serif'],
            },
            animation: {
                'spin-slow': 'spin 20s linear infinite',
                'spin-slow-reverse': 'spin-reverse 25s linear infinite',
            },
            keyframes: {
                'spin-reverse': {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(-360deg)' },
                },
            },
        },
    },
    plugins: [],
};
