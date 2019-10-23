import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import React, { useEffect, useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { MdAddCircleOutline, MdKeyboardArrowRight } from 'react-icons/md';
import api from '~/services/api';
import { Container, Content, EmptyList, Header, LoadingList, MeetupItem, MeetupList } from './styles';

export default function Dashboard({ history }) {
    const [loading, setLoading] = useState(true);
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
            setLoading(false);
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

                {loading && <LoadingList />}

                {!loading && meetups.length === 0 && <EmptyList>Nenhuma meetup cadastrada.</EmptyList>}

                {meetups.length > 0 && (
                    <MeetupList>
                        {meetups.map(meetup => (
                            <MeetupItem key={meetup.id} onClick={() => handleMeetupDetail(meetup)}>
                                <strong>
                                    {meetup.title}
                                    {meetup.past && (
                                        <span>
                                            <FiAlertTriangle />
                                            Essa meetup já foi realizada
                                        </span>
                                    )}
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
