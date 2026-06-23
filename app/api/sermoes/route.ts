import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
    try {
        // 1. Ler os dados ue o formulário enviou
        const body = await request.json();
        const { title, content, description, videoUrl, date } = body;

        // 2. Validação básica de segurança
        if (!title || !content || !date) {
            return NextResponse.json(
                { erro: "O título, o conteúdo e a data são abrigatórios."},
                { status: 400 } // 400 "Pedido inválido"
            );
        }

        // 3. Pedindo ao Prisma para criar um novo registro na tabela Sermon
        const novoSermao = await prisma.sermon.create({
            data: {
                title: title,
                content: content,
                description: description || null,
                videoUrl: videoUrl || null,
                // Convertamos a data do formulário para o formato padrão do banco de dados
                date: new Date(date),
            },
        });

        // 4. Devolvendo uma mensagem de sucesso com os dados do sermão criado!
        return NextResponse.json(novoSermao, { status: 201 }); // 201 significa "Criado com sucesso

    } catch (error) {
        console.error("Erro ao criar sermão:", error);
        return NextResponse.json(
            { erro: "Ocorreu um erro interno ao tentar salvar o sermão." },
            { status: 500 }
        );
    }
}