import { prisma } from "../../../lib/prisma";
import Link from "next/link";
import BotaoApagar from "./BotaoApagar";

export default async function GerenciarArtigosPage() {
  // Busca todos os artigos na base de dados
  const artigos = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { category: true }
  });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-[#0B1F3A]">Gerenciar Artigos</h1>
        <Link href="/admin/novo-artigo" className="bg-[#C8A96A] hover:bg-[#b0955d] text-[#0B1F3A] font-bold py-2 px-6 rounded transition-colors">
          + Novo Artigo
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 text-sm uppercase tracking-wider">
              <th className="p-4 font-medium">Título</th>
              <th className="p-4 font-medium">Categoria</th>
              <th className="p-4 font-medium">Data</th>
              <th className="p-4 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {artigos.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-stone-500">Nenhum artigo encontrado.</td>
              </tr>
            ) : (
              artigos.map((artigo) => (
                <tr key={artigo.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-4 font-medium text-[#0B1F3A]">{artigo.title}</td>
                  <td className="p-4 text-stone-500 text-sm">{artigo.category.name}</td>
                  <td className="p-4 text-stone-500 text-sm">
                    {new Date(artigo.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="p-4 text-right flex justify-end gap-4">

                    {/* Botão de Editar */}
                    <Link 
                      href={`/admin/editar-artigo/${artigo.id}`} 
                      className="text-[#C8A96A] hover:text-[#0B1F3A] font-medium text-sm transition-colors"
                    >
                      ✏️ Editar
                    </Link>
                    
                    {/* Aqui inserimos o nosso Botão Inteligente de Apagar */}
                    <BotaoApagar id={artigo.id} titulo={artigo.title} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}