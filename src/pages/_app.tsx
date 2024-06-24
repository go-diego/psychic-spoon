import { useState } from 'react'
import type { AppProps } from 'next/app'
import { Toaster } from '@/components/ui/toaster'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@/styles/globals.css'

import { Inter } from 'next/font/google'
import Header from '@/components/header'
import { UserProvider } from '@/data/user'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Header />
        <main
          className={`flex h-[calc(100vh-64px)] flex-col ${inter.className}`}
        >
          <Component {...pageProps} />
        </main>
        <Toaster />
      </UserProvider>
    </QueryClientProvider>
  )
}
