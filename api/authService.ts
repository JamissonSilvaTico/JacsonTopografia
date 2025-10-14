// --- MOCK AUTHENTICATION SERVICE ---
// In a real application, this file would make API calls to your backend for authentication.
// For this simulation, we use localStorage to persist the user and sessionStorage for the session token.

const USER_STORAGE_KEY = 'gtecdrone_admin_user';
const SESSION_TOKEN_KEY = 'gtecdrone_session_token';

// Initialize with default admin user if one doesn't exist
const initializeUser = () => {
    if (!localStorage.getItem(USER_STORAGE_KEY)) {
        const defaultUser = {
            username: 'admin',
            password: 'comamor' // In a real app, this would be a hashed password
        };
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(defaultUser));
    }
};

initializeUser();

export const login = async (username, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => { // Simulate network delay
            const storedUser = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
            if (storedUser && storedUser.username === username && storedUser.password === password) {
                const token = `mock_token_${Date.now()}`;
                sessionStorage.setItem(SESSION_TOKEN_KEY, token);
                resolve({ success: true, token });
            } else {
                reject(new Error('Credenciais inválidas.'));
            }
        }, 500);
    });
};

export const logout = () => {
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
};

export const isAuthenticated = () => {
    return sessionStorage.getItem(SESSION_TOKEN_KEY) !== null;
};

export const changePassword = async (oldPassword, newPassword) => {
     return new Promise((resolve, reject) => {
        setTimeout(() => {
            const storedUser = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
            if (storedUser.password !== oldPassword) {
                reject(new Error('A senha antiga está incorreta.'));
                return;
            }
            if (!newPassword || newPassword.length < 6) {
                reject(new Error('A nova senha deve ter pelo menos 6 caracteres.'));
                return;
            }

            const updatedUser = { ...storedUser, password: newPassword };
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
            resolve({ success: true, message: 'Senha alterada com sucesso.' });
        }, 500);
    });
};