import { prisma } from "../../../../lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EditarArtigoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Buscando o post existente, as categorias e os autores
  const post = await prisma.post.findUnique({ where: { id: id } });
  const categorias = await prisma.category.findMany();
  const autores = await prisma.user.findMany();

  if (!post) notFound();

  // Função para ATUALIZAR o artigo
  async function atualizarArtigo(formData: FormData) {
    "use server"; 
    const title = formData.get("title") as string;
    const rawSlug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const categoryId = formData.get("categoryId") as string;
    const authorId = formData.get("authorId") as string;
    const imageUrl = formData.get("imageUrl") as string; 

    const slug = rawSlug.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    // Usando o UPDATE 
    await prisma.post.update({
      where: { id: id },
      data: { title, slug, excerpt, content, categoryId, authorId, imageUrl },
    });

    redirect(`/artigo/${slug}`); 
  }

  return (
    <main className="min-h-screen bg-stone-50 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow border border-stone-200">
        <div className="flex justify-between items-center mb-8 border-b-2 border-[#C8A96A] pb-4">
          <h1 className="text-3xl font-serif font-bold text-[#0B1F3A]">Editar Artigo</h1>
          <Link href="/" className="text-sm font-medium text-stone-500 hover:text-[#0B1F3A]">Cancelar</Link>
        </div>

        <form action={atualizarArtigo} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-bold text-[#111111]">Título</label>
              {/* Usamos defaultValue para preencher os campos com o que já existe no banco */}
              <input type="text" id="title" name="title" defaultValue={post.title} required className="border border-stone-300 rounded p-2 focus:ring-[#C8A96A]" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="slug" className="text-sm font-bold text-[#111111]">Slug</label>
              <input type="text" id="slug" name="slug" defaultValue={post.slug} required className="border border-stone-300 rounded p-2 focus:ring-[#C8A96A]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="categoryId" className="text-sm font-bold text-[#111111]">Categoria</label>
              <select id="categoryId" name="categoryId" defaultValue={post.categoryId} required className="border border-stone-300 rounded p-2">
                {categorias.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="authorId" className="text-sm font-bold text-[#111111]">Autor</label>
              <select id="authorId" name="authorId" defaultValue={post.authorId} required className="border border-stone-300 rounded p-2">
                {autores.map(autor => <option key={autor.id} value={autor.id}>{autor.name}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="imageUrl" className="text-sm font-bold text-[#111111]">Link da Imagem</label>
            <input type="url" id="imageUrl" name="imageUrl" defaultValue={post.imageUrl || ""} className="border border-stone-300 rounded p-2" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="excerpt" className="text-sm font-bold text-[#111111]">Resumo</label>
            <textarea id="excerpt" name="excerpt" rows={2} defaultValue={post.excerpt || ""} required className="border border-stone-300 rounded p-2"></textarea>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="content" className="text-sm font-bold text-[#111111]">Conteúdo</label>
            <textarea id="content" name="content" rows={12} defaultValue={post.content} required className="border border-stone-300 rounded p-2"></textarea>
          </div>

          <button type="submit" className="bg-[#C8A96A] text-[#0B1F3A] font-bold text-lg py-3 rounded hover:bg-[#b09255] transition-colors mt-4">
            Salvar Alterações
          </button>
        </form>
      </div>
    </main>
  );
}