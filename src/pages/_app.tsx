import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from '@/components/ui/sonner'
import { useEffect, useState } from 'react'
import { folderStore } from '@/stores/FolderStore'

export default function App({ Component, pageProps }: AppProps) {
  const [isStoreInitialized, setIsStoreInitialized] = useState(false)

  useEffect(() => {
    folderStore.initialize()
    setIsStoreInitialized(true)
  }, [])

  if (!isStoreInitialized) return null

  return (
    <>
      <Component {...pageProps} />
      <Toaster richColors position="top-center" />
    </>
  )
}
