import * as Yup from 'yup';
import Boom from '@hapi/boom';

export default async (req, res, next) => {
    try {
        const schema = Yup.object().shape({
            id: Yup.number()
        });

        await schema.validate(req.params, { abortEarly: false });

        return next();
    } catch (err) {
        throw Boom.badRequest('Falha na validação dos dados.', { messages: err.inner });
    }
};
