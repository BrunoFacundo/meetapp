import { Form, Input } from '@rocketseat/unform';
import { format } from 'date-fns';
import React from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import api from '~/services/api';
import BannerInput from './BannerInput';
import DateInput from './DateInput';
import { AddButton, Container, Content } from './styles';

const schema = Yup.object().shape({
    file: Yup.object().shape({ url: Yup.string().required('A imagem do banner é obrigatório') }),
    title: Yup.string().required('O título é obrigatório'),
    description: Yup.string()
        .max(255, 'A descrição pode ter no máximo 255 caracteres')
        .required('A descrição é obrigatória'),
    date: Yup.date().required('A data é obrigatória'),
    location: Yup.string().required('A localizção é obrigatória')
});

export default function Meetup({ history, location }) {
    const isNew = !location.state || !location.state.meetup;
    const meetup = isNew ? null : location.state.meetup;

    function base64toBlob(base64Data) {
        const sliceSize = 512;

        let [contentType, data] = base64Data.split(';');
        contentType = contentType.replace('data:', '');
        data = data.replace('base64,', '');

        let byteCharacters = atob(data);
        let byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice = byteCharacters.slice(offset, offset + sliceSize);

            let byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            byteArrays.push(new Uint8Array(byteNumbers));
        }

        return new Blob(byteArrays, { type: contentType });
    }

    async function handleSubmit(data) {
        if (isNew) {
            try {
                const [filename, base64Image] = data.file.url.split('|');
                const formData = new FormData();
                formData.append('file', base64toBlob(base64Image), filename);

                const response = await api.post('/files', formData);
                const { id } = response.data;
                data.file_id = id;
                delete data.file;

                data.date = format(data.date, 'yyyy-MM-dd HH:mm:00');

                await api.post('/meetups', data);

                toast.success('Meetup criada com sucesso!');
                history.push('/dashboard');
            } catch (err) {
                toast.error(err.isAxiosError ? err.response.data.error : 'Não foi possível criar a meetup!');
            }
        } else {
            try {
                data.file_id = meetup.file.id;
                if (!data.file.url.startsWith('http')) {
                    const [filename, base64Image] = data.file.url.split('|');
                    const formData = new FormData();
                    formData.append('file', base64toBlob(base64Image), filename);

                    const response = await api.post('/files', formData);
                    const { id } = response.data;
                    data.file_id = id;
                }
                delete data.file;

                data.date = format(data.date, 'yyyy-MM-dd HH:mm:00');

                await api.put(`/meetups/${meetup.id}`, data);

                toast.success('Meetup editada com sucesso!');
                history.push('/dashboard');
            } catch (err) {
                toast.error(err.isAxiosError ? err.response.data.error : 'Não foi possível editar a meetup!');
            }
        }
    }

    return (
        <Container>
            <Content>
                <Form schema={schema} onSubmit={handleSubmit} initialData={meetup}>
                    <BannerInput name="file.url" />
                    <Input name="title" type="text" placeholder="Título do meetup" />
                    <Input name="description" type="text" placeholder="Descrição completa" multiline />
                    <DateInput name="date" placeholder="Data do meetup" />
                    <Input name="location" type="text" placeholder="Localização" />
                    <AddButton type="submit">
                        <MdAddCircleOutline color="#fff" size={24} />
                        Salvar meetup
                    </AddButton>
                </Form>
            </Content>
        </Container>
    );
}
