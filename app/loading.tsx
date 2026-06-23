import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFFFF]">
      <div className="animate-pulse flex flex-col items-center">
        {/* Atualizamos de .svg para .png */}
        <Image 
          src="/icone-tulipa-claro.png" 
          alt="Carregando..." 
          width={80} 
          height={80} 
          className="mb-4"
        />
        <p className="text-[#C8A96A] font-serif font-medium tracking-widest uppercase text-sm">
          Semeando...
        </p>
      </div>
    </div>
  );
}