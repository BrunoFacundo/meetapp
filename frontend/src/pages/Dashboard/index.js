import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import React, { useEffect, useState } from 'react';
import { MdAddCircleOutline, MdKeyboardArrowRight } from 'react-icons/md';
import api from '~/services/api';
import { Container, Content, EmptyList, Header, MeetupItem, MeetupList } from './styles';

export default function Dashboard({ history }) {
    const [meetups, setMeetups] = useState([]);

    useEffect(() => {
        async function loadMeetups() {
            const response = await api.get('organizing');
            const data = response.data.map(meetup => ({
                ...meetup,
                date: parseISO(meetup.date),
                dateFormatted: format(parseISO(meetup.date), "d 'de' MMMM', às' H'h'", { locale: pt })
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
            <Content>
                <Header>
                    <strong>Meus meetups</strong>
                    <button type="button" onClick={handlNewMeetup}>
                        <MdAddCircleOutline color="#fff" size={24} />
                        Novo meetup
                    </button>
                </Header>

                {meetups.length === 0 ? (
                    <EmptyList>Nenhuma meetup cadastrada.</EmptyList>
                ) : (
                    <MeetupList>
                        {meetups.map(meetup => (
                            <MeetupItem key={meetup.id} past={meetup.past} onClick={() => handleMeetupDetail(meetup)}>
                                <strong>
                                    {meetup.past && '[JÁ REALIZADA] '}
                                    {meetup.title}
                                </strong>
                                <div>
                                    <span>{meetup.dateFormatted}</span>
                                    <MdKeyboardArrowRight color="#fff" size={24} />
                                </div>
                            </MeetupItem>
                        ))}
                    </MeetupList>
                )}
            </Content>
        </Container>
    );
}
