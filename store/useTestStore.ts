import { create } from 'zustand'

export interface Answer {
    [key: number]: string | string[]
}

export interface Question {
    id: number
    type: 'single' | 'multiple' | 'short' | 'long'
    question: string
    options?: string[]
}

interface TestStore {
    currentStep: number
    setStep: (step: number) => void
    resetStep: () => void
    answers: Answer
    setAnswer: (step: number, answer: string | string[]) => void
    questions: Question[]
    setQuestions: (questions: Question[]) => void
    isTimerExpired: boolean
    setTimerExpired: (expired: boolean) => void
}

export const useTestStore = create<TestStore>(set => ({
    currentStep: 0,
    answers: {},
    questions: [],
    isTimerExpired: false,
    setTimerExpired: expired => set({ isTimerExpired: expired }),
    setStep: step => set({ currentStep: step }),
    resetStep: () => set({ currentStep: 0, isTimerExpired: false }),
    setAnswer: (step, answer) =>
        set(state => ({
            answers: { ...state.answers, [step]: answer },
        })),
    setQuestions: questions => set({ questions }),
}))
