import { create } from 'zustand'

interface Answer {
    [key: number]: string | string[]
}

interface Question {
    id: number
    type: 'single' | 'multiple' | 'short' | 'long'
    question: string
    options?: string[]
}

interface TestStore {
    currentStep: number
    setStep: (step: number) => void
    answers: Answer
    setAnswer: (step: number, answer: string | string[]) => void
    questions: Question[]
    setQuestions: (questions: Question[]) => void
}

export const useTestStore = create<TestStore>(set => ({
    currentStep: 0,
    answers: {},
    questions: [],
    setStep: step => set({ currentStep: step }),
    setAnswer: (step, answer) =>
        set(state => ({
            answers: { ...state.answers, [step]: answer },
        })),
    setQuestions: questions => set({ questions }),
}))
