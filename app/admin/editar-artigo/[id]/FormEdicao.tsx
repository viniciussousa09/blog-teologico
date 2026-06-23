"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormEdicao({ artigo }: { artigo: any }) {
  const router = useRouter();
  
  // As memórias já começam preenchidas com os dados antigos do artigo!
  const [title, setTitle] = useState(artigo.title);
  const [excerpt, setExcerpt] = useState(artigo.excerpt || "");
  const [imageUrl, setImageUrl] = useState(artigo.imageUrl || "");
  const [content, setContent] = useState(artigo.content);
  
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setMensagem({ texto: "", tipo: "" });

    try {
      // Usamos o método PUT na nossa API enviando o ID na URL
      const response = await fetch(`/api/artigos/${artigo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, excerpt, imageUrl, content }),
      });

      if (response.ok) {
        setMensagem({ texto: "Artigo atualizado com sucesso!", tipo: "sucesso" });
        // Redireciona de volta para a tabela após 2 segundos
        setTimeout(() => {
          router.push("/admin/gerenciar-artigos");
          router.refresh();
        }, 2000);
      } else {
        setMensagem({ texto: "Erro ao atualizar o artigo.", tipo: "erro" });
      }
    } catch (error) {
      setMensagem({ texto: "Erro de comunicação com o servidor.", tipo: "erro" });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 flex flex-col gap-6">
      
      {mensagem.texto && (
        <div className={`p-4 rounded font-medium border ${
          mensagem.tipo === "sucesso" ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"
        }`}>
          {mensagem.texto}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="font-bold text-[#111111] text-sm">Título do Artigo *</label>
        <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="border border-stone-300 p-3 rounded focus:ring-2 focus:ring-[#C8A96A] outline-none transition-all" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-[#111111] text-sm">Resumo (Opcional)</label>
        <input type="text" value={excerpt} onChange={e => setExcerpt(e.target.value)} className="border border-stone-300 p-3 rounded focus:ring-2 focus:ring-[#C8A96A] outline-none transition-all" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-[#111111] text-sm">Link da Imagem de Capa (Opcional)</label>
        <input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="border border-stone-300 p-3 rounded focus:ring-2 focus:ring-[#C8A96A] outline-none transition-all" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-[#111111] text-sm">Conteúdo do Artigo *</label>
        <textarea required value={content} onChange={e => setContent(e.target.value)} rows={12} className="border border-stone-300 p-3 rounded focus:ring-2 focus:ring-[#C8A96A] outline-none transition-all resize-y"></textarea>
      </div>

      <button type="submit" disabled={carregando} className="bg-[#0B1F3A] text-white font-bold py-4 rounded hover:bg-[#1a365d] transition-colors disabled:opacity-50 mt-2">
        {carregando ? "A Atualizar..." : "Salvar Alterações"}
      </button>
    </form>
  );
}