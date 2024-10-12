import { Box, Button, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function CompletePage() {
    return (
        <Box p={8} textAlign='center'>
            <Heading mb={4}>Анкета завершена!</Heading>
            <Text mb={6}>
                Спасибо за Ваше участие. Ваши ответы были успешно отправлены на проверку.
            </Text>
            <Link href='/'>
                <Button colorScheme='teal'>Вернуться на главную</Button>
            </Link>
        </Box>
    )
}
