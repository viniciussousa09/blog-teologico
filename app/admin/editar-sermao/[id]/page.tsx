import { prisma } from "../../../../lib/prisma";
import { notFound } from "next/navigation";
import FormEdicaoSermao from "./FormEdicaoSermao";

export default async function EditarSermaoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sermao = await prisma.sermon.findUnique({ where: { id: id } });

  if (!sermao) notFound();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-serif font-bold text-[#0B1F3A] mb-8">Editar Sermão</h1>
      <FormEdicaoSermao sermao={sermao} />
    </div>
  );
}