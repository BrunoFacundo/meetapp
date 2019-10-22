module.exports = {
    up: async queryInterface => {
        const files = [
            {
                path: 'seeds/84ffa6fc60fb80e75e7f73e751bdcf2b.jpg',
                name: 'Meetup 1',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                path: 'seeds/2cfd7ccc2fbc84df339a6c1fa8e93e59.png',
                name: 'Meetup 2',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                path: 'seeds/7465de2b9022e8e29ec2fa4549b7eb64.jpg',
                name: 'Meetup 3',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                path: 'seeds/c90830f66362490dbc0538aafe19a99c.jpg',
                name: 'Meetup 4',
                created_at: new Date(),
                updated_at: new Date()
            }
        ];

        await queryInterface.bulkInsert('files', files, {});
    },

    down: async queryInterface => {
        await queryInterface.bulkDelete('files', null, {});
        await queryInterface.sequelize.query('ALTER SEQUENCE "files_id_seq" RESTART WITH 1');
    }
};
