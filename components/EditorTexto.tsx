"use client";

// O next/dynamic impede que o Next.js tente carregar isto no servidor
import dynamic from "next/dynamic";
// Importamos o design visual bonito do NOVO pacote
import "react-quill-new/dist/quill.snow.css";

// Carregamos o ReactQuill-new apenas quando o navegador estiver pronto
const ReactQuill = dynamic(() => import("react-quill-new"), { 
  ssr: false,
  loading: () => <p className="p-4 text-stone-500">A carregar editor...</p>
});

export default function EditorTexto({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  // Aqui definimos os botões que queremos na nossa barra de ferramentas
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }], // Títulos
      ['bold', 'italic', 'underline'],  // Formatação de texto
      [{ 'list': 'ordered'}, { 'list': 'bullet' }], // Listas com números ou pontos
      ['link', 'clean'] // Links e botão de limpar formatação
    ],
  };

  return (
    <div className="bg-white [&_.ql-container]:min-h-[250px] [&_.ql-container]:text-base [&_.ql-editor]:min-h-[250px]">
      <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={onChange} 
        modules={modules} 
      />
    </div>
  );
}