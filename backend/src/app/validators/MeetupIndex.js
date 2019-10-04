import Boom from '@hapi/boom';
import * as Yup from 'yup';

export default async (req, res, next) => {
    try {
        const schema = Yup.object().shape({
            date: Yup.string()
                .matches(/^\d{4}-(0?[1-9]|1[012])-([12][0-9]|3[01]|0?[1-9])$/)
                .required(),
            page: Yup.number()
        });

        await schema.validate(req.query, { abortEarly: false });

        return next();
    } catch (err) {
        throw Boom.badRequest('Falha na validação dos dados.', { messages: err.inner });
    }
};
