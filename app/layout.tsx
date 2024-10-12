import { Providers } from './providers'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

const geistSans = localFont({
    src: '../styles/fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
})
const geistMono = localFont({
    src: '../styles/fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
})

export const metadata: Metadata = {
    title: 'Многоступенчатая школьная тестовая анкета',
    description: 'Тестовая анкета для школьников для проверки и подготовке к ЕГЭ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='ru'>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
