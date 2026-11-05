// Optional Supabase integration layer
// If VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are provided in .env,
// this allows remote cloud syncing; otherwise, the app operates flawlessly
// on the persistent offline-first unified storage service.

const metaEnv = (import.meta as any).env || {};
const supabaseUrl = metaEnv.VITE_SUPABASE_URL || '';
const supabaseAnonKey = metaEnv.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabaseConfig = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
  status: isSupabaseConfigured ? 'Connected' : 'Local Persistent Storage Mode (Zero Configuration Required)'
};
