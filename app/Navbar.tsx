'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/supabaseClient';
import Link from 'next/link';
export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
  }
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <Link href="/" className="font-bold">Code Pilates</Link>
      {user ? (
        <div className="flex items-center gap-4">
          <Link href="/favorites">My Favorites</Link>
<span className="ml-4">{user.email}</span>
          <button onClick={handleLogout} className="border px-3 py-1">Logout</button>
        </div>
      ) : (
        <Link href="/login" className="border px-3 py-1">Log In</Link>
      )}
    </nav>
  );
}