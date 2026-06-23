import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// Função especial DELETE para apagar dados
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // 1. Extraímos o ID do artigo que foi enviado no endereço da URL
    const { id } = await params;

    // 2. Pedimos ao Prisma para ir à base de dados e apagar o artigo com este ID
    await prisma.post.delete({
      where: { 
        id: id 
      }
    });

    // 3. Devolvemos uma mensagem de sucesso
    return NextResponse.json(
      { mensagem: "Artigo apagado com sucesso!" }, 
      { status: 200 }
    );

  } catch (error) {
    console.error("Erro ao apagar artigo:", error);
    // Se algo correr mal, avisamos o sistema
    return NextResponse.json(
      { erro: "Ocorreu um erro ao tentar apagar o artigo." }, 
      { status: 500 }
    );
  }
}

// Adicione isto no final do ficheiro app/api/artigos/[id]/route.ts

// Função especial PUT para atualizar dados existentes
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, excerpt, imageUrl, content } = body;

    // Pedimos ao Prisma para atualizar APENAS o artigo que tem este ID
    const artigoAtualizado = await prisma.post.update({
      where: { id: id },
      data: {
        title: title,
        excerpt: excerpt || null,
        imageUrl: imageUrl || null,
        content: content,
      }
    });

    return NextResponse.json(artigoAtualizado, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar artigo:", error);
    return NextResponse.json(
      { erro: "Ocorreu um erro ao tentar atualizar o artigo." }, 
      { status: 500 }
    );
  }
}