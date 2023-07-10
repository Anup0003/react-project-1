import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const supabaseUrl = 'https://gozalnkckauqugkmmvra.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvemFsbmtja2F1cXVna21tdnJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg4OTM1MjIsImV4cCI6MjAwNDQ2OTUyMn0.97L18gHuUN29rtuM9ltfZUhQ4WU8jRLZLSrNr0JIHRw'

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})