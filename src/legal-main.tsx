import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LegalPage from './LegalPage.tsx'
import type { LegalDocumentKind } from './legal/types/legal.types'

// privacy.html and terms.html say which document they are on <body data-kind>.
const kind = document.body.dataset.kind as LegalDocumentKind

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LegalPage kind={kind} />
  </StrictMode>,
)
