import { prisma } from "../../../lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function CategoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Buscando a categoria no banco de dados 
  const categoria = await prisma.category.findUnique({
    where: { slug: slug }
  });

  if (!categoria) {
    notFound();
  }

  // 2. Buscamos APENAS os artigos que pertencem ao ID desta categoria
  const posts = await prisma.post.findMany({
    where: { 
      published: true,
      categoryId: categoria.id 
    },
    include: {
      category: true,
      author: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-[#FFFFFF] p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Mostramos o nome da Categoria como título da página */}
        <h1 className="text-4xl font-serif font-bold text-[#0B1F3A] mb-8 border-b-2 border-[#C8A96A] inline-block pb-2">
          Categoria: {categoria.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="relative overflow-hidden bg-stone-50 rounded-lg border border-stone-200 hover:shadow-lg transition-shadow flex flex-col z-0">
              <div className="absolute inset-0 flex items-center justify-center opacity-1 pointer-events-none z-[-1]">
                <Image src="/icone-tulipa-azul.png" alt="Marca d'água" width={200} height={200} className="object-contain"/>
              </div>

              {post.imageUrl && (
                <div className="w-full h-48 overflow-hidden">
                  <img src={post.imageUrl} alt={`Capa do artigo`} className="w-full h-full object-cover"/>
                </div>
              )}

              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-serif font-bold text-[#111111] mb-2 mt-2">
                  <Link href={`/artigo/${post.slug}`} className="hover:text-[#C8A96A] transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-stone-600 mb-6 line-clamp-3 flex-grow">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t border-stone-200 mt-auto">
                  <div className="text-sm text-stone-500 font-medium">Por {post.author.name}</div>
                  <Link href={`/artigo/${post.slug}`} className="inline-flex items-center gap-1 text-sm font-bold text-[#C8A96A] hover:text-[#0B1F3A]">
                    Ler mais <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-stone-500 text-center py-10">Ainda não há artigos publicados nesta categoria.</p>
        )}
      </div>
    </main>
  );
}