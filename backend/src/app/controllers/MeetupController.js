import Boom from '@hapi/boom';
import { endOfDay, isBefore, parseISO, startOfDay } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { Op } from 'sequelize';
import File from '../models/File';
import Meetup from '../models/Meetup';
import User from '../models/User';

class MeetupController {
    async index(req, res) {
        const { timezone } = req.headers;
        const searchDate = zonedTimeToUtc(parseISO(req.query.date), timezone);
        const page = parseInt(req.query.page || 1);
        const limit = 10;

        const where = {
            date: {
                [Op.between]: [
                    zonedTimeToUtc(startOfDay(searchDate), timezone),
                    zonedTimeToUtc(endOfDay(searchDate), timezone)
                ]
            }
        };
        const meetups = await Meetup.findAll({
            where,
            order: [['date', 'ASC']],
            include: [
                {
                    model: User,
                    as: 'user'
                },
                {
                    model: File,
                    as: 'file'
                },
                {
                    model: User,
                    as: 'subscribers',
                    required: false,
                    where: {
                        id: {
                            [Op.eq]: req.userId
                        }
                    }
                }
            ],
            limit,
            offset: 10 * page - 10
        });

        const count = await Meetup.count({ where });

        return res.json({
            list: meetups.map(meetup => ({
                id: meetup.id,
                title: meetup.title,
                description: meetup.description,
                location: meetup.location,
                date: meetup.date,
                past: meetup.past,
                subscriber: meetup.subscribers.length > 0,
                user: {
                    id: meetup.user.id,
                    name: meetup.user.name
                },
                file: {
                    id: meetup.file.id,
                    url: meetup.file.url,
                    name: meetup.file.name
                }
            })),
            pagination: {
                count,
                pages: Math.ceil(count / limit)
            }
        });
    }

    async store(req, res) {
        if (isBefore(parseISO(req.body.date), new Date())) {
            throw Boom.badRequest('Data da meetup já passou.');
        }

        const meetup = await Meetup.create({
            ...req.body,
            user_id: req.userId
        });
        const file = await meetup.getFile();

        return res.json({
            id: meetup.id,
            title: meetup.title,
            description: meetup.description,
            location: meetup.location,
            date: meetup.date,
            past: meetup.past,
            file: {
                id: file.id,
                url: file.url,
                name: file.name
            }
        });
    }

    async update(req, res) {
        const meetup = await Meetup.findByPk(req.params.id);

        if (!meetup) {
            throw Boom.badRequest('Meetup não encontrada.');
        }

        if (meetup.user_id !== req.userId) {
            throw Boom.unauthorized('Você não é o proprietário dessa meetup.');
        }

        if (meetup.past) {
            throw Boom.badRequest('Não é possível atualizar meetup que já foi realizada.');
        }

        await meetup.update(req.body);
        const file = await meetup.getFile();

        return res.json({
            id: meetup.id,
            title: meetup.title,
            description: meetup.description,
            location: meetup.location,
            date: meetup.date,
            past: meetup.past,
            file: {
                id: file.id,
                url: file.url,
                name: file.name
            }
        });
    }

    async delete(req, res) {
        const meetup = await Meetup.findByPk(req.params.id);

        if (!meetup) {
            throw Boom.badRequest('Meetup não encontrada.');
        }

        if (meetup.user_id !== req.userId) {
            throw Boom.unauthorized('Você não é o proprietário dessa meetup.');
        }

        if (meetup.past) {
            throw Boom.badRequest('Não é possível cancelar meetup que já foi realizada.');
        }

        await meetup.destroy();

        return res.send();
    }
}

export default new MeetupController();
