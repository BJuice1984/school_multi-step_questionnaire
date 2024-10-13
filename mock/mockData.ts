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
                    type: 'short',
                    question: 'Назовите планету, на которой мы живем',
                },
                {
                    id: 4,
                    type: 'long',
                    question: 'Опишите ваши впечатления от изучения программирования',
                },
            ])
        }, 1000)
    })
