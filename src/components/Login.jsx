import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (login(username, password)) navigate('/manager');
    else setError('Incorrect username or password.');
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white border border-[#EDEBE6] rounded-2xl p-8 w-80">
        <h1 className="text-lg font-semibold text-[#1C1C1E] mb-6">Manager login</h1>

        <label className="block text-sm text-[#6B6B6F] mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border border-[#E7E5E2] rounded-lg px-3 py-2 mb-4 text-sm text-[#1C1C1E] focus:outline-none focus:border-[#1F3A5F] transition-colors"
          placeholder="john.doe"
        />

        <label className="block text-sm text-[#6B6B6F] mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-[#E7E5E2] rounded-lg px-3 py-2 mb-4 text-sm text-[#1C1C1E] focus:outline-none focus:border-[#1F3A5F] transition-colors"
          placeholder="••••••••"
        />

        {error && <p className="text-[#C1443A] text-sm mb-3">{error}</p>}

        <button type="submit" className="w-full bg-[#14140F] text-white text-sm font-semibold py-3 rounded-full hover:bg-[#2B2A24] transition-colors">
  Log in
</button>

        <p className="text-xs text-[#9B9B9E] mt-4">Demo: john.doe / pass123</p>
      </form>
    </div>
  );
}

export default Login;