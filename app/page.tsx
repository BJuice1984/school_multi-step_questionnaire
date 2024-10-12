import { Box, Heading } from '@chakra-ui/react'
import HomeClient from '@/components/HomeClient'

export default function Home() {
    return (
        <Box p={8}>
            <Heading as='h1' size='xl' mb={4}>
                Тест для проверки и подготовки к ЕГЭ
            </Heading>
            <HomeClient />
        </Box>
    )
}
