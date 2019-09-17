import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    padding: 20px 20px 0;
`;

export const Center = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-top: -15px;
`;

export const EmptyListText = styled.Text`
    font-size: 18px;
    color: #fff;
    font-weight: bold;
`;

export const MeetupList = styled.FlatList`
    width: 100%;
    flex-grow: 0;
`;

export const MeetupItem = styled.View`
    background: #fff;
    padding: 15px;
    border-radius: 4px;
    width: 100%;
    margin-bottom: 20px;
    overflow: hidden;
`;

export const MeetupBanner = styled.Image`
    width: ${() => Dimensions.get('window').width - 40}px;
    height: 180px;
    margin: -15px 0 0 -15px;
`;

export const MeetupTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin: 15px 0;
`;

export const MeetupInfo = styled.View`
    margin-bottom: 5px;
    flex-direction: row;
    align-items: center;
`;

export const MeetupInfoText = styled.Text`
    font-size: 16px;
    color: #999;
    margin-left: 10px;
`;

export const SubscriptionButton = styled(Button)`
    margin-top: 10px;
`;

export const SubscriptionButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #fff;
`;
