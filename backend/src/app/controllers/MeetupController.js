import { endOfDay, isBefore, parseISO, startOfDay } from 'date-fns';
import { Op } from 'sequelize';
import * as Yup from 'yup';
import File from '../models/File';
import Meetup from '../models/Meetup';
import User from '../models/User';

class MeetupController {
    async index(req, res) {
        const where = {};
        const page = req.query.page || 1;

        if (req.query.date) {
            const searchDate = parseISO(req.query.date);

            where.date = {
                [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)]
            };
        }

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
                    as: 'file',
                    attributes: ['id', 'url', 'path']
                }
            ],
            limit: 10,
            offset: 10 * page - 10
        });

        return res.json(
            meetups.map(meetup => ({
                id: meetup.id,
                title: meetup.title,
                description: meetup.description,
                location: meetup.location,
                date: meetup.date,
                user: {
                    id: meetup.user.id,
                    name: meetup.user.name
                },
                file: {
                    id: meetup.file.id,
                    url: meetup.file.url
                }
            }))
        );
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string().required(),
            location: Yup.string().required(),
            date: Yup.date().required(),
            file_id: Yup.number().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação dos dados' });
        }

        if (isBefore(parseISO(req.body.date), new Date())) {
            return res.status(400).json({ error: 'Data da meetup inválida' });
        }

        const meetup = await Meetup.create({
            ...req.body,
            user_id: req.userId
        });
        const file = await File.findByPk(req.body.file_id);

        return res.json({
            id: meetup.id,
            title: meetup.title,
            description: meetup.description,
            location: meetup.location,
            date: meetup.date,
            file: {
                id: file.id,
                url: file.url
            }
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            file_id: Yup.number().required(),
            description: Yup.string().required(),
            location: Yup.string().required(),
            date: Yup.date().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação dos dados' });
        }

        const user_id = req.userId;
        const meetup = await Meetup.findByPk(req.params.id);

        if (meetup.user_id !== user_id) {
            return res.status(401).json({ error: 'Não autorizado' });
        }

        if (isBefore(parseISO(req.body.date), new Date())) {
            return res.status(400).json({ error: 'Data da meetup inválida' });
        }

        if (meetup.past) {
            return res.status(400).json({ error: 'Não é possível atualizar meetup passada' });
        }

        await meetup.update(req.body);
        const file = await File.findByPk(req.body.file_id);

        return res.json({
            id: meetup.id,
            title: meetup.title,
            description: meetup.description,
            location: meetup.location,
            date: meetup.date,
            file: {
                id: file.id,
                url: file.url
            }
        });
    }

    async delete(req, res) {
        const user_id = req.userId;

        const meetup = await Meetup.findByPk(req.params.id);

        if (meetup.user_id !== user_id) {
            return res.status(401).json({ error: 'Não autorizado' });
        }

        if (meetup.past) {
            return res.status(400).json({ error: 'Não é possível deletar meetup passada' });
        }

        await meetup.destroy();

        return res.send();
    }
}

export default new MeetupController();
