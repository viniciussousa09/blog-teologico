import { prisma } from "../../../../lib/prisma";
import { notFound } from "next/navigation";
import FormEdicao from "./FormEdicao";

export default async function EditarArtigoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Busca o artigo atual na base de dados
  const artigo = await prisma.post.findUnique({
    where: { id: id }
  });

  if (!artigo) {
    notFound();
  }

  // Passa os dados do artigo para o componente visual do formulário
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-serif font-bold text-[#0B1F3A] mb-8">Editar Artigo</h1>
      <FormEdicao artigo={artigo} />
    </div>
  );
}