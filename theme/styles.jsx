import { extendTheme, useColorModeValue } from "@chakra-ui/react";

const theme = extendTheme({
    config: {
        initialColorMode: 'light',
        useSystemColorMode: false,
    },
    colors: {
        'dark-blue': 'hsl(209, 23%, 22%)',
        'very-dark-blue-1': 'hsl(207, 26%, 17%)',
        'very-dark-blue-2': 'hsl(200, 15%, 8%)',
        'dark-gray': 'hsl(0, 0%, 52%)',
        'very-light-gray': 'hsl(0, 0%, 98%)',
        'white': 'hsl(0, 0%, 100%)'
    },
    fonts: {
        body: `'Nunito sans', sans-serif`
    },
    styles: {
        global: (props) => ({
            body: {
                color: useColorModeValue('very-dark-blue-2', 'white'),
                bg: useColorModeValue('very-light-gray', 'very-dark-blue-1')
            }
        })
    }
})

export default theme