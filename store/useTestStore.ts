import { create } from 'zustand'

interface TestStore {
    currentStep: number
    setStep: (step: number) => void
    answers: Record<number, any>
    setAnswer: (step: number, answer: any) => void
}

export const useTestStore = create<TestStore>(set => ({
    currentStep: 0,
    answers: {},
    setStep: step => set({ currentStep: step }),
    setAnswer: (step, answer) =>
        set(state => ({
            answers: { ...state.answers, [step]: answer },
        })),
}))
