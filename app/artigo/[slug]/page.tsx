import { prisma } from "../../../lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
// Importando o botão interativo
import BotaoDeletar from "../../components/BotaoDeletar"; 

export default async function ArtigoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug: slug },
    include: {
      author: true,
      category: true,
    },
  });

  if (!post) {
    notFound();
  }

  // Função de Servidor (mantém-se igual e segura)
  async function deletarArtigo() {
    "use server";
    await prisma.post.delete({
      where: { id: post!.id },
    });
    redirect("/"); 
  }

  return (
    <main className="min-h-screen bg-[#FFFFFF] p-8">
      <article className="max-w-3xl mx-auto mt-8">
        
        {/* Voltar + Painel de Controle */}
        <div className="flex flex-wrap items-center justify-between mb-10 border-b border-stone-200 pb-4">
          <Link href="/" className="text-[#C8A96A] hover:text-[#0B1F3A] font-medium transition-colors inline-flex items-center gap-2">
            <span aria-hidden="true">&larr;</span> Voltar para o início
          </Link>

          {/* BOTÕES ADMINISTRATIVOS */}
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Link 
              href={`/admin/editar/${post.id}`} 
              className="bg-stone-200 text-stone-700 px-4 py-1.5 rounded text-sm font-bold hover:bg-stone-300 transition-colors"
            >
              Editar Artigo
            </Link>
            
            {/* USANDO O COMPONENTE CLIENTE AQUI, passando a função deletarArtigo */}
            <BotaoDeletar action={deletarArtigo} />
          </div>
        </div>

        {/* Cabeçalho do Artigo */}
        <header className="mb-12 text-center flex flex-col items-center">
          <span className="text-xs font-bold text-white bg-[#0B1F3A] px-3 py-1 rounded uppercase tracking-widest mb-4">
            {post.category.name}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#111111] mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="text-stone-500 text-base font-medium flex items-center gap-2">
            Escrito por <span className="text-[#0B1F3A] font-bold">{post.author.name}</span>
          </div>
        </header>

        {post.imageUrl && (
          <div className="w-full h-64 md:h-96 mb-12 overflow-hidden rounded-xl shadow-md border border-stone-200">
            <img src={post.imageUrl} alt={`Capa do artigo`} className="w-full h-full object-cover"/>
          </div>
        )}

        <div className="text-lg text-stone-700 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>

      </article>
    </main>
  );
}