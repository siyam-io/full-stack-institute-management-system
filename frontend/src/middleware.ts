import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['en', 'bn'] as const;
const DEFAULT_LOCALE = 'en';

function normalizeLocale(value?: string | null) {
  return value === 'bn' ? 'bn' : DEFAULT_LOCALE;
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/professional-chef-course-basic-to-advance')) {
    return NextResponse.next();
  }

  const prefixedLocale = LOCALES.find((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  if (prefixedLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(new RegExp(`^/${prefixedLocale}`), '') || '/';
    const response = NextResponse.redirect(url);
    response.cookies.set('cib_locale', prefixedLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    return response;
  }

  const locale = normalizeLocale(request.cookies.get('cib_locale')?.value);
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|professional-chef-course-basic-to-advance|.*\\..*).*)'],
};
