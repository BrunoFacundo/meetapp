import Boom from '@hapi/boom';
import User from '../models/User';

class UserController {
    async store(req, res) {
        const userExists = await User.findOne({
            where: { email: req.body.email }
        });

        if (userExists) {
            throw Boom.badRequest('Usuário já cadastrado.');
        }

        const { id, name, email } = await User.create(req.body);

        return res.json({
            id,
            name,
            email
        });
    }

    async update(req, res) {
        const user = await User.findByPk(req.userId);

        const { email, oldPassword } = req.body;
        if (email && email !== user.email) {
            const userExists = await User.findOne({ where: { email } });

            if (userExists) {
                throw Boom.badRequest('Usuário já cadastrado.');
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            throw Boom.unauthorized('Senha incorreta.');
        }

        const { id, name } = await user.update({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password ? req.body.password : user.password
        });

        return res.json({
            id,
            name,
            email
        });
    }
}

export default new UserController();
