import { addDays, format, parseISO, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import Header from '~/components/Header';
import api from '~/services/api';
import {
    Center,
    Container,
    DateText,
    EmptyListText,
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
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [moreLoading, setMoreLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const dateFormatted = useMemo(() => format(date, "d 'de' MMMM", { locale: pt }), [date]);

    async function loadMeetups(page = 1) {
        try {
            setLoading(true);

            const response = await api.get('/meetups', {
                params: {
                    date: format(date, 'yyyy-MM-dd'),
                    page
                }
            });

            const data = response.data.list.map(meetup => ({
                ...meetup,
                dateFormatted: format(parseISO(meetup.date), "d 'de' MMMM', às' H'h'", { locale: pt })
            }));

            setMeetups(page >= 2 ? [...meetups, ...data] : data);
            setPagination(response.data.pagination);
            setPage(page);
        } catch (err) {
            Alert.alert('', 'Não foi possível carregar as meetups.');
        } finally {
            setRefreshing(false);
            setMoreLoading(false);
            setLoading(false);
        }
    }

    useEffect(() => {
        setMeetups([]);
        loadMeetups();
    }, [date]);

    async function handleSubscription(meetup) {
        try {
            await api.post(`/meetups/${meetup.id}/subscriptions`);
            Alert.alert('', 'Incrição realizada com sucesso.');
        } catch (err) {
            Alert.alert('', err.isAxiosError ? err.response.data.error : 'Não foi possível fazer a inscrição.');
        }
    }

    function handlePrev() {
        setDate(subDays(date, 1));
    }

    function handleNext() {
        setDate(addDays(date, 1));
    }

    function handleRefresh() {
        setRefreshing(true);
        loadMeetups();
    }

    function handleLoadMore() {
        if (page + 1 <= pagination.pages) {
            setMoreLoading(true);
            loadMeetups(page + 1);
        }
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

                {!loading && meetups.length == 0 && (
                    <Center>
                        <EmptyListText>Nenhuma meetup diponível.</EmptyListText>
                    </Center>
                )}

                {!refreshing && !moreLoading && loading && (
                    <Center>
                        <ActivityIndicator size="large" color="#f94d6a" />
                    </Center>
                )}

                <MeetupList
                    loading={loading}
                    data={meetups}
                    keyExtractor={item => String(item.id)}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    onEndReachedThreshold={0.2}
                    onEndReached={handleLoadMore}
                    ListFooterComponent={
                        moreLoading && <ActivityIndicator size="large" color="#f94d6a" style={{ paddingBottom: 15 }} />
                    }
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
                            <SubscriptionButton onPress={() => handleSubscription(meetup)}>
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
