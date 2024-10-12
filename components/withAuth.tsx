import { useEffect } from 'react'
import { useRouter } from 'next/router'

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    return (props: P) => {
        const router = useRouter()

        useEffect(() => {
            const nickname = sessionStorage.getItem('nickname')
            if (!nickname) {
                router.push('/')
            }
        }, [router])

        return <WrappedComponent {...props} />
    }
}

export default withAuth
