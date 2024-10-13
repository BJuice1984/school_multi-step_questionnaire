'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Button, HStack, Text } from '@chakra-ui/react'

interface TimerProps {
    duration: number
    onComplete: () => void
}

const Timer = ({ duration, onComplete }: TimerProps) => {
    const [timeLeft, setTimeLeft] = useState(duration)
    const [speedMultiplier, setSpeedMultiplier] = useState(1)
    const router = useRouter()

    useEffect(() => {
        const savedStartTime = sessionStorage.getItem('timerStartTime')
        const now = Date.now()

        if (savedStartTime) {
            const elapsedTime = Math.floor((now - parseInt(savedStartTime)) / 1000)
            const newTimeLeft = duration - elapsedTime
            setTimeLeft(newTimeLeft > 0 ? newTimeLeft : 0)
        } else {
            sessionStorage.setItem('timerStartTime', now.toString())
        }
    }, [duration])

    useEffect(() => {
        if (timeLeft <= 0) {
            onComplete()
            sessionStorage.removeItem('timerStartTime')
            router.push('/complete')
        }
    }, [timeLeft, onComplete, router])

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1)
        }, 1000 / speedMultiplier)

        return () => clearInterval(interval)
    }, [speedMultiplier])

    return (
        <Box>
            {timeLeft >= 0 ? (
                <HStack spacing='24px' p={4} justifyContent='center'>
                    <Text>Оставшееся время: {timeLeft} секунд</Text>
                    <Button
                        colorScheme='teal'
                        variant='solid'
                        onClick={() => setSpeedMultiplier(10)}
                    >
                        Ускорить!
                    </Button>
                </HStack>
            ) : (
                <Text>Время вышло...</Text>
            )}
        </Box>
    )
}

export default Timer
