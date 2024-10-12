import dynamic from 'next/dynamic'
import { Box, Heading, Spinner } from '@chakra-ui/react'

const Loading = () => (
    <Box textAlign='center' p={8}>
        <Spinner size='xl' />
        <Box mt={4}>Загрузка...</Box>
    </Box>
)

const HomeClient = dynamic(() => import('@/components/HomeClient'), {
    ssr: false,
    loading: () => <Loading />,
})

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
