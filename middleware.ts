import { NextResponse } from 'next/server'
import { auth } from './auth'

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth
    const userType = req.auth?.user?.tipoUsuario

    const protectedRoutes = ['/administrativo', '/rrhh']
    const isProtectedRoute = protectedRoutes.some(route => nextUrl.pathname.startsWith(route))

    if (!isLoggedIn && isProtectedRoute) {
        return NextResponse.redirect(new URL('/login', nextUrl))
    };

    if (isLoggedIn && nextUrl.pathname === '/') {
        if (userType === 'Administrativo') {
            return NextResponse.redirect(new URL('/administrativo', nextUrl))
        } else if (userType === 'Recursos Humanos') {
            return NextResponse.redirect(new URL('/rrhh', nextUrl))
        } else {
            return NextResponse.redirect(new URL('/inicio', nextUrl))
        };
    };

    if (isLoggedIn) {
        if (nextUrl.pathname.startsWith('/administrativo') && userType !== 'Administrativo') {
            return NextResponse.redirect(new URL('/403', nextUrl))
        };
        
        if (nextUrl.pathname.startsWith('/rrhh') && userType !== 'Recursos Humanos') {
            return NextResponse.redirect(new URL('/403', nextUrl))
        };
    };

    return NextResponse.next()
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
};