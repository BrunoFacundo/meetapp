const bcrypt = require('bcryptjs');

module.exports = {
    up: async queryInterface => {
        const users = [
            {
                name: 'Rocketseat Experience',
                email: 'rsxp@rocketseat.com.br',
                password_hash: await bcrypt.hash('12345678', 8),
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'Bruno Facundo',
                email: 'brunofr95@gmail.com',
                password_hash: await bcrypt.hash('12345678', 8),
                created_at: new Date(),
                updated_at: new Date()
            }
        ];

        await queryInterface.bulkInsert('users', users, {});
    },

    down: async queryInterface => {
        await queryInterface.bulkDelete('users', null, {});
        await queryInterface.sequelize.query('ALTER SEQUENCE "users_id_seq" RESTART WITH 1');
    }
};
