import { Form, Input } from '@rocketseat/unform';
import React from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { updateProfileRequest } from '~/store/modules/user/actions';
import { Container } from './styles';

const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
        .email('Insira um e-mail válido')
        .required('O e-mail é obrigatório'),
    oldPassword: Yup.string(),
    password: Yup.string().when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required().min(6, 'No mínimo 6 caracteres') : field
    ),
    passwordConfirmation: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')], 'As senhas não conferem') : field
    )
});

export default function Profile() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile);

    function handleSubmit(data) {
        dispatch(updateProfileRequest(data));
    }

    return (
        <Container>
            <Form initialData={profile} schema={schema} onSubmit={handleSubmit}>
                <Input name="name" placeholder="Nome completo" />
                <Input name="email" type="email" placeholder="Seu endereço de e-mail" />

                <hr />

                <Input type="password" name="oldPassword" placeholder="Senha atual" />
                <Input type="password" name="password" placeholder="Nova senha" />
                <Input type="password" name="passwordConfirmation" placeholder="Confirmação de senha" />

                <button type="submit">
                    <MdAddCircleOutline color="#fff" size={24} />
                    Salvar perfil
                </button>
            </Form>
        </Container>
    );
}
