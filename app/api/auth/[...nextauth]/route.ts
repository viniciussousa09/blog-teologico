import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        console.log("--- INICIANDO TENTATIVA DE LOGIN ---");
        
        if (!credentials?.email || !credentials?.password) {
          console.log("Falha: E-mail ou senha não foram enviados.");
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          console.log("Falha: Este e-mail NÃO FOI ENCONTRADO.");
          return null;
        }

        // NOVO: Isolamos a senha numa variável para o TypeScript entender melhor
        const senhaDoBanco = (user as any).password;

        if (!senhaDoBanco) {
          console.log("Falha: Utilizador encontrado, mas NÃO TEM SENHA cadastrada.");
          return null;
        }

        // ATUALIZADO: Usamos a nossa variável isolada 'senhaDoBanco'
        const isPasswordValid = await bcrypt.compare(credentials.password, senhaDoBanco);

        if (!isPasswordValid) {
          console.log("Falha: A senha digitada NÃO CORRESPONDE.");
          return null;
        }

        console.log("SUCESSO: E-mail e senha corretos!");
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
    })
  ],
  pages: {
    signIn: '/login', 
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };