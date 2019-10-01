const bcrypt = require('bcryptjs');

module.exports = {
    up: async queryInterface => {
        return queryInterface.bulkInsert(
            'users',
            [
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
            ],
            {}
        );
    },

    down: queryInterface => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
