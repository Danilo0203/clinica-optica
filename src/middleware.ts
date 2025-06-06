import { NextResponse, type NextRequest } from "next/server";

// Rutas públicas que no requieren autenticación
const PUBLIC_PATHS = ["/auth"];

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));
  const isAuth = Boolean(accessToken);

  // 🚫 Si la ruta es pública Y el usuario YA está autenticado, redirige al panel
  if (isPublic && isAuth) {
    const panelUrl = request.nextUrl.clone();
    panelUrl.pathname = "/panel";
    return NextResponse.redirect(panelUrl);
  }

  // ✅ Si la ruta es pública y NO está autenticado, deja pasar
  if (isPublic && !isAuth) {
    return NextResponse.next();
  }

  // 🔒 Si la ruta es privada y NO tiene token, redirige al login
  if (!isPublic && !isAuth) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/auth/sign-in";
    return NextResponse.redirect(loginUrl);
  }

  // ✅ Si tiene token y la ruta es privada, deja pasar
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
