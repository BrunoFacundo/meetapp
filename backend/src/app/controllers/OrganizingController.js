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

        let meetups = await Meetup.findAll({
            where: { user_id: req.userId },
            order: [['date', 'ASC']],
            include: [
                {
                    model: File,
                    as: 'file'
                }
            ]
        });

        // Order meetups
        const index = meetups.findIndex(meetup => !meetup.past);
        const pastMeetups = meetups.slice(0, index).reverse();
        const nextMeetups = meetups.slice(index);
        meetups = [...nextMeetups, ...pastMeetups];

        const result = meetups.map(meetup => ({
            id: meetup.id,
            title: meetup.title,
            description: meetup.description,
            location: meetup.location,
            date: meetup.date,
            past: meetup.past,
            file: {
                id: meetup.file.id,
                url: meetup.file.url,
                name: meetup.file.name
            }
        }));

        await Cache.set(cachedKey, result);

        return res.json(result);
    }
}

export default new OrganizingController();
