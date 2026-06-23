import Link from "next/link";
import { prisma } from "../lib/prisma";

export default async function HomePage() {
  // 1. Busca os 3 artigos mais recentes
  const ultimosArtigos = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 3,
    include: { category: true }
  });

  // 2. Busca os 3 sermões mais recentes
  const ultimosSermoes = await prisma.sermon.findMany({
    orderBy: { date: 'desc' },
    take: 3,
  });

  return (
    <main className="min-h-screen bg-stone-50 py-16 px-4">
      {/* O MESMO container delicado do código que você colou */}
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-stone-200">
        
        {/* --- SEÇÃO 1: PERFIL DA AUTORA --- */}
        <div className="flex flex-col items-center text-center mb-16 border-b border-stone-100 pb-12">
          
          <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-white shadow-md bg-stone-100">
            {/* ONDE COLOCAR A SUA FOTO: Coloque a imagem na pasta 'public' do projeto e mude o nome aqui */}
            <img src="/foto-autora.jpg" alt="Autora do Blog" className="w-full h-full object-cover object-top" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#0B1F3A] mb-3">
            Doutrina & Vida
          </h1>
          <p className="text-stone-500 font-medium text-lg leading-relaxed max-w-lg mx-auto">
            Um espaço dedicado ao estudo da Palavra de Deus, reflexões teológicas e edificação para a vida cristã.
          </p>
        </div>

        {/* --- SEÇÃO 2: ÚLTIMOS ARTIGOS --- */}
        <div className="mb-14">
          <div className="flex justify-between items-end mb-8 border-b border-stone-100 pb-2">
            <h2 className="text-2xl font-serif font-bold text-[#0B1F3A]">Últimos Artigos</h2>
            <Link href="/artigos" className="text-[#C8A96A] text-sm font-bold hover:text-[#0B1F3A] transition-colors">
              Ver todos &rarr;
            </Link>
          </div>
          
          <div className="flex flex-col gap-6">
            {ultimosArtigos.map((artigo) => (
              <Link href={`/artigos/${artigo.slug}`} key={artigo.id} className="group flex flex-col sm:flex-row gap-5 items-center sm:items-start p-4 hover:bg-stone-50 rounded-lg transition-colors border border-transparent hover:border-stone-100">
                {/* Imagem em formato quadrado delicado */}
                {artigo.imageUrl ? (
                  <div className="w-full sm:w-28 h-40 sm:h-28 rounded-md overflow-hidden shrink-0 shadow-sm">
                    <img src={artigo.imageUrl} alt={artigo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="w-full sm:w-28 h-40 sm:h-28 rounded-md bg-[#1a365d] flex items-center justify-center shrink-0 shadow-sm">
                    <span className="text-[#C8A96A] text-xl opacity-50 font-serif">D&V</span>
                  </div>
                )}
                
                <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
                  <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">
                    {artigo.category?.name || 'Geral'}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#0B1F3A] group-hover:text-[#C8A96A] transition-colors mb-2">
                    {artigo.title}
                  </h3>
                  <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed">{artigo.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* --- SEÇÃO 3: ÚLTIMAS PREGAÇÕES --- */}
        <div>
          <div className="flex justify-between items-end mb-8 border-b border-stone-100 pb-2">
            <h2 className="text-2xl font-serif font-bold text-[#0B1F3A]">Mensagens Recentes</h2>
            <Link href="/sermoes" className="text-[#C8A96A] text-sm font-bold hover:text-[#0B1F3A] transition-colors">
              Ver todas &rarr;
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {ultimosSermoes.map((sermao) => (
              <Link href={`/sermoes/${sermao.id}`} key={sermao.id} className="group flex items-center justify-between p-4 bg-stone-50 hover:bg-[#0B1F3A] rounded-lg transition-colors border border-stone-100">
                <div>
                  <div className="text-xs font-medium text-stone-400 group-hover:text-stone-300 mb-1">
                    {new Date(sermao.date).toLocaleDateString('pt-BR')}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#0B1F3A] group-hover:text-[#C8A96A] transition-colors">
                    {sermao.title}
                  </h3>
                </div>
                <div className="text-stone-400 group-hover:text-white pl-4">
                  &rarr;
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}