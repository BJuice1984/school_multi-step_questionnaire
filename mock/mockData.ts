export const fetchMockQuestions = () =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    type: 'single',
                    question: 'Какой город является столицей Франции?',
                    options: ['Париж', 'Лондон', 'Берлин', 'Рим'],
                },
                {
                    id: 2,
                    type: 'multiple',
                    question: 'Выберете язык программирования',
                    options: ['JavaScript', 'Python', 'Java', 'Quake 2'],
                },
                {
                    id: 3,
                    type: 'single',
                    question: 'Какой город является столицей Франции?',
                    options: ['Париж', 'Лондон', 'Берлин', 'Рим'],
                },
                {
                    id: 4,
                    type: 'multiple',
                    question: 'Выберете язык программирования',
                    options: ['JavaScript', 'Python', 'Java', 'Quake 2'],
                },
            ])
        }, 1000)
    })
