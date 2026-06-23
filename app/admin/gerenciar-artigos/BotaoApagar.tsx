"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BotaoApagar({ id, titulo }: { id: string, titulo: string }) {
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    // Pergunta de segurança antes de apagar
    const confirmacao = window.confirm(`Tem certeza absoluta que deseja apagar o artigo "${titulo}"? Esta ação não pode ser desfeita.`);
    
    if (!confirmacao) return;

    setCarregando(true);
    try {
      // Chama a Rota de API que criamos na etapa anterior
      const response = await fetch(`/api/artigos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Atualiza a página para o artigo sumir da lista
        router.refresh();
      } else {
        alert("Erro ao apagar o artigo.");
      }
    } catch (error) {
      alert("Erro de comunicação com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={carregando}
      className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors disabled:opacity-50"
    >
      {carregando ? "A apagar..." : "🗑️ Excluir"}
    </button>
  );
}