import { prisma } from "../../lib/prisma";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function BuscaPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  // Lendo a palavra que o utilizador escreveu na URL
  const resolvedSearchParams = await searchParams;
  const termo = resolvedSearchParams.q || "";

  // Pesquisando na base de dados
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      OR: [
        { title: { contains: termo, mode: "insensitive" } },
        { content: { contains: termo, mode: "insensitive" } }
      ]
    },
    include: { category: true, author: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-[#FFFFFF] p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-[#0B1F3A] mb-8 border-b-2 border-[#C8A96A] inline-block pb-2">
          Resultados para: "{termo}"
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="relative overflow-hidden bg-stone-50 rounded-lg border border-stone-200 hover:shadow-lg transition-shadow flex flex-col z-0">
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none z-[-1]">
                <Image src="/icone-tulipa-claro.png" alt="Marca" width={200} height={200} className="object-contain"/>
              </div>

              {post.imageUrl && (
                <div className="w-full h-48 overflow-hidden">
                  <img src={post.imageUrl} alt={`Capa`} className="w-full h-full object-cover"/>
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
                    Ler mais &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-stone-500 text-center py-10">Nenhum artigo encontrado para esta pesquisa.</p>
        )}
      </div>
    </main>
  );
}