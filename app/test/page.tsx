import { Box, Button, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function TestPage() {
    return (
        <Box p={8} textAlign='center'>
            <Heading mb={4}>Вопрос №1</Heading>
            <Text mb={6}>2+2</Text>
            <Link href='/'>
                <Button colorScheme='teal'>Далее</Button>
            </Link>
        </Box>
    )
}
