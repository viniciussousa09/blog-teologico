import { prisma } from "../../lib/prisma";
import Link from "next/link";

export default async function SermoesPublicosPage() {
  // Busca todos os sermões no banco, ordenados por data (do mais novo para o mais velho)
  const sermoes = await prisma.sermon.findMany({
    orderBy: {
      date: 'desc'
    }
  });

  return (
    <main className="min-h-screen bg-stone-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Cabeçalho da página */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1F3A] mb-4">Sermões e Pregações</h1>
          <p className="text-stone-500 max-w-2xl mx-auto text-lg">
            Acompanhe as mensagens ministradas, estude a Palavra e aprofunde o seu conhecimento nas Escrituras.
          </p>
        </div>

        {/* Verificação: Se a lista estiver vazia */}
        {sermoes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-stone-200 shadow-sm">
            <p className="text-stone-500 text-lg">Ainda não há sermões publicados. Volte em breve!</p>
          </div>
        ) : (
          /* Grelha de Sermões */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sermoes.map((sermao) => (
              <article key={sermao.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone-200 flex flex-col h-full">
                <div className="p-6 flex flex-col flex-1">
                  
                  {/* Data formatada */}
                  <div className="text-sm font-bold text-[#C8A96A] mb-3 uppercase tracking-wider">
                    {new Date(sermao.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </div>
                  
                  {/* Título */}
                  <h2 className="text-xl font-serif font-bold text-[#0B1F3A] mb-3 leading-tight">
                    {sermao.title}
                  </h2>
                  
                  {/* Descrição opcional */}
                  {sermao.description && (
                    <p className="text-stone-600 mb-6 line-clamp-3">
                      {sermao.description}
                    </p>
                  )}
                  
                  {/* Botão de Ler Mais (empurrado para o fundo do cartão) */}
                  <div className="mt-auto pt-4 border-t border-stone-100">
                    <Link 
                      href={`/sermoes/${sermao.id}`} 
                      className="text-[#0B1F3A] font-bold hover:text-[#C8A96A] transition-colors flex items-center gap-2"
                    >
                      Ler mensagem completa <span>&rarr;</span>
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