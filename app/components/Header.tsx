"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; 

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [buscaAberta, setBuscaAberta] = useState(false); 
  const [termoBusca, setTermoBusca] = useState(""); 
  
  const router = useRouter();
  const fecharMenu = () => setMenuAberto(false);

  // Função para executar a pesquisa
  const executarBusca = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (termoBusca.trim() !== "") {
      router.push(`/busca?q=${encodeURIComponent(termoBusca.trim())}`);
      setBuscaAberta(false);
      setTermoBusca("");
    }
  };

  return (
    <header className="bg-[#0B1F3A] text-white border-b-4 border-[#C8A96A] sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex flex-wrap justify-between items-center p-4">
        
        <Link href="/" className="flex items-center gap-1 cursor-pointer" onClick={fecharMenu}>
          <Image src="/icone-tulipa-claro.png" alt="Logo Tulipa" width={48} height={48} className="w-auto h-10 md:h-12 transition-all" priority />
          <span className="font-serif text-xl md:text-2xl font-bold text-[#FFFFFF] tracking-wide transition-all">
            Doutrina <span className="font-serif text-xl md:text-2xl font-bold text-[#C8A96A] tracking-wide transition-all">&</span> Vida
          </span>
        </Link>

        {/* MENU DESKTOP */}
        <ul className="hidden md:flex gap-4 lg:gap-6 text-sm font-medium items-center">
          <li><Link href="/" className="hover:text-[#C8A96A] transition-colors">Início</Link></li>
          <li><Link href="/categoria/devocionais" className="hover:text-[#C8A96A] transition-colors">Devocionais</Link></li>
          <li><Link href="/categoria/cinco-solas" className="hover:text-[#C8A96A] transition-colors">Cinco Solas</Link></li>
          <li><Link href="/categoria/doutrinas-da-graca-tulip" className="hover:text-[#C8A96A] transition-colors">TULIP</Link></li>
          <li><Link href="/categoria/soberania-de-deus" className="hover:text-[#C8A96A] transition-colors">Soberania</Link></li>
          <li><Link href="/categoria/disciplinas-espirituais" className="hover:text-[#C8A96A] transition-colors">Disciplina</Link></li>
          <li><Link href="/categoria/estudos-biblicos" className="hover:text-[#C8A96A] transition-colors">Bíblia</Link></li>
          
          {/* LUPA DE BUSCA (DESKTOP) */}
          <li className="relative flex items-center h-8">
            {buscaAberta ? (
              <form onSubmit={executarBusca} className="flex items-center absolute right-0 bg-white rounded shadow-lg overflow-hidden">
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Pesquisar artigos..." 
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                  className="px-3 py-1.5 text-[#111111] text-sm focus:outline-none w-48"
                />
                <button type="submit" className="bg-[#C8A96A] text-[#0B1F3A] px-3 py-1.5 font-bold hover:bg-[#b0955d] transition-colors">
                  Ir
                </button>
                <button type="button" onClick={() => setBuscaAberta(false)} className="bg-stone-200 text-[#0B1F3A] px-2 py-1.5 hover:bg-stone-300 transition-colors">
                  ✕
                </button>
              </form>
            ) : (
              <button type="button" onClick={() => setBuscaAberta(true)} className="text-[#C8A96A] hover:text-white transition-colors flex items-center" aria-label="Buscar">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
            )}
          </li>
        </ul>

        {/* CONTROLES MOBILE */}
        <div className="flex items-center gap-4 md:hidden">
          <button type="button" onClick={() => setBuscaAberta(!buscaAberta)} className="text-[#C8A96A] focus:outline-none" aria-label="Buscar">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
          </button>
          <button type="button" onClick={() => setMenuAberto(!menuAberto)} className="text-2xl focus:outline-none text-[#C8A96A]">{menuAberto ? "✕" : "☰"}</button>
        </div>

        {/* BARRA DE BUSCA MOBILE */}
        {buscaAberta && (
          <div className="w-full mt-4 md:hidden">
            <form onSubmit={executarBusca} className="flex w-full overflow-hidden rounded">
              <input type="text" placeholder="Pesquisar..." value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)} className="flex-grow px-3 py-2 text-[#111111] focus:outline-none"/>
              <button type="submit" className="bg-[#C8A96A] text-[#0B1F3A] font-bold px-4 py-2 hover:bg-[#b0955d]">Ir</button>
            </form>
          </div>
        )}

        {/* MENU MOBILE EXPANDIDO */}
        {menuAberto && (
          <ul className="w-full flex flex-col gap-4 mt-4 pt-4 border-t border-[#1a365d] text-center md:hidden">
            <li><Link href="/" onClick={fecharMenu} className="hover:text-[#C8A96A] py-2 block">Início</Link></li>
            <li><Link href="/categoria/devocionais" onClick={fecharMenu} className="hover:text-[#C8A96A] py-2 block">Devocionais</Link></li>
            <li><Link href="/categoria/cinco-solas" onClick={fecharMenu} className="hover:text-[#C8A96A] py-2 block">Cinco Solas</Link></li>
            <li><Link href="/categoria/doutrinas-da-graca-tulip" onClick={fecharMenu} className="hover:text-[#C8A96A] py-2 block">TULIP</Link></li>
            <li><Link href="/categoria/soberania-de-deus" onClick={fecharMenu} className="hover:text-[#C8A96A] py-2 block">Soberania de Deus</Link></li>
            <li><Link href="/categoria/depravacao-total" onClick={fecharMenu} className="hover:text-[#C8A96A] py-2 block">Depravação Total</Link></li>
            <li><Link href="/categoria/estudos-biblicos" onClick={fecharMenu} className="hover:text-[#C8A96A] py-2 block">Estudos Bíblicos</Link></li>
          </ul>
        )}
      </nav>
    </header>
  );
}