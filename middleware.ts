import { checkAuth } from '@/lib/auth'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    return checkAuth(request)
}

export const config = {
    matcher: ['/test', '/complete'],
}
