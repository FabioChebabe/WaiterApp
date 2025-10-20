import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStatus, useAuth } from '../contexts/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../pages/auth/Login';
import Main from '../pages/Main';
import Profile from '../pages/Profile';
import { Octicons } from '@expo/vector-icons';
import Splash from '../pages/Splash';
import Orders from '../pages/Orders';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#D73035',
            }}
        >
            <Tab.Screen
                name="Home"
                component={Main}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Octicons name="home" color={color} />
                    ),
                }}
            />
            <Tab.Screen name="Orders" component={Orders} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};

const NativeStack = createNativeStackNavigator();

const Navigation = () => {
    const { authState } = useAuth();

    return (
        <NavigationContainer>
            <NativeStack.Navigator screenOptions={{ headerShown: false }}>
                {authState === AuthStatus.UNDETERMINED && (
                    <NativeStack.Group>
                        <NativeStack.Screen
                            name="SplashScreen"
                            component={Splash}
                        />
                    </NativeStack.Group>
                )}
                {authState === AuthStatus.UNAUTHENTICATED && (
                    <NativeStack.Group>
                        <NativeStack.Screen name="Login" component={Login} />
                    </NativeStack.Group>
                )}

                {authState === AuthStatus.AUTHENTICATED && (
                    <NativeStack.Group>
                        <NativeStack.Screen
                            name="Main"
                            component={TabNavigation}
                        />
                    </NativeStack.Group>
                )}
            </NativeStack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
