import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Button } from '@/components/ui/button'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <h1 className="bg-red-950 text-3xl font-bold underline">Hello world!</h1>
    <Button size="lg">Click me</Button>
  </StrictMode>
)
