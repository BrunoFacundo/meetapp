import File from '../models/File';
import Meetup from '../models/Meetup';

class OrganizingController {
    async index(req, res) {
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

        return res.json(
            meetups.map(meetup => ({
                id: meetup.id,
                title: meetup.title,
                description: meetup.description,
                location: meetup.location,
                date: meetup.date,
                file: {
                    id: meetup.file.id,
                    url: meetup.file.url
                }
            }))
        );
    }
}

export default new OrganizingController();
