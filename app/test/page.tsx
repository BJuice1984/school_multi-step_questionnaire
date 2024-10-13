import dynamic from 'next/dynamic'
import { Box, Button, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'
import Loading from '@/components/Loading'

const TestForm = dynamic(() => import('@/components/TestForm'), {
    ssr: false,
    loading: () => <Loading />,
})

export default function TestPage() {
    return (
        <Box p={8} textAlign='center'>
            <Heading as='h2' size='md' mb={4} fontFamily='"Inter", sans-serif'>
                Чтобы перейти к следующему вопросу нажмите кнопку &quot;Далее&quot;
            </Heading>
            <Text mb={6}>
                Внимание! После перехода к следующему вопросу у Вас не будет возможности вернуться к
                предыдущему
            </Text>

            <TestForm />

            <Link href='/complete'>
                <Button colorScheme='teal'>Далее</Button>
            </Link>
        </Box>
    )
}
