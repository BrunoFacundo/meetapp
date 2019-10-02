import Boom from '@hapi/boom';
import * as Yup from 'yup';

export default async (req, res, next) => {
    try {
        const schema = Yup.object().shape({
            file: Yup.object()
                .shape({
                    originalname: Yup.string().required(),
                    filename: Yup.string().required()
                })
                .required()
        });

        await schema.validate(req, { abortEarly: false });

        return next();
    } catch (err) {
        throw Boom.badRequest('Falha na validação dos dados.', { messages: err.inner });
    }
};
