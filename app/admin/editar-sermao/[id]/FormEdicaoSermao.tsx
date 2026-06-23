"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EditorTexto from "../../../../components/EditorTexto";

export default function FormEdicaoSermao({ sermao }: { sermao: any }) {
  const router = useRouter();
  
  const [title, setTitle] = useState(sermao.title);
  // Converte a data para YYYY-MM-DD para o input HTML conseguir ler
  const dataFormatada = new Date(sermao.date).toISOString().split('T')[0];
  const [date, setDate] = useState(dataFormatada);
  const [description, setDescription] = useState(sermao.description || "");
  const [videoUrl, setVideoUrl] = useState(sermao.videoUrl || "");
  const [content, setContent] = useState(sermao.content);
  
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setMensagem({ texto: "", tipo: "" });

    try {
      const response = await fetch(`/api/sermoes/${sermao.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, description, videoUrl, date }),
      });

      if (response.ok) {
        setMensagem({ texto: "Sermão atualizado com sucesso!", tipo: "sucesso" });
        setTimeout(() => {
          router.push("/admin/gerenciar-sermoes");
          router.refresh();
        }, 2000);
      } else {
        setMensagem({ texto: "Erro ao atualizar.", tipo: "erro" });
      }
    } catch (error) {
      setMensagem({ texto: "Erro de comunicação.", tipo: "erro" });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 flex flex-col gap-6">
      {mensagem.texto && (
        <div className={`p-4 rounded font-medium border ${mensagem.tipo === "sucesso" ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}`}>
          {mensagem.texto}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-bold text-[#111111] text-sm">Título do Sermão *</label>
          <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="border border-stone-300 p-3 rounded outline-none focus:ring-2 focus:ring-[#C8A96A]" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold text-[#111111] text-sm">Data da Pregação *</label>
          <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="border border-stone-300 p-3 rounded outline-none focus:ring-2 focus:ring-[#C8A96A]" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-[#111111] text-sm">Breve Descrição (Opcional)</label>
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} className="border border-stone-300 p-3 rounded outline-none focus:ring-2 focus:ring-[#C8A96A]" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-[#111111] text-sm">Link do Vídeo (Opcional)</label>
        <input type="url" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} className="border border-stone-300 p-3 rounded outline-none focus:ring-2 focus:ring-[#C8A96A]" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-[#111111] text-sm">Conteúdo Completo *</label>
        <EditorTexto 
          value={content} 
          onChange={setContent} 
        />
      </div>

      <button type="submit" disabled={carregando} className="bg-[#0B1F3A] text-white font-bold py-4 rounded hover:bg-[#1a365d] transition-colors disabled:opacity-50 mt-2">
        {carregando ? "A Atualizar..." : "Salvar Alterações"}
      </button>
    </form>
  );
}