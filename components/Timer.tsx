'use client'

import { useEffect, useState } from 'react'
import { Box, Button, HStack, Text } from '@chakra-ui/react'
import { useSessionStorage } from '@/hooks/useSessionStorage'

interface TimerProps {
    duration: number
    onComplete: () => void
}

const Timer = ({ duration, onComplete }: TimerProps) => {
    const [timeLeft, setTimeLeft] = useState(duration)
    const [speedMultiplier, setSpeedMultiplier] = useState(1)
    const { updateTimerStartTime, clearTimerStartTime } = useSessionStorage()

    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600)
        const minutes = Math.floor((totalSeconds % 3600) / 60)
        const seconds = totalSeconds % 60

        const formattedHours = String(hours).padStart(2, '0')
        const formattedMinutes = String(minutes).padStart(2, '0')
        const formattedSeconds = String(seconds).padStart(2, '0')

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    }

    useEffect(() => {
        const savedStartTime = sessionStorage.getItem('timerStartTime')
        const now = Date.now()

        if (savedStartTime) {
            const elapsedTime = Math.floor((now - parseInt(savedStartTime)) / 1000)
            const newTimeLeft = duration - elapsedTime
            setTimeLeft(newTimeLeft > 0 ? newTimeLeft : 0)
        } else {
            updateTimerStartTime(now)
        }
    }, [duration, updateTimerStartTime])

    useEffect(() => {
        if (timeLeft <= 0) {
            onComplete()
            clearTimerStartTime()
        }
    }, [timeLeft, onComplete, clearTimerStartTime])

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
                    <Text color={timeLeft < 15 ? 'red.500' : 'black'}>
                        Оставшееся время: {formatTime(timeLeft)}
                    </Text>
                    <Button
                        colorScheme='teal'
                        variant='solid'
                        onClick={() => setSpeedMultiplier(10)}
                    >
                        Ускорить!
                    </Button>
                </HStack>
            ) : (
                <Text fontSize='lg' color='tomato'>
                    Время вышло...
                </Text>
            )}
        </Box>
    )
}

export default Timer
