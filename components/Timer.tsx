'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Button, Stack, Text } from '@chakra-ui/react'

interface TimerProps {
    duration: number
    speedMultiplier?: number
    onComplete: () => void
}

const Timer = ({ duration, onComplete }: TimerProps) => {
    const [timeLeft, setTimeLeft] = useState(duration)
    const [speedMultiplier, setSpeedMultiplier] = useState(1)
    const router = useRouter()

    useEffect(() => {
        if (timeLeft <= 0) {
            onComplete()
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
                <Box>
                    <Text>Оставшееся время: {timeLeft} секунд</Text>
                    <Button
                        colorScheme='teal'
                        variant='solid'
                        onClick={() => setSpeedMultiplier(10)}
                    >
                        Ускорить!
                    </Button>
                </Box>
            ) : (
                <Text>Время вышло...</Text>
            )}
        </Box>
    )
}

export default Timer
