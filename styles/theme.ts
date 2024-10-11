import { extendTheme } from '@chakra-ui/react'

export const questionnaireTheme = extendTheme({
    styles: {
        global: {
            'html, body': {
                backgroundColor: 'gray.50',
                color: 'gray.800',
            },
        },
    },
})
