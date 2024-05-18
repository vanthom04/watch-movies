import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import { ClerkProvider } from '@clerk/clerk-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '~/App.tsx'
import '~/index.css'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
  // </ClerkProvider>
)
