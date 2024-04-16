import { env } from '@/env'

import { createBrowserClient } from '@supabase/ssr'

import { Database } from '@/types/supabase.types'

const supabase = createBrowserClient<Database>(
	env.NEXT_PUBLIC_SUPABASE_URL,
	env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
)

export default supabase
