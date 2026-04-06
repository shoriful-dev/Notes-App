import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner'
import { UserProvider } from './context/userContext'
import { ThemeProvider } from 'next-themes'
import { ClerkProvider } from '@clerk/react'
import AuthInterceptor from './components/AuthInterceptor'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  console.error("Missing Clerk Publishable Key in .env file")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <UserProvider>
          <AuthInterceptor>
            <App />
          </AuthInterceptor>
          <Toaster />
        </UserProvider>
      </ThemeProvider>
    </ClerkProvider>
  </StrictMode>,
)
