import { NextResponse } from 'next/server'
import { auth } from './auth'

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const userType = req.auth?.user?.tipoUsuario;
    
    const protectedRoutes = ['/administrativo', '/rrhh'];
    const isProtectedRoute = protectedRoutes.some(route => nextUrl.pathname.startsWith(route));
   
    const validRoutes = [
        '/',
        '/login',
        '/inicio',
        '/administrativo',
        '/rrhh',
        '/403',
        '/404',
    ];
   
    const isValidRoute = validRoutes.some(route =>
        nextUrl.pathname === route ||
        nextUrl.pathname.startsWith(route + '/')
    );
   
    const isStaticFile = nextUrl.pathname.match(/\.(ico|png|jpg|jpeg|gif|css|js|woff|woff2|ttf|eot)$/);
    const isApiRoute = nextUrl.pathname.startsWith('/api');
   
    if (!isValidRoute && !isStaticFile && !isApiRoute) {
        return NextResponse.redirect(new URL('/404', nextUrl));
    };
   
    if (!isLoggedIn && isProtectedRoute) {
        return NextResponse.redirect(new URL('/login', nextUrl));
    };
   
    if (nextUrl.pathname === '/') {
        if (isLoggedIn) {
            if (userType === 'Administrativo') {
                return NextResponse.redirect(new URL('/administrativo', nextUrl));
            } else if (userType === 'Recursos Humanos') {
                return NextResponse.redirect(new URL('/rrhh', nextUrl));
            };
        } else {
            return NextResponse.redirect(new URL('/inicio', nextUrl));
        };
    };
   
    if (isLoggedIn) {
        if (nextUrl.pathname.startsWith('/administrativo') && userType !== 'Administrativo') {
            return NextResponse.redirect(new URL('/403', nextUrl));
        };       
        if (nextUrl.pathname.startsWith('/rrhh') && userType !== 'Recursos Humanos') {
            return NextResponse.redirect(new URL('/403', nextUrl));
        };
    };
    return NextResponse.next();
});

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
};