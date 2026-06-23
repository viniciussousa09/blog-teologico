import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // Importamos o "triturador" de senhas

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando a criação do Administrador...');

  // 1. Criptografamos a senha (o número 10 é o nível de complexidade da criptografia)
  const senhaCriptografada = await bcrypt.hash('admin123', 10);

  // 2. Usamos o upsert: Se já existir alguém com esse e-mail, ele apenas atualiza a senha. Se não, ele cria!
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@doutrinaevida.com' },
    update: { 
      password: senhaCriptografada,
      role: 'ADMIN'
    },
    create: {
      email: 'admin@doutrinaevida.com',
      name: 'Dona do Blog (Admin)',
      role: 'ADMIN',
      password: senhaCriptografada, // Guardamos a versão segura
    },
  });

  console.log(`Sucesso! Usuário criado com o e-mail: ${adminUser.email}`);
  console.log(`A senha temporária é: admin123`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });