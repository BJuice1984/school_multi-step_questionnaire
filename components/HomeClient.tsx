'use client'

import { useState, useEffect, useRef } from 'react'
import {
    Box,
    Button,
    Input,
    Text,
    Heading,
    FormControl,
    FormHelperText,
    Stack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function HomeClient() {
    const [nickname, setNickname] = useState<string | null>(
        sessionStorage.getItem('nickname') ?? null
    )
    const nicknameInputRef = useRef<HTMLInputElement | null>(null)
    const router = useRouter()

    useEffect(() => {
        const storedNickname = sessionStorage.getItem('nickname')
        if (storedNickname) {
            setNickname(storedNickname)
        }
    }, [])

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = useForm()

    const onSubmit = () => {
        const newNickname = nicknameInputRef.current?.value || ''

        if (newNickname && newNickname.trim() !== '') {
            setNickname(newNickname)
            Cookies.set('nickname', newNickname)
            sessionStorage.setItem('nickname', newNickname)
        }
    }

    const onExit = () => {
        setNickname(null)
        Cookies.remove('nickname')
        sessionStorage.removeItem('nickname')
    }

    return (
        <Box>
            <Heading as='h2' size='md' mb={4}>
                {nickname && nickname.trim() !== ''
                    ? `Добро пожаловать, ${nickname}! Нажмите Начать для прохождения теста`
                    : 'Добро пожаловать! Придумайте свой ник'}
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
                        <FormHelperText>Введите свой никнейм</FormHelperText>
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
                    onClick={() => onExit()}
                    mb={4}
                    isDisabled={!nickname || nickname.trim() === ''}
                >
                    Выход
                </Button>
            </Stack>
        </Box>
    )
}
