import Boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw Boom.unauthorized('Usuário não encontrado.');
        }

        if (!(await user.checkPassword(password))) {
            throw Boom.unauthorized('Senha incorreta.');
        }

        const { id, name } = user;

        return res.json({
            user: {
                id,
                name,
                email
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        });
    }
}

export default new SessionController();
