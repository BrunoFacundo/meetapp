import User from '../models/User';

class UserController {
    async store(req, res) {
        const userExists = await User.findOne({
            where: { email: req.body.email }
        });

        if (userExists) {
            return res.status(400).json({ error: 'Usuário já cadastrado' });
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
                return res.status(400).json({ error: 'Usuário já existe' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Senha errada' });
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
