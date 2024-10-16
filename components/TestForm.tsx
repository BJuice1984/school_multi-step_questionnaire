'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect } from 'react'
import {
    Box,
    Button,
    Heading,
    Radio,
    RadioGroup,
    Stack,
    Checkbox,
    Text,
    Input,
    Textarea,
} from '@chakra-ui/react'
import { fetchMockQuestions } from '@/mock/mockData'
import { Question, useTestStore } from '@/store/useTestStore'
import { useSessionStorage } from '@/hooks/useSessionStorage'
import { useRouter } from 'next/navigation'
import Timer from '@/components/Timer'

interface FormData {
    answer: string | string[]
}

const TestForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { isValid },
    } = useForm<FormData>({
        mode: 'onChange',
    })
    const {
        currentStep,
        setStep,
        setAnswer,
        answers,
        questions,
        setQuestions,
        isTimerExpired,
        setTimerExpired,
    } = useTestStore()
    const { updateSessionStorage } = useSessionStorage()
    const router = useRouter()

    useEffect(() => {
        fetchMockQuestions().then((data: Question[]) => setQuestions(data))
    }, [setQuestions])

    const onNextStep: SubmitHandler<FormData> = data => {
        const answer = Array.isArray(data.answer) ? data.answer : [data.answer]

        setAnswer(currentStep, answer)

        const newStep = currentStep + 1
        updateSessionStorage(newStep, { ...answers, [currentStep]: answer })

        setStep(newStep)
        reset()

        if (newStep === questions.length) {
            setTimerExpired(true)
            router.push('/complete')
        }
    }

    useEffect(() => {
        if (isTimerExpired) {
            const timeoutId = setTimeout(() => {
                router.push('/complete')
            }, 2000)
            return () => clearTimeout(timeoutId)
        }
    }, [isTimerExpired, router])

    if (!questions.length) {
        return <Box>Загрузка вопросов...</Box>
    }

    const currentQuestion = questions[currentStep]
    const totalSteps = questions.length

    return (
        <>
            <Timer duration={50} />
            {!isTimerExpired ? (
                <Box
                    maxW='600px'
                    mx='auto'
                    p='4'
                    borderWidth='1px'
                    borderRadius='lg'
                    boxShadow='md'
                >
                    <Text mb={2} textAlign='center'>
                        Шаг {currentStep + 1} из {totalSteps}
                    </Text>

                    <form onSubmit={handleSubmit(onNextStep)}>
                        <Heading mb='4' size='lg'>
                            {currentQuestion.question}
                        </Heading>

                        {currentQuestion.type === 'single' && (
                            <RadioGroup>
                                <Stack spacing={3}>
                                    {currentQuestion.options?.map((option: string) => (
                                        <Radio
                                            key={option}
                                            value={option}
                                            {...register('answer', { required: true })}
                                        >
                                            {option}
                                        </Radio>
                                    ))}
                                </Stack>
                            </RadioGroup>
                        )}

                        {currentQuestion.type === 'multiple' && (
                            <Stack spacing={3}>
                                {currentQuestion.options?.map((option: string) => (
                                    <Checkbox
                                        key={option}
                                        value={option}
                                        {...register('answer', { required: true })}
                                    >
                                        {option}
                                    </Checkbox>
                                ))}
                            </Stack>
                        )}

                        {currentQuestion.type === 'short' && (
                            <Input
                                placeholder='Введите короткий ответ'
                                {...register('answer', { required: true })}
                                mt='4'
                                autoFocus
                            />
                        )}

                        {currentQuestion.type === 'long' && (
                            <Textarea
                                placeholder='Введите подробный ответ'
                                {...register('answer', { required: true })}
                                mt='4'
                                rows={6}
                                autoFocus
                            />
                        )}

                        <Button mt='6' colorScheme='teal' type='submit' isDisabled={!isValid}>
                            {currentStep + 1 === questions.length
                                ? 'Отправить на проверку'
                                : 'Далее'}
                        </Button>
                    </form>
                </Box>
            ) : (
                <Box>
                    <Text mt='6' fontSize='lg'>
                        Ожидаем сеть...
                    </Text>
                </Box>
            )}
        </>
    )
}

export default TestForm
