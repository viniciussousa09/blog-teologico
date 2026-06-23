import { prisma } from "../../../lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SermaoDetalhePage({ params }: { params: Promise<{ id: string }> }) {
  
  // 1. "Desempacotamos" a URL para garantir que o ID já carregou completamente
  const { id } = await params;

  // 2. Busca o sermão específico pelo ID correto
  const sermao = await prisma.sermon.findUnique({
    where: { id: id },
  });

  // 3. Se alguém digitar um link que não existe, mostra a página 404 de erro oficial
  if (!sermao) {
    notFound();
  }

  // 4. Função inteligente para extrair o ID do vídeo do YouTube (para o tocador)
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const youtubeId = sermao.videoUrl ? getYouTubeId(sermao.videoUrl) : null;

  return (
    <main className="min-h-screen bg-stone-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-sm border border-stone-200">
        
        {/* Botão de voltar */}
        <div className="mb-10">
          <Link href="/sermoes" className="text-stone-500 hover:text-[#C8A96A] font-medium transition-colors inline-flex items-center gap-2">
            <span>&larr;</span> Voltar para a lista
          </Link>
        </div>

        {/* Cabeçalho do Sermão */}
        <header className="mb-10 text-center">
          <div className="text-[#C8A96A] font-bold tracking-widest uppercase mb-4 text-sm">
            {new Date(sermao.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0B1F3A] mb-6 leading-tight">
            {sermao.title}
          </h1>
        </header>

        {/* Se houver vídeo cadastrado, mostra o tocador do YouTube! */}
        {youtubeId && (
          <div className="aspect-video w-full mb-10 rounded-lg overflow-hidden shadow-md">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* O texto principal da pregação */}
        <div 
  className="text-stone-700 mt-6 [&>p]:mb-4 [&>h1]:text-2xl [&>h1]:font-bold [&>h2]:text-xl [&>h2]:font-bold [&>ul]:list-disc [&>ul]:ml-5 [&>ol]:list-decimal [&>ol]:ml-5" 
  dangerouslySetInnerHTML={{ __html: sermao.content }} 
/>

      </div>
    </main>
  );
}