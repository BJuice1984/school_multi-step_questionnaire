import { useEffect } from 'react'
import { Answer, useTestStore } from '@/store/useTestStore'

export const useSessionStorage = () => {
    const { setStep, setAnswer } = useTestStore()

    useEffect(() => {
        const savedStep = sessionStorage.getItem('currentStep')
        const savedAnswers = sessionStorage.getItem('answers')

        if (savedStep) {
            setStep(parseInt(savedStep, 10))
        }

        if (savedAnswers) {
            const parsedAnswers = JSON.parse(savedAnswers)
            for (const step in parsedAnswers) {
                setAnswer(parseInt(step, 10), parsedAnswers[step])
            }
        }
    }, [setStep, setAnswer])

    const updateSessionStorage = (newStep: number, updatedAnswers: Answer) => {
        sessionStorage.setItem('currentStep', newStep.toString())
        sessionStorage.setItem('answers', JSON.stringify(updatedAnswers))
    }

    const clearSessionStorage = () => {
        sessionStorage.removeItem('currentStep')
        sessionStorage.removeItem('answers')
        sessionStorage.removeItem('timerStartTime')
    }

    return {
        updateSessionStorage,
        clearSessionStorage,
    }
}
