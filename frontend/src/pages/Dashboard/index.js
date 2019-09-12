import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import React, { useEffect, useState } from 'react';
import { MdAddCircleOutline, MdKeyboardArrowRight } from 'react-icons/md';
import api from '~/services/api';
import history from '~/services/history';
import { Container, Header, Meetups } from './styles';

export default function Dashboard() {
    const [meetups, setMeetups] = useState([]);

    useEffect(() => {
        async function loadMeetups() {
            const response = await api.get('organizing');
            const data = response.data.map(meetup => ({
                ...meetup,
                dateFormatted: format(parseISO(meetup.date), "d 'de' MMMM', às ' H'h'", { locale: pt })
            }));

            setMeetups(data);
        }

        loadMeetups();
    }, []);

    function handlNewMeetup() {
        history.push('/meetup');
    }

    function handleMeetupDetail(meetup) {
        history.push('/meetup/detail', { meetup });
    }

    return (
        <Container>
            <Header>
                <strong>Meus meetups</strong>
                <button type="button" onClick={handlNewMeetup}>
                    <MdAddCircleOutline color="#fff" size={24} />
                    Novo meetup
                </button>
            </Header>

            <Meetups>
                {meetups.map(meetup => (
                    <li key={meetup.id} onClick={() => handleMeetupDetail(meetup)}>
                        <strong>{meetup.title}</strong>
                        <div>
                            <span> {meetup.dateFormatted}</span>
                            <MdKeyboardArrowRight color="#fff" size={24} />
                        </div>
                    </li>
                ))}
            </Meetups>
        </Container>
    );
}
