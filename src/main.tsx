import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';

import App from './app/App.tsx';
import { setupMocking } from './app/mocks';

import './index.css';

setupMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
