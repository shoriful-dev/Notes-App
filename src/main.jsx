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
  createRoot(document.getElementById('root')).render(
    <div style={{ padding: '20px', textAlign: 'center', color: '#ef4444' }}>
      <h1>Authentication Setup Error</h1>
      <p>The Clerk Publishable Key is missing from your <b>frontend/.env</b> file.</p>
      <p>Please add: <code>VITE_CLERK_PUBLISHABLE_KEY=your_key_here</code></p>
    </div>
  )
} else {
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
}
