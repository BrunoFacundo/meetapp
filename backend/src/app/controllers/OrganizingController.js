import Cache from '../../lib/Cache';
import File from '../models/File';
import Meetup from '../models/Meetup';

class OrganizingController {
    async index(req, res) {
        const cachedKey = `user:${req.userId}:organizing`;

        const cached = await Cache.get(cachedKey);
        if (cached) {
            return res.json(cached);
        }

        const meetups = await Meetup.findAll({
            where: { user_id: req.userId },
            order: [['date', 'DESC']],
            include: [
                {
                    model: File,
                    as: 'file',
                    attributes: ['id', 'url', 'path']
                }
            ]
        });

        const result = meetups.map(meetup => ({
            id: meetup.id,
            title: meetup.title,
            description: meetup.description,
            location: meetup.location,
            date: meetup.date,
            file: {
                id: meetup.file.id,
                url: meetup.file.url
            }
        }));

        await Cache.set(cachedKey, result);

        return res.json(result);
    }
}

export default new OrganizingController();
