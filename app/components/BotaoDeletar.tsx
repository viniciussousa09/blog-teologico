"use client";

// Recebendo a função do servidor através das propriedades (props)
export default function BotaoDeletar({ action }: { action: () => void }) {
  return (
    <form action={action}>
      <button 
        type="submit" 
        onClick={(e) => {
          // O navegador agora entende perfeitamente este comando
          if (!window.confirm("Tem certeza que deseja apagar este artigo para sempre?")) {
            e.preventDefault(); // Cancela a exclusão se o utilizador clicar em "Cancelar"
          }
        }}
        className="bg-red-100 text-red-700 px-4 py-1.5 rounded text-sm font-bold hover:bg-red-200 transition-colors"
      >
        Deletar Artigo
      </button>
    </form>
  );
}