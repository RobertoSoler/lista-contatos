import { Provider } from 'react-redux'
// ------------------------------------------------------------
// import BarraLateral from './containers/BarraLateral'
// import ListaDeTarefas from './containers/ListaDeTarefas'
import EstiloGlobal, { Container } from './styles'
//
// ************************************************************
//             SEM O REDUX
// ************************************************************
// function App() {
//   return (
//     <>
//       <EstiloGlobal />
//       <Container>
//         <BarraLateral />
//         <ListaDeTarefas />
//       </Container>
//     </>
//   )
// }

import store from './store'
import Home from './pages/Home'
import Cadastro from './pages/Cadastro'
// ------------------------------------------------------------
// Importação setup do React Router
// ------------------------------------------------------------
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const rotas = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/novo',
    element: <Cadastro />
  }
])

function App() {
  return (
    <Provider store={store}>
      <EstiloGlobal />
      <Container>
        <RouterProvider router={rotas} />
      </Container>
    </Provider>
  )
}

export default App
