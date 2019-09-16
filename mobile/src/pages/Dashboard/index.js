import { addDays, format, parseISO, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import React, { useEffect, useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import Header from '~/components/Header';
import api from '~/services/api';
import {
    Container,
    DateText,
    MeetupBanner,
    MeetupInfo,
    MeetupInfoText,
    MeetupItem,
    MeetupList,
    MeetupTitle,
    SubscriptionButton,
    SubscriptionButtonText,
    Title
} from './styles';

export default function Dashboard() {
    const [meetups, setMeetups] = useState([]);
    const [date, setDate] = useState(new Date());
    const [page, setPage] = useState(1);

    const dateFormatted = useMemo(() => format(date, "d 'de' MMMM", { locale: pt }), [date]);

    useEffect(() => {
        async function loadMeetups() {
            const response = await api.get('/meetups', {
                params: {
                    date: format(date, 'yyyy-MM-dd'),
                    page
                }
            });

            const data = response.data.map(meetup => ({
                ...meetup,
                dateFormatted: format(parseISO(meetup.date), "d 'de' MMMM', às' H'h'", { locale: pt })
            }));

            setMeetups(data);
        }
        loadMeetups();
    }, [date]);

    function handlePrev() {
        setDate(subDays(date, 1));
    }

    function handleNext() {
        setDate(addDays(date, 1));
    }

    return (
        <Background>
            <Header />
            <Container>
                <Title>
                    <Icon name="keyboard-arrow-left" color="#fff" size={30} onPress={handlePrev} />
                    <DateText>{dateFormatted}</DateText>
                    <Icon name="keyboard-arrow-right" color="#fff" size={30} onPress={handleNext} />
                </Title>
                <MeetupList
                    data={meetups}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item: meetup }) => (
                        <MeetupItem>
                            <MeetupBanner source={{ uri: meetup.file.url }} />
                            <MeetupTitle>{meetup.title}</MeetupTitle>
                            <MeetupInfo>
                                <Icon name="event" color="#999" size={16} />
                                <MeetupInfoText>{meetup.dateFormatted}</MeetupInfoText>
                            </MeetupInfo>
                            <MeetupInfo>
                                <Icon name="place" color="#999" size={16} />
                                <MeetupInfoText>{meetup.location}</MeetupInfoText>
                            </MeetupInfo>
                            <MeetupInfo>
                                <Icon name="person" color="#999" size={16} />
                                <MeetupInfoText>Organizador: {meetup.user.name}</MeetupInfoText>
                            </MeetupInfo>
                            <SubscriptionButton>
                                <SubscriptionButtonText>Realizar incrição</SubscriptionButtonText>
                            </SubscriptionButton>
                        </MeetupItem>
                    )}
                />
            </Container>
        </Background>
    );
}

Dashboard.navigationOptions = {
    tabBarLabel: 'Meetups',
    tabBarIcon: ({ tintColor }) => <Icon name="format-list-bulleted" size={20} color={tintColor} />
};
