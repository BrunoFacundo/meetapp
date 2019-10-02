import Boom from '@hapi/boom';
import * as Yup from 'yup';

export default async (req, res, next) => {
    try {
        const schema = Yup.object().shape({
            meetupId: Yup.number().required()
        });

        await schema.validate(req.params, { abortEarly: false });

        return next();
    } catch (err) {
        throw Boom.badRequest('Falha na validação dos dados.', { messages: err.inner });
    }
};
