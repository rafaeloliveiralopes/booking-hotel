import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

export default function Header() {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tighter">
          <Link to="/">Hotel Ponta do Sol</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link to="/my-bookings">Minhas reservas</Link>
              <Link to="/my-hotels">Hoteis</Link>
              <button>Sair</button>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center text-blue-600 px-3 font-bold bg-white rounded hover:bg-gray-100"
            >
              Entrar
            </Link>
          )}
        </span>
      </div>
    </div>
  );
}
