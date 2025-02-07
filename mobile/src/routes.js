import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Subscription from './pages/Subscription';

export default (isSigned = false) =>
    createAppContainer(
        createSwitchNavigator(
            {
                Sign: createSwitchNavigator({
                    SignIn,
                    SignUp
                }),
                App: createBottomTabNavigator(
                    {
                        Dashboard,
                        Subscription,
                        Profile
                    },
                    {
                        resetOnBlur: true,
                        tabBarOptions: {
                            keyboardHidesTabBar: true,
                            activeTintColor: '#FFF',
                            inactiveTintColor: 'rgba(255, 255, 255, 0.3)',
                            style: {
                                backgroundColor: '#2B1A2F',
                                height: 58,
                                paddingVertical: 8,
                                borderTopWidth: 0
                            },
                            labelStyle: {
                                fontSize: 14,
                                marginTop: 8
                            }
                        }
                    }
                )
            },
            {
                initialRouteName: isSigned ? 'App' : 'Sign'
            }
        )
    );
