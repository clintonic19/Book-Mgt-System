import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
// import App from './App.jsx'
import { RouterProvider } from 'react-router-dom';
import router from './routers/routes.jsx';

import 'sweetalert2/dist/sweetalert2.js';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
)
