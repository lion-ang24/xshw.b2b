import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fhjqxorzoihltutithrj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoanF4b3J6b2lobHR1dGl0aHJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzNDUyNDYsImV4cCI6MjA5NTkyMTI0Nn0.H13ovBn4UYLR6vi47D4F0-vO1Xf-8iw_YDxvO0LAOFE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
