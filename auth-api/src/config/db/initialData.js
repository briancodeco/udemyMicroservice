
import bcrypt from 'bcrypt';
import User from '../../modules/user/model/User.js';

export async function createInitialData() {
    try {
        // Sincronize o modelo User com o banco de dados, recriando a tabela se necessário
        await User.sync({ force: true });

        // Criptografe a senha
        const passwordCriptado = await bcrypt.hash('123456', 10);

        // Crie o usuário com a senha criptografada
        const firstUser = await User.create({
            name: 'User Teste2',
            email: 'testeuser2@gmail.com',
            password: passwordCriptado,  // Use a senha criptografada
        });
        const seconde = await User.create({
            name: 'User Teste1',
            email: 'testeuser1@gmail.com',
            password: passwordCriptado,  // Use a senha criptografada
        });
        

        console.log('Usuário inicial criado com sucesso:', firstUser);
    } catch (error) {
        console.error('Erro ao criar dados iniciais:', error);
    }
}