import { prisma } from "../../../lib/prisma";
import Link from "next/link";
import BotaoApagar from "./BotaoApagar";

export default async function GerenciarSermoesPage() {
  const sermoes = await prisma.sermon.findMany({
    orderBy: { date: 'desc' }
  });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-[#0B1F3A]">Gerenciar Sermões</h1>
        <Link href="/admin/novo-sermao" className="bg-[#C8A96A] hover:bg-[#b0955d] text-[#0B1F3A] font-bold py-2 px-6 rounded transition-colors">
          + Novo Sermão
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 text-sm uppercase tracking-wider">
              <th className="p-4 font-medium">Título</th>
              <th className="p-4 font-medium">Data</th>
              <th className="p-4 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {sermoes.length === 0 ? (
              <tr><td colSpan={3} className="p-8 text-center text-stone-500">Nenhum sermão encontrado.</td></tr>
            ) : (
              sermoes.map((sermao) => (
                <tr key={sermao.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-4 font-medium text-[#0B1F3A]">{sermao.title}</td>
                  <td className="p-4 text-stone-500 text-sm">{new Date(sermao.date).toLocaleDateString('pt-BR')}</td>
                  <td className="p-4 text-right flex justify-end gap-4">
                    <Link href={`/admin/editar-sermao/${sermao.id}`} className="text-[#C8A96A] hover:text-[#0B1F3A] font-medium text-sm transition-colors">
                      ✏️ Editar
                    </Link>
                    <BotaoApagar id={sermao.id} titulo={sermao.title} />
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