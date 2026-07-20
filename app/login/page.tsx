'use client';

import { useState } from 'react';
import { supabase } from '@/supabaseClient';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleSignUp() {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setMessage(error.message);
    else setMessage('Check your email to confirm your account.');
  }

  async function handleSignIn() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
    else setMessage('Logged in!');
  }
  return (
    <div className="p-8 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <div className="flex gap-2">
        <button onClick={handleSignIn} className="border px-4 py-2">Log In</button>
        <button onClick={handleSignUp} className="border px-4 py-2">Sign Up</button>
      </div>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
