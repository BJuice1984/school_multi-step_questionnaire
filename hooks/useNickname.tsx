import { useState, useEffect, useRef } from 'react'
import Cookies from 'js-cookie'

function useNickname() {
    const [nickname, setNickname] = useState<string | null>(null)
    const nicknameInputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        const storedNickname = Cookies.get('nickname')
        if (storedNickname) {
            setNickname(storedNickname)
        }
    }, [])

    const updateNickname = (newNickname: string) => {
        setNickname(newNickname)
        Cookies.set('nickname', newNickname)
    }

    const clearNickname = () => {
        setNickname(null)
        Cookies.remove('nickname')
    }

    return {
        nickname,
        setNickname: updateNickname,
        clearNickname,
        nicknameInputRef,
    }
}

export default useNickname
