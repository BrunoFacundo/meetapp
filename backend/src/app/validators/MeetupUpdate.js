import * as Yup from 'yup';

export default async (req, res, next) => {
    try {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            description: Yup.string().required(),
            location: Yup.string().required(),
            date: Yup.date().required(),
            file_id: Yup.number().required()
        });

        await schema.validate(req.body, { abortEarly: false });

        return next();
    } catch (err) {
        return res.status(400).json({ error: 'Falha na validação dos dados', messages: err.inner });
    }
};
