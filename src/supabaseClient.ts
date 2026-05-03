
import { createClient } from '@supabase/supabase-js';

// Initialization function for dynamic keys
export const initSupabase = (url?: string, key?: string) => {
  // Hardcoded as requested + Dynamic support
  const supabaseUrl = url || 'https://qqnhqsgqsbvvrwacczuh.supabase.co' || localStorage.getItem('supabase_url') || '';
  const supabaseAnonKey = key || 'sb_publishable_U8cAVCAPPlLh1SAQKRMBxA_6ixrTdC9' || localStorage.getItem('supabase_key') || '';

  if (!supabaseUrl || !supabaseAnonKey) return null;
  
  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    console.error('Supabase init error:', e);
    return null;
  }
};

// Default client
export let supabase = initSupabase();

export const updateSupabaseClient = (url: string, key: string) => {
  localStorage.setItem('supabase_url', url);
  localStorage.setItem('supabase_key', key);
  supabase = initSupabase(url, key);
  return !!supabase;
};
