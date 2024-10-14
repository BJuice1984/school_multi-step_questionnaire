import { NextRequest, NextResponse } from 'next/server'

export function checkAuth(request: NextRequest) {
    const nickname = request.cookies.get('nickname')?.value

    if (!nickname) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}
