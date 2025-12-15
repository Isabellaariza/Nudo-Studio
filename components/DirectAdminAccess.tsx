import { useState } from 'react';

interface DirectAdminAccessProps {
  onAdminAccess: () => void;
}

export function DirectAdminAccess({ onAdminAccess }: DirectAdminAccessProps) {
  const [password, setPassword] = useState('');

  const handleAccess = () => {
    if (password === 'admin123') {
      onAdminAccess();
    } else {
      alert('Contraseña incorrecta');
    }
  };

  return (
    <div className="fixed top-1/2 left-4 p-4 bg-red-500 text-white rounded z-50">
      <div className="mb-2">Acceso Directo Admin:</div>
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="px-2 py-1 text-black rounded mr-2"
      />
      <button
        onClick={handleAccess}
        className="px-3 py-1 bg-white text-red-500 rounded"
      >
        Entrar
      </button>
    </div>
  );
}