import { prisma } from "../../../lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

// O Next.js passa o [slug] da URL através dos params (como uma Promise)
export default async function ArtigoDetalhePage({ params }: { params: Promise<{ slug: string }> }) {
  
  // 1. "Desempacotamos" a URL para extrair o slug
  const { slug } = await params;

  // 2. Busca o artigo específico, trazendo junto o Autor e a Categoria
  const artigo = await prisma.post.findUnique({
    where: { slug: slug },
    include: {
      author: true,
      category: true,
    }
  });

  // 3. Se alguém digitar um link que não existe, mostra a página 404
  if (!artigo) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-stone-200">
        
        {/* Botão de voltar */}
        <div className="mb-10">
          <Link href="/artigos" className="text-stone-500 hover:text-[#C8A96A] font-medium transition-colors inline-flex items-center gap-2">
            <span>&larr;</span> Voltar para os artigos
          </Link>
        </div>

        {/* Cabeçalho do Artigo */}
        <header className="mb-10 text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <span className="text-xs font-bold bg-stone-100 text-[#0B1F3A] px-3 py-1 rounded-full uppercase tracking-wider">
              {artigo.category.name}
            </span>
            <span className="text-sm font-medium text-stone-500">
              {new Date(artigo.createdAt).toLocaleDateString('pt-BR')}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1F3A] mb-6 leading-tight">
            {artigo.title}
          </h1>
          
          <div className="text-stone-500 font-medium">
            Por <span className="text-[#0B1F3A] font-bold">{artigo.author.name}</span>
          </div>
        </header>

        {/* Imagem de Capa (se existir) */}
        {artigo.imageUrl && (
          <div className="w-full h-64 md:h-96 mb-10 rounded-lg overflow-hidden shadow-md">
            <img src={artigo.imageUrl} alt={artigo.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* O texto principal do artigo */}
        <div className="prose prose-stone max-w-none text-stone-700 text-lg leading-relaxed whitespace-pre-wrap">
          {artigo.content}
        </div>

      </div>
    </main>
  );
}