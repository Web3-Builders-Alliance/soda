import Layout from '@/components/Layout'
import { IDLProvider } from '@/context/IDL'
import { TemplatesProvider } from '@/context/templates'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <IDLProvider>
      <TemplatesProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TemplatesProvider>
    </IDLProvider>
  )
}
