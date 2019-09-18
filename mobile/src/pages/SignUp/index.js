import React, { useRef, useState } from 'react';
import { Alert, Image, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import logo from '~/assets/logo.png';
import Background from '~/components/Background';
import { signUpRequest } from '~/store/modules/auth/actions';
import { Container, Form, FormInput, SignLink, SignLinkText, SubmitButton } from './styles';

export default function SignUp({ navigation }) {
    const dispatch = useDispatch();

    const emailRef = useRef();
    const passwordRef = useRef();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const loading = useSelector(state => state.auth.loading);

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

        if (password.trim().length == 0) {
            errors = true;
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }

        if (errors) {
            Alert.alert('', 'Preencha todos os campos obrigatórios');
        } else {
            dispatch(signUpRequest(name, email, password));
        }
    }

    return (
        <Background>
            <Container>
                <Image source={logo} />

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
                        returnKeyType="next"
                        error={emailError}
                        onSubmitEditing={() => passwordRef.current.focus()}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <FormInput
                        secureTextEntry
                        placeholder="Sua senha secreta"
                        ref={passwordRef}
                        returnKeyType="send"
                        error={passwordError}
                        onSubmitEditing={handleSubmit}
                        value={password}
                        onChangeText={setPassword}
                    />

                    <SubmitButton loading={loading} onPress={handleSubmit}>
                        Criar conta
                    </SubmitButton>
                </Form>

                <SignLink onPress={() => navigation.navigate('SignIn')}>
                    <SignLinkText>Já tenho login</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}
