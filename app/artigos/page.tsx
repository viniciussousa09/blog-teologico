import { prisma } from "../../lib/prisma";
import Link from "next/link";

export default async function ArtigosPublicosPage() {
  // Busca todos os artigos publicados, ordenados do mais recente para o mais antigo
  // O "include" é a magia que traz os dados do autor e da categoria juntos!
  const artigos = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: {
      author: true,
      category: true,
    }
  });

  return (
    <main className="min-h-screen bg-stone-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabeçalho da página */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1F3A] mb-4">Artigos e Reflexões</h1>
          <p className="text-stone-500 max-w-2xl mx-auto text-lg">
            Edificação, teologia e vida cristã. Leia os nossos textos e aprofunde a sua fé.
          </p>
        </div>

        {/* Verificação: Se a lista estiver vazia */}
        {artigos.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-stone-200 shadow-sm">
            <p className="text-stone-500 text-lg">Ainda não há artigos publicados. Volte em breve!</p>
          </div>
        ) : (
          /* Grelha de Artigos */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artigos.map((artigo) => (
              <article key={artigo.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-stone-200 flex flex-col h-full">
                
                {/* Se houver imagem de capa, mostra a imagem */}
                {artigo.imageUrl ? (
                  <div className="h-48 w-full bg-stone-200 overflow-hidden">
                    <img src={artigo.imageUrl} alt={artigo.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  /* Se não houver imagem, mostra um bloco com a cor do site */
                  <div className="h-48 w-full bg-[#1a365d] flex items-center justify-center">
                    <span className="text-[#C8A96A] text-4xl opacity-50 font-serif">D&V</span>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  
                  {/* Categoria e Data */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold bg-stone-100 text-[#0B1F3A] px-3 py-1 rounded-full uppercase tracking-wider">
                      {artigo.category.name}
                    </span>
                    <span className="text-xs font-medium text-stone-400">
                      {new Date(artigo.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  
                  {/* Título */}
                  <h2 className="text-2xl font-serif font-bold text-[#0B1F3A] mb-3 leading-tight">
                    {artigo.title}
                  </h2>
                  
                  {/* Resumo */}
                  {artigo.excerpt && (
                    <p className="text-stone-600 mb-6 line-clamp-3">
                      {artigo.excerpt}
                    </p>
                  )}
                  
                  {/* Rodapé do Cartão (Autor e Botão) */}
                  <div className="mt-auto pt-4 border-t border-stone-100 flex justify-between items-center">
                    <div className="text-sm font-medium text-stone-500">
                      Por <span className="text-[#0B1F3A] font-bold">{artigo.author.name}</span>
                    </div>
                    {/* O link aponta para o "slug" (o endereço amigável) */}
                    <Link 
                      href={`/artigos/${artigo.slug}`} 
                      className="text-[#C8A96A] font-bold hover:text-[#0B1F3A] transition-colors"
                    >
                      Ler &rarr;
                    </Link>
                  </div>
                  
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}