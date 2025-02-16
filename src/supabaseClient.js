import { createClient } from '@supabase/supabase-js';

// Récupère-les depuis ton Dashboard Supabase -> Settings -> API
const supabaseUrl = 'https://jyyuujjhdyoxnwhycpgx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5eXV1ampoZHlveG53aHljcGd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2NjY3ODcsImV4cCI6MjA1NTI0Mjc4N30.yTvUyOaz694xA4QMA1OmTx0_FJrko9MWhjbmJSsPwgQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
