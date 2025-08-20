// authService.ts
import { supabase } from './supabaseClient';

export async function login({ email, password }: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  if (data.session) {
    localStorage.setItem('sb_session', JSON.stringify(data.session));
  }
  return data;
}

export async function register({ email, password, fullName, phone }: { email: string; password: string; fullName: string; phone: string }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone,
      },
    },
  });
  if (error) throw error;
  return data;
}

export async function logout() {
  await supabase.auth.signOut();
  localStorage.removeItem('sb_session');
}

export function getSession() {
  const session = localStorage.getItem('sb_session');
  return session ? JSON.parse(session) : null;
}
