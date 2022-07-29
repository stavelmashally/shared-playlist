import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/index.css';
import { AppProvider } from './providers/AppProviders';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppProvider>
    <App />
  </AppProvider>
);
