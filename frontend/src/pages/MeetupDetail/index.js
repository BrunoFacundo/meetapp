import React from 'react';
import { MdDeleteForever, MdEvent, MdModeEdit, MdRoom } from 'react-icons/md';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { Button, Container, Content, Detail, Header } from './styles';

export default function MeetupDetail({ history, location }) {
    if (!location.state) {
        return <Redirect to="/" />;
    }

    const { meetup } = location.state;

    async function handleEdit(meetup) {
        history.push('/meetup', { meetup });
    }

    async function handleCancel(id) {
        try {
            await api.delete(`/meetups/${id}`);
            toast.success('Meetup cancelada com sucesso!');
            history.push('/dashboard');
        } catch (err) {
            toast.error(err.isAxiosError ? err.response.data.error : 'Error ao cancelar meetup!');
        }
    }

    return (
        <Container>
            <Content>
                <Header>
                    <strong>{meetup.title}</strong>
                    <div>
                        <Button type="button" color="#4DBAF9" onClick={() => handleEdit(meetup)}>
                            <MdModeEdit color="#fff" size={24} />
                            Editar
                        </Button>
                        <Button type="button" color="#f94d6a" onClick={() => handleCancel(meetup.id)}>
                            <MdDeleteForever color="#fff" size={24} />
                            Cancelar
                        </Button>
                    </div>
                </Header>

                <Detail>
                    <img src={meetup.file.url} alt="Meetup" />
                    <p>{meetup.description}</p>
                    <div>
                        <span>
                            <MdEvent color="#ffffff99" size={20} />
                            {meetup.dateFormatted}
                        </span>
                        <span>
                            <MdRoom color="#ffffff99" size={20} />
                            {meetup.location}
                        </span>
                    </div>
                </Detail>
            </Content>
        </Container>
    );
}
