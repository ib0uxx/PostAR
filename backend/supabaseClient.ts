import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tbzgewjnfcjviexmgnsq.supabase.co"; // Replace with your Supabase URL
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiemdld2puZmNqdmlleG1nbnNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MTkyMjAsImV4cCI6MjA1NzI5NTIyMH0.aGbANeeHSe-MskK3U6z-DJI-x6TSAryHoS6mKonCF6w";
export const supabase = createClient(supabaseUrl, supabaseKey);
