"use client";

import Link from "next/link";
import { signOut } from "next-auth/react"; // Ferramenta para fazer logout
import { usePathname } from "next/navigation"; // Ferramenta para saber a página atual

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Guardamos o endereço atual (ex: "/admin/novo-sermao") numa variável
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-stone-50 overflow-hidden">
      
      {/* --- NOSSA BARRA LATERAL (SIDEBAR) --- */}
      <aside className="w-64 bg-[#0B1F3A] text-white p-6 flex flex-col shadow-xl z-10">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-serif font-bold text-[#C8A96A]">Painel</h2>
          <p className="text-xs text-stone-400 mt-1">Doutrina & Vida</p>
        </div>

        <nav className="flex flex-col gap-3 flex-1">
          {/* Link para Artigos */}
          <Link
            href="/admin/novo-artigo"
            className={`p-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
              pathname === "/admin/novo-artigo" 
                ? "bg-[#1a365d] border-l-4 border-[#C8A96A] text-white" 
                : "text-stone-300 hover:bg-[#1a365d] hover:text-white"
            }`}
          >
            <span>📝</span> Novo Artigo
          </Link>
          <Link
            href="/admin/gerenciar-artigos"
            className={`p-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
              pathname === "/admin/gerenciar-artigos" 
                ? "bg-[#1a365d] border-l-4 border-[#C8A96A] text-white" 
                : "text-stone-300 hover:bg-[#1a365d] hover:text-white"
            }`}
          >
            <span>⚙️</span> Gerenciar Artigos
          </Link>

          {/* Link para Sermões */}
          <Link
            href="/admin/novo-sermao"
            className={`p-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
              pathname === "/admin/novo-sermao" 
                ? "bg-[#1a365d] border-l-4 border-[#C8A96A] text-white" 
                : "text-stone-300 hover:bg-[#1a365d] hover:text-white"
            }`}
          >
            <span>🎙️</span> Novo Sermão
          </Link>

          <Link
            href="/admin/gerenciar-sermoes"
            className={`p-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
              pathname === "/admin/gerenciar-sermoes" 
                ? "bg-[#1a365d] border-l-4 border-[#C8A96A] text-white" 
                : "text-stone-300 hover:bg-[#1a365d] hover:text-white"
            }`}
          >
            <span>🎙️</span> Gerenciar Sermões
          </Link>
        </nav>

        {/* Botão de Sair (Logout) */}
        <div className="mt-auto pt-6 border-t border-[#1a365d]">
          <button
            // A função signOut destroi a sessão e redireciona para a home "/"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full bg-red-600/90 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition-colors flex justify-center items-center gap-2"
          >
            <span>🚪</span> Sair do Sistema
          </button>
        </div>
      </aside>

      {/* --- ÁREA PRINCIPAL (Onde o formulário aparece) --- */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      
    </div>
  );
}