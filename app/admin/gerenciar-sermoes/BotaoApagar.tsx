"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BotaoApagar({ id, titulo }: { id: string, titulo: string }) {
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmacao = window.confirm(`Tem certeza absoluta que deseja apagar a mensagem "${titulo}"?`);
    if (!confirmacao) return;

    setCarregando(true);
    try {
      const response = await fetch(`/api/sermoes/${id}`, { method: "DELETE" });
      if (response.ok) {
        router.refresh();
      } else {
        alert("Erro ao apagar o sermão.");
      }
    } catch (error) {
      alert("Erro de comunicação com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={carregando} className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors disabled:opacity-50">
      {carregando ? "A apagar..." : "🗑️ Excluir"}
    </button>
  );
}