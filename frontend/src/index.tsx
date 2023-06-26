import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import resources from './texts/locales';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import App from './App';

export const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

const init = async () => {
  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({ resources, fallbackLng: 'ru' });

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );
};

init();
