'use client'

import { Box, Button, Input, Text, Heading, FormControl, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import useNickname from '@/hooks/useNickname'
import { useSessionStorage } from '@/hooks/useSessionStorage'

export default function HomeClient() {
    const { nickname, setNickname, clearNickname, nicknameInputRef } = useNickname()
    const router = useRouter()
    const { clearSessionStorage } = useSessionStorage()

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = useForm()

    const onSubmit = () => {
        const newNickname = nicknameInputRef.current?.value || ''

        if (newNickname && newNickname.trim() !== '') {
            setNickname(newNickname)
        }
    }

    const onExit = () => {
        clearSessionStorage()
        clearNickname()
    }

    return (
        <Box>
            <Heading as='h2' size='md' mb={4} fontFamily='"Inter", sans-serif'>
                {nickname && nickname.trim() !== '' ? (
                    <>
                        Добро пожаловать,{' '}
                        <Text as='span' color='teal.500' fontWeight='bold'>
                            {nickname}
                        </Text>
                        ! Нажмите кнопку &quot;Начать&quot; для прохождения теста
                    </>
                ) : (
                    'Добро пожаловать! Придумайте свой ник'
                )}
            </Heading>
            <Text mb={6}>
                {nickname && nickname.trim() !== ''
                    ? 'Внимание! После начала теста у Вас будет ограниченное время для его прохождения! Желаем удачи!'
                    : ''}
            </Text>
            {!nickname && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                        <Stack direction='row' spacing={4}>
                            <Input
                                ref={nicknameInputRef}
                                placeholder='Введите свой никнейм'
                                mb={4}
                                _placeholder={{ opacity: 1, color: 'gray.500' }}
                            />
                            <Button
                                isLoading={isSubmitting}
                                colorScheme='teal'
                                variant='solid'
                                type='submit'
                            >
                                Ok
                            </Button>
                        </Stack>
                    </FormControl>
                </form>
            )}
            <Stack direction='row' spacing={4}>
                <Button
                    colorScheme='teal'
                    onClick={() => router.push('/test')}
                    mb={4}
                    isDisabled={!nickname || nickname.trim() === ''}
                >
                    Начать
                </Button>

                <Button
                    colorScheme='teal'
                    onClick={() => {
                        onExit()
                    }}
                    mb={4}
                    isDisabled={!nickname || nickname.trim() === ''}
                >
                    Выход
                </Button>
            </Stack>
        </Box>
    )
}
