import React, { useEffect, useRef, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import Background from '~/components/Background';
import Header from '~/components/Header';
import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';
import { Container, Form, FormInput, LogoutButton, Separator, SubmitButton } from './styles';

export default function Profile() {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile);

    const emailRef = useRef();
    const oldPasswordRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    useEffect(() => {
        setOldPassword('');
        setPassword('');
        setConfirmPassword('');
    }, [profile]);

    function handleSubmit() {
        Keyboard.dismiss();
        let errors = false;

        if (name.trim().length == 0) {
            errors = true;
            setNameError(true);
        } else {
            setNameError(false);
        }

        if (email.trim().length == 0) {
            errors = true;
            setEmailError(true);
        } else {
            setEmailError(false);
        }

        if (oldPassword.trim().length > 0) {
            if (password.trim().length == 0) {
                errors = true;
                setPasswordError(true);
            } else {
                setPasswordError(false);
            }

            if (confirmPassword.trim().length == 0) {
                errors = true;
                setConfirmPasswordError(true);
            } else {
                setConfirmPasswordError(false);
            }
        }

        if (errors) {
            Alert.alert('', 'Preencha todos os campos obrigatórios');
        } else {
            dispatch(
                updateProfileRequest({
                    name,
                    email,
                    oldPassword,
                    password,
                    confirmPassword
                })
            );
        }
    }

    function handleLogout() {
        dispatch(signOut());
    }

    return (
        <Background>
            <Header />
            <Container>
                <Form>
                    <FormInput
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Nome completo"
                        returnKeyType="next"
                        error={nameError}
                        onSubmitEditing={() => emailRef.current.focus()}
                        value={name}
                        onChangeText={setName}
                    />

                    <FormInput
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Digite seu e-mail"
                        ref={emailRef}
                        error={emailError}
                        returnKeyType="next"
                        onSubmitEditing={() => oldPasswordRef.current.focus()}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Separator />

                    <FormInput
                        secureTextEntry
                        placeholder="Senha atual"
                        ref={oldPasswordRef}
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current.focus()}
                        value={oldPassword}
                        onChangeText={setOldPassword}
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Nova senha"
                        ref={passwordRef}
                        error={passwordError}
                        returnKeyType="next"
                        onSubmitEditing={() => confirmPasswordRef.current.focus()}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Confirmação de senha"
                        ref={confirmPasswordRef}
                        error={confirmPasswordError}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    <SubmitButton onPress={handleSubmit}>Salvar perfil</SubmitButton>
                    <LogoutButton onPress={handleLogout}>Sair do Meetapp</LogoutButton>
                </Form>
            </Container>
        </Background>
    );
}

Profile.navigationOptions = {
    tabBarLabel: 'Meu perfil',
    tabBarIcon: ({ tintColor }) => <Icon name="person" size={20} color={tintColor} />
};
