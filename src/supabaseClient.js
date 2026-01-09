// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gutaldbubyrotbdzapmm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1dGFsZGJ1Ynlyb3RiZHphcG1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczMzk5ODMsImV4cCI6MjA4MjkxNTk4M30.idzqsApj5E7N0w09IkJoz_DQ_WgXnmf8kroUD__nG5g";

export const supabase = createClient(supabaseUrl, supabaseKey);
