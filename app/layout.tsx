import { Providers } from './providers'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({
    subsets: ['latin'],
    weight: '400',
})

export const metadata: Metadata = {
    title: 'Многоступенчатая школьная тестовая анкета',
    description: 'Тестовая анкета для школьников для проверки и подготовке к ЕГЭ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='ru' className={inter.className}>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
