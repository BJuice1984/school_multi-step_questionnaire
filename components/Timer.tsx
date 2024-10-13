'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface TimerProps {
    duration: number
    onComplete: () => void
}

const Timer = ({ duration, onComplete }: TimerProps) => {
    const [timeLeft, setTimeLeft] = useState(duration)
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
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div>
            <p>Оставшееся время: {timeLeft} секунд</p>
        </div>
    )
}

export default Timer
