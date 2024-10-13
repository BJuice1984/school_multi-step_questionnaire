'use client'

import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Box, Button, Heading, Radio, RadioGroup, Stack, Checkbox } from '@chakra-ui/react'
import { fetchMockQuestions } from '@/mock/mockData'
import { useTestStore } from '@/store/useTestStore'
import { useRouter } from 'next/navigation'

const TestForm = () => {
    const { register, handleSubmit, reset } = useForm()
    const [questions, setQuestions] = useState<any[]>([])
    const { currentStep, setStep, setAnswer } = useTestStore()
    const router = useRouter()

    useEffect(() => {
        fetchMockQuestions().then((data: any) => setQuestions(data))
    }, [])

    const onNextStep = (data: any) => {
        setAnswer(currentStep, data)
        setStep(currentStep + 1)
        reset()

        if (currentStep === questions.length - 1) {
            router.push('/complete')
        }
    }

    if (!questions.length) {
        return <Box>Загрузка вопросов...</Box>
    }

    const currentQuestion = questions[currentStep]
    console.log('🚀 ~ TestForm ~ currentQuestion:', currentQuestion)

    return (
        <Box maxW='600px' mx='auto' p='4' borderWidth='1px' borderRadius='lg' boxShadow='md'>
            {currentQuestion && (
                <form onSubmit={handleSubmit(onNextStep)}>
                    <Heading mb='4' size='lg'>
                        {currentQuestion.question}
                    </Heading>

                    {currentQuestion.type === 'single' && (
                        <RadioGroup>
                            <Stack spacing={3}>
                                {currentQuestion.options.map((option: string) => (
                                    <Radio key={option} value={option} {...register('answer')}>
                                        {option}
                                    </Radio>
                                ))}
                            </Stack>
                        </RadioGroup>
                    )}

                    {currentQuestion.type === 'multiple' && (
                        <Stack spacing={3}>
                            {currentQuestion.options.map((option: string) => (
                                <Checkbox key={option} value={option} {...register('answer')}>
                                    {option}
                                </Checkbox>
                            ))}
                        </Stack>
                    )}

                    <Button mt='6' colorScheme='teal' type='submit'>
                        {currentStep === questions.length - 1 ? 'Отправить на проверку' : 'Далее'}
                    </Button>
                </form>
            )}
        </Box>
    )
}

export default TestForm
