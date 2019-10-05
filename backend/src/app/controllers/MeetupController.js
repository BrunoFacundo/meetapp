import Boom from '@hapi/boom';
import { endOfDay, isBefore, parseISO, startOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Cache from '../../lib/Cache';
import File from '../models/File';
import Meetup from '../models/Meetup';
import User from '../models/User';

class MeetupController {
    async index(req, res) {
        const searchDate = parseISO(req.query.date);
        const page = parseInt(req.query.page || 1);
        const limit = 10;

        const cachedKey = `meetups:date:${req.query.date}:page:${page}`;

        const cached = await Cache.get(cachedKey);
        if (cached) {
            return res.json(cached);
        }

        const where = {
            date: {
                [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)]
            }
        };

        const meetups = await Meetup.findAll({
            where,
            order: [['date', 'DESC']],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name']
                },
                {
                    model: File,
                    as: 'file'
                }
            ],
            limit,
            offset: 10 * page - 10
        });

        const count = await Meetup.count({ where });

        const result = {
            list: meetups.map(meetup => ({
                id: meetup.id,
                title: meetup.title,
                description: meetup.description,
                location: meetup.location,
                date: meetup.date,
                past: meetup.past,
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
        };

        await Cache.set(cachedKey, result);

        return res.json(result);
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
