import { configureStore } from '@reduxjs/toolkit'

// ************************************************************
//             CONFIGURAÇÃO INICIAL
// ************************************************************
// const store = ConfigureStore({
//   reducer: {

//   }
// })
// Próximo passo, criar os reducers para as tarefas dentro de uma pasta chamada 'reducers'
//
// ************************************************************

import tarefasReducer from './reducers/tarefas'
import filtroReducer from './reducers/filtro'

const store = configureStore({
  reducer: {
    tarefas: tarefasReducer,
    filtro: filtroReducer
  }
})

export type RootReducer = ReturnType<typeof store.getState>

export default store
