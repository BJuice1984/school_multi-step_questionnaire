import { Providers } from './providers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Многоступенчатая школьная тестовая анкета',
    description: 'Тестовая анкета для школьников для проверки и подготовке к ЕГЭ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='ru'>
            <head>
                <link
                    href='https://fonts.googleapis.com/css2?family=Inter:wght@100;400;700;900&display=swap'
                    rel='stylesheet'
                />
            </head>
            <body className='antialiased'>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
