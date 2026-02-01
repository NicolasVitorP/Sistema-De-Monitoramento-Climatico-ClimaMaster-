// O StrictMode é uma ferramenta para destacar problemas potenciais na aplicação.
// Ele não renderiza nenhuma UI visível, mas ativa verificações e avisos adicionais para seus descendentes.
import { StrictMode } from 'react'
// createRoot é a nova API para montar aplicações React no DOM (React 18+).
import { createRoot } from 'react-dom/client'
// Importa os estilos globais da aplicação.
import './index.css'
// Importa o componente principal da aplicação.
import App from './App.jsx'

// Seleciona o elemento HTML com id 'root' e renderiza a aplicação React dentro dele.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Verifica se o navegador suporta Service Workers (para funcionalidade de PWA).
if ('serviceWorker' in navigator) {
  // Registra o Service Worker após o carregamento da página para não bloquear o carregamento inicial.
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
