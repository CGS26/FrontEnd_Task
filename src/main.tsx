import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <I18nextProvider i18n={i18n}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </I18nextProvider>
);
