const { addHours, subDays, addDays, setMinutes, setSeconds, setMilliseconds } = require('date-fns');

module.exports = {
    up: async queryInterface => {
        const date = setMinutes(setSeconds(setMilliseconds(new Date(), 0), 0), 0);

        const meetups = [
            {
                title: 'Meetup de Docker',
                description: 'Docker do zero.',
                location: 'Rua Costa e Silva, 122',
                date: subDays(date, 1),
                user_id: 1,
                file_id: 1,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                title: 'Meetup de React Native',
                description:
                    'O Meetup de React Native é um evento que reúne a comunidade de desenvolvimento mobile utilizando React a fim de compartilhar conhecimento. Todos são convidados.',
                location: 'Rua Guilherme Gembala, 260',
                date: addHours(date, 2),
                user_id: 1,
                file_id: 2,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                title: 'Meetup de ReactJS',
                description: 'Evento super legal :).',
                location: 'Rua Sousa Lima, 191',
                date: addHours(date, 5),
                user_id: 1,
                file_id: 3,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                title: 'Meetup de NodeJS',
                description: 'Venha conhecer os melhores patterns usados no mercado.',
                location: 'Rua São Paulo, 451',
                date: addDays(date, 1),
                user_id: 1,
                file_id: 4,
                created_at: new Date(),
                updated_at: new Date()
            }
        ];

        await queryInterface.bulkInsert('meetups', meetups, {});
    },

    down: async queryInterface => {
        await queryInterface.bulkDelete('meetups', null, {});
        await queryInterface.sequelize.query('ALTER SEQUENCE "meetups_id_seq" RESTART WITH 1');
    }
};
