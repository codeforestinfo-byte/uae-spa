import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js';
import {AppProvider} from './context/AppContext';
import {AuthProvider} from './context/AuthContext';
import {stripePromise} from './lib/stripe';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          {stripePromise ? (
            <Elements stripe={stripePromise}>
              <App />
            </Elements>
          ) : (
            <App />
          )}
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
