import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    padding: 16px 16px 0;
`;

export const Center = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-top: -16px;
`;

export const EmptyListText = styled.Text`
    font-size: 18px;
    color: #fff;
    font-weight: bold;
`;

export const Title = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
`;

export const DateText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    margin: 0 10px;
`;

export const MeetupList = styled.FlatList`
    width: 100%;
    flex-grow: 0;
`;

export const MeetupItem = styled.View`
    background: #fff;
    padding: 16px;
    border-radius: 4px;
    width: 100%;
    margin-bottom: 16px;
    overflow: hidden;
`;

export const MeetupBanner = styled.Image`
    width: ${() => Dimensions.get('window').width - 32}px;
    height: 180px;
    margin: -16px 0 0 -16px;
`;

export const MeetupTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin: 16px 0;
`;

export const MeetupInfo = styled.View`
    margin-bottom: 6px;
    flex-direction: row;
    align-items: center;
`;

export const MeetupInfoText = styled.Text`
    font-size: 16px;
    color: #999;
    margin-left: 10px;
`;

export const StatusText = styled.Text`
    margin-top: 10px;
    font-size: 18px;
    text-align: center;
    line-height: 50px;
    height: 50px;
    color: #f94d6a;
    background: #fff;
    border: 1px solid #f94d6a;
    border-radius: 4px;
`;

export const SubscriptionButton = styled(Button)`
    margin-top: 10px;
`;

export const SubscriptionButtonText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #fff;
`;
