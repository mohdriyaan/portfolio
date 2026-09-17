import { useCallback, useEffect, useState } from 'react'

function readHashPath() {
  return window.location.hash.replace(/^#\/?/, '')
}

export function useHashRouter() {
  const [path, setPath] = useState(readHashPath)

  useEffect(() => {
    const onHashChange = () => setPath(readHashPath())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = useCallback((nextPath: string) => {
    window.location.hash = nextPath ? `/${nextPath}` : '/'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return { path, navigate }
}
