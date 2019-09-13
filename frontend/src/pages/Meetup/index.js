import { Form, Input } from '@rocketseat/unform';
import React from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import BannerInput from './BannerInput';
import { Container, Content } from './styles';

export default function Meetup({ location }) {
    const isNew = !location.state || !location.state.meetup;
    const meetup = isNew ? null : location.state.meetup;

    function handleSubmit(data) {
        console.log(data);
    }

    return (
        <Container>
            <Content>
                <Form onSubmit={handleSubmit} initialData={meetup}>
                    <BannerInput name="file" />
                    <Input name="title" type="text" placeholder="Título do meetup" />
                    <Input name="description" type="text" placeholder="Descrição completa" multiline />
                    <Input name="date" type="text" placeholder="Data do meetup" />
                    <Input name="location" type="text" placeholder="Localização" />
                    <button type="submit">
                        <MdAddCircleOutline color="#fff" size={24} />
                        Salvar meetup
                    </button>
                </Form>
            </Content>
        </Container>
    );
}
