"use client";

import { useState } from "react";
// Importamos o motor de login da nossa biblioteca de segurança
import { signIn } from "next-auth/react"; 
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  // Variáveis na memória para guardar o e-mail, a senha e mensagens de erro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  
  const router = useRouter();

  // Função que executa quando clicamos no botão "Entrar"
  const fazerLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede a página de dar aquele "piscar" (recarregar)
    setErro(""); // Limpa qualquer aviso de erro antigo

    // Envia os dados digitados para o nosso "Guarda-Costas" (Credentials)
    const resultado = await signIn("credentials", {
      redirect: false, // Dizemos para ele não mudar de página sozinho se der erro
      email: email,
      password: password,
    });

    if (resultado?.error) {
      // Se a senha estiver errada, mostramos este texto vermelho na tela
      setErro("E-mail ou senha incorretos."); 
    } else {
      // Se a senha estiver certa, mandamos você para a área administrativa!
      router.push("/admin/novo-sermao"); 
      router.refresh(); 
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-4">
      
      
      <div className="absolute top-8 left-8">
        <Link href="/" className="text-stone-500 hover:text-[#0B1F3A] font-medium transition-colors flex items-center gap-2">
          <span>&larr;</span> Voltar ao Início
        </Link>
      </div>

      
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-stone-200 text-center">
        <div className="flex justify-center mb-6">
          <Image src="/icone-tulipa-claro.png" alt="Tulipa Dourada" width={64} height={64} />
        </div>

        <h1 className="text-3xl font-serif font-bold text-[#0B1F3A] mb-2">Doutrina & Vida</h1>
        <p className="text-stone-500 mb-8 text-sm">Acesse o painel administrativo</p>

        
        {erro && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm font-bold">
            {erro}
          </div>
        )}

        
        <form onSubmit={fazerLogin} className="flex flex-col gap-5 text-left">
          
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-bold text-[#111111]">E-mail</label>
            <input 
              type="email" 
              id="email" 
              required 
              value={email} // O campo fica conectado à variável
              onChange={(e) => setEmail(e.target.value)} // Atualiza a variável enquanto você digita
              className="border border-stone-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#C8A96A]" 
              placeholder="seu@email.com" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-bold text-[#111111]">Senha</label>
            <input 
              type="password" 
              id="password" 
              required 
              value={password} // O campo fica conectado à variável
              onChange={(e) => setPassword(e.target.value)} // Atualiza a variável enquanto você digita
              className="border border-stone-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#C8A96A]" 
              placeholder="••••••••" 
            />
          </div>

          <button type="submit" className="w-full bg-[#0B1F3A] text-white font-bold text-base py-3 rounded hover:bg-[#1a365d] transition-colors mt-2">
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}