import { Box, Heading } from '@chakra-ui/react'
import HomeClient from '@/components/HomeClient'

export default function Home() {
    return (
        <Box p={8}>
            <Heading as='h1' size='xl' textAlign='center' mb={8} fontFamily='"Inter", sans-serif'>
                Тест для проверки и подготовки к ЕГЭ
            </Heading>
            <HomeClient />
        </Box>
    )
}
