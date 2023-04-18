import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Tarefa from '../../models/Tarefa'
import * as enums from '../../utils/enums/Tarefa'

//********************************************************/
//                FAZENDO COM SLICE
//********************************************************/
// const tarefasSlice = createSlice({
//   name: 'tarefas',
//   initialState: {
//     itens: [
//       new Tarefa(
//         'Estudar Javascript',
//         enums.Prioridade.IMPORTANTE,
//         enums.Status.PENDENTE,
//         'fsdfsdfsadf',
//         1
//       ),
//       new Tarefa(
//         'Estudar Typescript',
//         enums.Prioridade.URGENTE,
//         enums.Status.CONCLUIDA,
//         'asfsadf',
//         2
//       ),
//       new Tarefa(
//         'Estudar React',
//         enums.Prioridade.IMPORTANTE,
//         enums.Status.PENDENTE,
//         'asdfsadf',
//         3
//       )
//     ]
//   },
//   reducers: {
//     remover: (state, action: PayloadAction<number>) => {
//       state.itens = state.itens.filter((tarefa) => tarefa.id !== action.payload)
//     }
//   }
// })
//********************************************************/
//              AGORA FAZENDO TIPO JSON
//********************************************************/
type TarefasState = {
  itens: Tarefa[]
}

const estadoInicial: TarefasState = {
  itens: [
    {
      id: 1,
      titulo: 'Estudar Javascript',
      prioridade: enums.Prioridade.IMPORTANTE,
      status: enums.Status.PENDENTE,
      descricao: 'fsdfsdfsadf'
    },
    {
      id: 2,
      titulo: 'Estudar Python',
      prioridade: enums.Prioridade.URGENTE,
      status: enums.Status.PENDENTE,
      descricao: 'fsdfsdfsadf'
    },
    {
      id: 3,
      titulo: 'Rever Bootstrap',
      prioridade: enums.Prioridade.IMPORTANTE,
      status: enums.Status.CONCLUIDA,
      descricao: 'fsdfsdfsadf'
    }
  ]
}

const tarefasSlice = createSlice({
  name: 'tarefas',
  initialState: estadoInicial,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((tarefa) => tarefa.id !== action.payload)
    },
    editar: (state, action: PayloadAction<Tarefa>) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )
      if (indexDaTarefa >= 0) {
        state.itens[indexDaTarefa] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Tarefa, 'id'>>) => {
      const tarefaJaExiste = state.itens.find(
        (tarefa) =>
          tarefa.titulo.toLowerCase() === action.payload.titulo.toLowerCase()
      )

      if (tarefaJaExiste) {
        alert('Já existe uma tarefa com esse nome')
      } else {
        const ultimaTarefa = state.itens[state.itens.length - 1]

        const tarefaNova = {
          // ... significa tudo que está no payload
          ...action.payload,
          id: ultimaTarefa ? ultimaTarefa.id + 1 : 1
        }
        state.itens.push(tarefaNova)
      }
    },
    alteraStatus: (
      state,
      action: PayloadAction<{ id: number; finalizado: boolean }>
    ) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )
      if (indexDaTarefa >= 0) {
        state.itens[indexDaTarefa].status = action.payload.finalizado
          ? enums.Status.CONCLUIDA
          : enums.Status.PENDENTE
      }
    }
  }
})

// desestruturacao das acoes
export const { remover, editar, cadastrar, alteraStatus } = tarefasSlice.actions

export default tarefasSlice.reducer
