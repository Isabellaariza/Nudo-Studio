import { useApp } from '../contexts/AppContext';

export function LoginDebug() {
  const { users } = useApp();

  const clearLocalStorage = () => {
    localStorage.removeItem('nudostudio-users');
    localStorage.removeItem('nudostudio-currentUser');
    window.location.reload();
  };

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
      <h3 className="font-bold mb-2">Debug - Usuarios en el sistema:</h3>
      {users.map(user => (
        <div key={user.id} className="text-sm mb-1">
          <strong>{user.name}</strong> - {user.email} - {user.password} - {user.role}
        </div>
      ))}
      <button 
        onClick={clearLocalStorage}
        className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm"
      >
        Limpiar LocalStorage y Recargar
      </button>
    </div>
  );
}