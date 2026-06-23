"use client";

import { useState } from "react";
import EditorTexto from "../../../components/EditorTexto";

export default function NovoSermaoPage() {
  // 1. Criando as memórias para guardar o que for digitado em cada campo
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [content, setContent] = useState("");
  
  // Memórias para as mensagens de aviso (verde para sucesso, vermelho para erro)
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });
  const [carregando, setCarregando] = useState(false);

  // 2. A função que executa quando clicamos em "Publicar Sermão"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede a página de recarregar
    setCarregando(true);
    setMensagem({ texto: "", tipo: "" });

    try {
      // Fazendo a chamada para o Rececionista API 
      const response = await fetch("/api/sermoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          description,
          videoUrl,
          date,
        }),
      });

      if (response.ok) {
        // Se a base de dados aceitar, mostramos sucesso e limpamos os campos
        setMensagem({ texto: "Sermão guardado com sucesso no banco de dados!", tipo: "sucesso" });
        setTitle("");
        setContent("");
        setDescription("");
        setVideoUrl("");
        setDate("");
      } else {
        const data = await response.json();
        setMensagem({ texto: data.erro || "Erro ao guardar o sermão.", tipo: "erro" });
      }
    } catch (error) {
      setMensagem({ texto: "Erro de comunicação com o servidor.", tipo: "erro" });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-serif font-bold text-[#0B1F3A] mb-8">Adicionar Novo Sermão</h1>
      
      {/* Área de notificação (aparece apenas quando há uma mensagem) */}
      {mensagem.texto && (
        <div className={`p-4 mb-6 rounded font-medium border ${
          mensagem.tipo === "sucesso" ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"
        }`}>
          {mensagem.texto}
        </div>
      )}

      {/* Ligamos a nossa função handleSubmit ao formulário */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 flex flex-col gap-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-[#111111] text-sm">Título do Sermão *</label>
            <input 
              required 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              className="border border-stone-300 p-3 rounded focus:ring-2 focus:ring-[#C8A96A] outline-none transition-all" 
              placeholder="Ex: A Graça Inexplicável" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold text-[#111111] text-sm">Data da Pregação *</label>
            <input 
              required 
              type="date" 
              value={date} 
              onChange={e => setDate(e.target.value)} 
              className="border border-stone-300 p-3 rounded focus:ring-2 focus:ring-[#C8A96A] outline-none transition-all" 
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-[#111111] text-sm">Breve Descrição (Opcional)</label>
          <input 
            type="text" 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            className="border border-stone-300 p-3 rounded focus:ring-2 focus:ring-[#C8A96A] outline-none transition-all" 
            placeholder="Um resumo de 1 ou 2 linhas sobre a mensagem..." 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-[#111111] text-sm">Link do Vídeo do YouTube (Opcional)</label>
          <input 
            type="url" 
            value={videoUrl} 
            onChange={e => setVideoUrl(e.target.value)} 
            className="border border-stone-300 p-3 rounded focus:ring-2 focus:ring-[#C8A96A] outline-none transition-all" 
            placeholder="https://www.youtube.com/watch?v=..." 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-[#111111] text-sm">Conteúdo Completo *</label>
          <EditorTexto 
            value={content} 
            onChange={setContent} 
          />
        </div>

        <button 
          type="submit" 
          disabled={carregando} 
          className="bg-[#0B1F3A] text-white font-bold py-4 rounded hover:bg-[#1a365d] transition-colors disabled:opacity-50 mt-2"
        >
          {carregando ? "A Guardar no Banco de Dados..." : "Publicar Sermão"}
        </button>

      </form>
    </div>
  );
}