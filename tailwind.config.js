/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './node_modules/flowbite-react/**/*.js',
        './node_modules/tw-elements/dist/js/**/*.js',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        screens: {
            'phone' : '220px',

            'smalltablet': '540px',
            // => @media (min-width: 640px) { ... }
      
            'tablet': '768px',
            // => @media (min-width: 768px) { ... }
      
            'laptop': '1024px',
            // => @media (min-width: 1024px) { ... }
      
            'desktop': '1100px',
            // => @media (min-width: 1280px) { ... }
      
            'large': '1936px',
            // => @media (min-width: 1536px) { ... }
        },
        extend: {
            brightness: {
                60: '.60',
                70: '.70',
                80: '.80',
                90: '.90',
                175: '1.75',
            },
            colors: {
                blackcolor: "#212529",
                whitecolor: "#FCFCFC",
                thirdcolor: "#F3F4F6",
                logocolor: "#8e722d"
            }
        },
    },
    plugins: [
        require('flowbite/plugin'),
        require('tw-elements/dist/plugin')
    ],
}
