import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '~/assets/logo.svg';
import history from '~/services/history';
import { signOut } from '~/store/modules/auth/actions';
import { Container, Content } from './styles';

export default function Header({ back }) {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile);

    function handleSignOut() {
        dispatch(signOut());
    }

    function handleBack() {
        history.goBack();
    }

    return (
        <Container>
            <Content>
                <nav>
                    <Link to="/dashboard">
                        <img src={logo} alt="Meetapp" />
                    </Link>
                    {back && (
                        <div onClick={handleBack}>
                            <MdArrowBack size={20} />
                            <span>Voltar</span>
                        </div>
                    )}
                </nav>

                <aside>
                    <div>
                        <strong>{profile.name}</strong>
                        <Link to="/profile">Meu perfil</Link>
                    </div>
                    <button type="button" onClick={handleSignOut}>
                        Sair
                    </button>
                </aside>
            </Content>
        </Container>
    );
}
