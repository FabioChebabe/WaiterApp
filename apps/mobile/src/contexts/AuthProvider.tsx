import { createContext, use, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

enum AuthStatus {
    AUTHENTICATED = 'AUTHENTICATED',
    UNAUTHENTICATED = 'UNAUTHENTICATED',
    UNDETERMINED = 'UNDETERMINED',
}

interface AuthContextProps {
    login: () => void;
    logout: () => void;
    authState: AuthStatus;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authState, setAuthState] = useState<AuthStatus>(
        AuthStatus.UNDETERMINED,
    );

    const login = async () => {
        setAuthState(AuthStatus.AUTHENTICATED);
        await AsyncStorage.setItem('authStatus', AuthStatus.AUTHENTICATED);
    };

    const logout = async () => {
        setAuthState(AuthStatus.UNAUTHENTICATED);
        await AsyncStorage.removeItem('authStatus');
    };

    const checkAuthStatus = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const storedStatus = await AsyncStorage.getItem('authStatus');
        if (storedStatus === AuthStatus.AUTHENTICATED) {
            setAuthState(AuthStatus.AUTHENTICATED);
        } else {
            setAuthState(AuthStatus.UNAUTHENTICATED);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <AuthContext value={{ login, logout, authState }}>
            {children}
        </AuthContext>
    );
};

const useAuth = () => {
    const authContext = use(AuthContext);

    return authContext!;
};

export { AuthStatus, AuthProvider, useAuth };
