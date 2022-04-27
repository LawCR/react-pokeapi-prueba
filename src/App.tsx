
import { Provider as ReduxProvider  } from 'react-redux'
import store from './redux/store'
import './App.css'
import AppRoute from './routes/AppRoute';

function App() {

    return (
      <ReduxProvider store={store}>
          <AppRoute />
      </ReduxProvider>
    )
}

export default App
