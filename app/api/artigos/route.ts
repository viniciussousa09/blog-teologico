import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
    try {
        // 1. Recebendo os dados que enviaremos ao formulário
        const body = await request.json();
        const { title, content, excerpt, imageUrl } = body;

        // 2. Validação básica
        if (!title || !content) {
            return NextResponse.json(
                { erro: "O título eo o conteúdo são obrigatórios." },
                { status: 400 }
            );
        }

        // 3. Criando um "slug" (o link amigável). Ex: "Meu Artigo" vira "meu-artigo"
        const slug = title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
            .replace(/[^a-z0-9]+/g, '-')     // Troca espaços por traços
            .replace(/(^-|-$)+/g, '');       // Remove traços nas pontas

        // 4. Procura a sua conta para dizer que você é o autor
        const autor = await prisma.user.findUnique({
            where: { email: 'admin@doutrinaevida.com' }
        });

        if (!autor) {
            return NextResponse.json({ erro: "Conta de autor não encontrada."}, { status: 404 });
        }

        // 5. Garante que existe uma Categoria padrão
        const categoria = await prisma.category.upsert({
            where: { slug: 'geral' },
            update: {}, // Se existir, não faz nada
            create: { name: 'Geral', slug: 'geral' } // Se não existir, cria
        });

        // 6. Guarda o Artigo na base de dados
        const novoArtigo = await prisma.post.create({
            data: {
                title: title,
                slug: slug,
                content: content,
                excerpt: excerpt || null,
                imageUrl: imageUrl || null,
                published: true, // Já publica o artigo imediatamente
                authorId: autor.id,
                categoryId: categoria.id
            }
        });

        // 7. Devolve o sucesso
        return NextResponse.json(novoArtigo, { status: 201 });

    }    catch (error: any) {
        console.error("Error ao criar artigo.", error);

        // Se tentarmos criar um artigo com um título que já existe, o slug vai repetir e o banco bloqueia
        if (error.code === 'P2002') {
            return NextResponse.json({ erro: "Já existe um artigo com este título.." }, { status: 400 });
        }

        return NextResponse.json({ erro: "Erro interno no servidor" }, { status: 500 });
    }
}