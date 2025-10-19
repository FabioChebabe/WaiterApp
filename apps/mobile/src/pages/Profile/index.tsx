import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthProvider';

const Profile = () => {
    const { logout } = useAuth();
    return (
        <SafeAreaView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Button onPress={logout}>Logout</Button>
        </SafeAreaView>
    );
};

export default Profile;
