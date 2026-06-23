import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// APAGAR SERMÃO
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.sermon.delete({ where: { id: id } });
    return NextResponse.json({ mensagem: "Sermão apagado com sucesso!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erro: "Ocorreu um erro ao tentar apagar o sermão." }, { status: 500 });
  }
}

// ATUALIZAR SERMÃO
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, content, description, videoUrl, date } = body;

    const sermaoAtualizado = await prisma.sermon.update({
      where: { id: id },
      data: {
        title: title,
        content: content,
        description: description || null,
        videoUrl: videoUrl || null,
        date: new Date(date), 
      }
    });
    return NextResponse.json(sermaoAtualizado, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erro: "Ocorreu um erro ao atualizar." }, { status: 500 });
  }
}