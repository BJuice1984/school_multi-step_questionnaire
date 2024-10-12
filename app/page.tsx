import { Box, Button, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function Home() {
    return (
        <Box p={8}>
            <Heading mb={4}>Добро пожаловать! Нажмите Начать для прохождения теста</Heading>
            <Text mb={6}>
                Внимание! После начала теста у Вас будет ограниченное время для его прохождения!
                Желаем удачи!
            </Text>
            <Link href='/test'>
                <Button colorScheme='teal'>Начать</Button>
            </Link>
            <Link href='/complete'>
                <Button colorScheme='teal'>Завершить анкету</Button>
            </Link>
        </Box>
    )
}
