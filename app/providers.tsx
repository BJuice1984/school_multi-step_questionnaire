'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { questionnaireTheme } from '@/styles/theme'

export function Providers({ children }: { children: React.ReactNode }) {
    return <ChakraProvider theme={questionnaireTheme}>{children}</ChakraProvider>
}
