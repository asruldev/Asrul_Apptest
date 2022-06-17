import { configureStore } from '@reduxjs/toolkit';
import contact from './contact';
import contactDetail from './contactDetail';
import thunk from 'redux-thunk'

export default configureStore({
  reducer: {
    contact,
    contactDetail,
  },
  middleware: [thunk],
})