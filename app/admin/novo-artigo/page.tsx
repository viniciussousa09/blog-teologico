"use client";

import { useState } from "react";
import EditorTexto from "../../../components/EditorTexto";

export default function NovoArtigoPage() {
  // 1. Memórias para guardar os textos digitados
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  
  // Memórias para as mensagens de aviso
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" });
  const [carregando, setCarregando] = useState(false);

  // 2. A função que executa quando clicamos no botão
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setMensagem({ texto: "", tipo: "" });

    try {
      // Chama o nosso novo Rececionista de Artigos
      const response = await fetch("/api/artigos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          excerpt,
          imageUrl,
          content,
        }),
      });

      if (response.ok) {
        setMensagem({ texto: "Artigo publicado com sucesso no banco de dados!", tipo: "sucesso" });
        // Limpa os campos após o sucesso
        setTitle("");
        setExcerpt("");
        setImageUrl("");
        setContent("");
      } else {
        const data = await response.json();
        setMensagem({ texto: data.erro || "Erro ao publicar o artigo.", tipo: "erro" });
      }
    } catch (error) {
      setMensagem({ texto: "Erro de comunicação com o servidor.", tipo: "erro" });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-serif font-bold text-[#0B1F3A] mb-8">Escrever Novo Artigo</h1>
      
      {/* Área de notificação */}
      {mensagem.texto && (
        <div className={`p-4 mb-6 rounded font-medium border ${
          mensagem.tipo === "sucesso" ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"
        }`}>
          {mensagem.texto}
        </div>
      )}

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 flex flex-col gap-6">
        
        <div className="flex flex-col gap-2">
          <label className="font-bold text-[#111111] text-sm">Título do Artigo *</label>
          <input 
            required 
            type="text" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            className="border border-stone-300 p-3 rounded focus:ring-2 focus:ring-[#C8A96A] outline-none transition-all" 
            placeholder="Ex: O Significado da Graça" 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-[#111111] text-sm">Resumo (Opcional)</label>
          <input 
            type="text" 
            value={excerpt} 
            onChange={e => setExcerpt(e.target.value)} 
            className="border border-stone-300 p-3 rounded focus:ring-2 focus:ring-[#C8A96A] outline-none transition-all" 
            placeholder="Um breve resumo para aparecer na página inicial..." 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-[#111111] text-sm">Link da Imagem de Capa (Opcional)</label>
          <input 
            type="url" 
            value={imageUrl} 
            onChange={e => setImageUrl(e.target.value)} 
            className="border border-stone-300 p-3 rounded focus:ring-2 focus:ring-[#C8A96A] outline-none transition-all" 
            placeholder="https://exemplo.com/imagem.jpg" 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold text-[#111111] text-sm">Conteúdo do Artigo *</label>
          <div className="flex flex-col gap-2">
          <EditorTexto 
            value={content} 
            onChange={setContent} 
          />
        </div>
        </div>

        <button 
          type="submit" 
          disabled={carregando} 
          className="bg-[#0B1F3A] text-white font-bold py-4 rounded hover:bg-[#1a365d] transition-colors disabled:opacity-50 mt-2"
        >
          {carregando ? "A Guardar no Banco de Dados..." : "Publicar Artigo"}
        </button>

      </form>
    </div>
  );
}