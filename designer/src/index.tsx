import './index.css';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { ReactFlowProvider } from 'react-flow-renderer';
import { ToastProvider } from 'react-toast-notifications';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <ToastProvider
        autoDismiss
        autoDismissTimeout={3000}
        placement='top-center'
    >
        <ReactFlowProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </ReactFlowProvider>
    </ToastProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
