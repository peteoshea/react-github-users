import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as Sentry from '@sentry/react';
import { CaptureConsole } from '@sentry/integrations';

Sentry.init({
  dsn: 'https://9e4cec341bf84c0aa45e3ff97bfb5ce2@o430856.ingest.sentry.io/5380302',
  integrations: [new CaptureConsole()],
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
