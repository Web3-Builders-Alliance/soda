import { IDLProvider } from '@/context/IDL'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <IDLProvider>
      <Component {...pageProps} />
    </IDLProvider>
  )
}
