import NextAuthMiddleware from "next-auth/middleware";

// Criamos uma função explícita para o Next.js
export default function middleware(req: any) {
  return NextAuthMiddleware(req);
}

// Continuamos a proteger as rotas da área administrativa
export const config = {
  matcher: ["/admin/:path*"],
};