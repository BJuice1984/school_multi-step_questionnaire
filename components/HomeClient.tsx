'use client'

import { useState, useEffect, useRef } from 'react'
import { Box, Button, Input, Text, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export default function HomeClient() {
    const [nickname, setNickname] = useState<string | null>(null)
    const nicknameInputRef = useRef<HTMLInputElement | null>(null)
    const router = useRouter()

    useEffect(() => {
        const storedNickname = sessionStorage.getItem('nickname')
        if (storedNickname) {
            setNickname(storedNickname)
        }
    }, [])

    const handleStart = () => {
        if (nickname && nickname.trim() !== '') {
            sessionStorage.setItem('nickname', nickname)
            router.push('/test')
        }
    }

    const handleNicknameChange = () => {
        const newNickname = nicknameInputRef.current?.value || ''
        setNickname(newNickname)
    }

    return (
        <Box>
            <Heading mb={4}>
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
                <Input
                    ref={nicknameInputRef}
                    placeholder='Введите свой никнейм'
                    onChange={handleNicknameChange}
                    mb={4}
                    _placeholder={{ opacity: 1, color: 'gray.500' }}
                />
            )}
            <Button
                colorScheme='teal'
                onClick={handleStart}
                mb={4}
                isDisabled={!nickname || nickname.trim() === ''}
            >
                Начать
            </Button>
        </Box>
    )
}
