module.exports = {
    // mode: 'jit',
    // important: '#__next',
    content: [
        'components/**/*.js',
        'components/**/*.jsx',
        'pages/**/*.js',
        'pages/**/*.jsx',
        'components/**/*.ts',
        'components/**/*.tsx',
        'pages/**/*.ts',
        'pages/**/*.tsx',
    ],
    // corePlugins: {
    //     preflight: false,
    // },
    // important: "#__next",
    theme: {

        screens: {
            'xd': '0px',
            'sm': '430px',
            // => @media (min-width: 640px) { ... }

            'md': '900px',
            // => @media (min-width: 768px) { ... }

            'lg': '1440px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1920px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '2560px',
            // => @media (min-width: 1536px) { ... }
        },
        extend: {
            gridTemplateColumns: {
                24: 'repeat(24, minmax(0, 1fr))',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeOut: {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
            },
            animation: {
                fadeIn: 'fadeIn 0.3s ease-in-out',
                fadeOut: 'fadeOut 0.3s ease-in-out',
            },
            colors: {
                blue: {
                    lighter: '#4B4A96',
                    light: '#393896',
                    mensa: '#2F2E6A',
                    dark: '#2A2983',
                },
                orange: {
                    light: '#F9D98C',
                },
                red: {
                    DEFAULT: '#DB2828',
                },
                green: {
                    DEFAULT: '#21BA45',
                },
                black: {
                    bg: '#161616',
                    DEFAULT: '#444444',
                },
                white: {
                    DEFAULT: '#ffffff',
                    dark: '#EFEFEF',
                },
                gray: {
                    lighter: '#E2DCF9',
                    light: '#C9C9C9',
                    DEFAULT: '#7F7F7F',
                    dark: '#525252',
                    darker: '#393939',
                    disable: '#7E7E7E',
                },
                purple: {
                    DEFAULT: '#570680',
                }
            },
        },
        fontFamily: {
            oswald: ['Oswald', 'sans-serif', 'Arial'],
            inter: ['Inter', 'sans-serif', 'Arial'],
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1.25rem',
                sm: '1.5rem',
            },
        },
    },
    // plugins: [require('tailwindcss-nested-groups')],
    darkMode: 'media',
    variants: {},
}