import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import Background from '~/components/Background';
import Header from '~/components/Header';
import api from '~/services/api';
import {
    Center,
    Container,
    EmptyListText,
    MeetupBanner,
    MeetupInfo,
    MeetupInfoText,
    MeetupItem,
    MeetupList,
    MeetupTitle,
    SubscriptionButton,
    SubscriptionButtonText
} from './styles';

function Subscription({ isFocused }) {
    const [meetups, setMeetups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    async function loadMeetups() {
        try {
            setLoading(true);

            const response = await api.get('/subscriptions');
            const data = response.data.map(meetup => ({
                ...meetup,
                dateFormatted: format(parseISO(meetup.date), "d 'de' MMMM', às' H'h'", { locale: pt })
            }));

            setMeetups(data);
        } catch (err) {
            Alert.alert('', 'Não foi possível carregar as meetups.');
        } finally {
            setRefreshing(false);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isFocused) {
            loadMeetups();
        }
    }, [isFocused]);

    async function handleCancelSubscription(meetup) {
        try {
            await api.delete(`/meetups/${meetup.id}/unsubscriptions`);

            setMeetups(meetups.filter(item => item.id != meetup.id));

            Alert.alert('', 'Incrição cancelada com sucesso.');
        } catch (err) {
            Alert.alert('', err.isAxiosError ? err.response.data.error : 'Não foi possível cancelar a inscrição.');
        }
    }

    function handleRefresh() {
        setRefreshing(true);
        loadMeetups();
    }

    return (
        <Background>
            <Header />
            <Container>
                {!loading && meetups.length == 0 && (
                    <Center>
                        <EmptyListText>Você não tem inscrição feita.</EmptyListText>
                    </Center>
                )}

                {!refreshing && loading && (
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
                            <SubscriptionButton onPress={() => handleCancelSubscription(meetup)}>
                                <SubscriptionButtonText>Cancelar incrição</SubscriptionButtonText>
                            </SubscriptionButton>
                        </MeetupItem>
                    )}
                />
            </Container>
        </Background>
    );
}

Subscription.navigationOptions = {
    tabBarLabel: 'Inscrições',
    tabBarIcon: ({ tintColor }) => <Icon name="local-offer" size={20} color={tintColor} />
};

export default withNavigationFocus(Subscription);
