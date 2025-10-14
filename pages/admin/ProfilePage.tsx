import React, { useState } from 'react';
import { changePassword } from '../../api/authService';

const ProfilePage: React.FC = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (newPassword !== confirmPassword) {
            setError('As novas senhas não correspondem.');
            return;
        }

        setIsLoading(true);
        try {
            // FIX: Add type assertion for the result of changePassword to resolve 'unknown' type error on the next line.
            const result = await changePassword(oldPassword, newPassword) as { message: string };
            setMessage(result.message);
            // Clear fields on success
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Alterar Senha</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Senha Antiga</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Nova Senha</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-1">Confirmar Nova Senha</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>

                    {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
                    {message && <p className="text-sm text-green-600 mb-4">{message}</p>}

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:bg-sky-400"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
