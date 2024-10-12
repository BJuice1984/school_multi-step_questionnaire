import { useState, useEffect, useRef } from 'react'
import Cookies from 'js-cookie'

function useNickname() {
    const [nickname, setNickname] = useState<string | null>(null)
    const nicknameInputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedNickname = sessionStorage.getItem('nickname')
            if (storedNickname) {
                setNickname(storedNickname)
            }
        }
    }, [])

    const updateNickname = (newNickname: string) => {
        setNickname(newNickname)
        Cookies.set('nickname', newNickname)
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('nickname', newNickname)
        }
    }

    const clearNickname = () => {
        setNickname(null)
        Cookies.remove('nickname')
        if (typeof window !== 'undefined') {
            sessionStorage.removeItem('nickname')
        }
    }

    return {
        nickname,
        setNickname: updateNickname,
        clearNickname,
        nicknameInputRef,
    }
}

export default useNickname
