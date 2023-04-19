import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Contato from '../../models/Contato'
import * as enums from '../../utils/enums/Contato'

//********************************************************/
//                FAZENDO COM SLICE
//********************************************************/
// const contatosSlice = createSlice({
//   name: 'contatos',
//   initialState: {
//     itens: [
//       new Contato(
//         'Estudar Javascript',
//         enums.Categoria.PROFISSIONAL,
//         enums.Status.PENDENTE,
//         'fsdfsdfsadf',
//         1
//       ),
//       new Contato(
//         'Estudar Typescript',
//         enums.Categoria.PESSOAL,
//         enums.Status.CONCLUIDA,
//         'asfsadf',
//         2
//       ),
//       new Contato(
//         'Estudar React',
//         enums.Categoria.PROFISSIONAL,
//         enums.Status.PENDENTE,
//         'asdfsadf',
//         3
//       )
//     ]
//   },
//   reducers: {
//     remover: (state, action: PayloadAction<number>) => {
//       state.itens = state.itens.filter((contato) => contato.id !== action.payload)
//     }
//   }
// })
//********************************************************/
//              AGORA FAZENDO TIPO JSON
//********************************************************/
type ContatosState = {
  itens: Contato[]
}

const estadoInicial: ContatosState = {
  itens: [
    {
      id: 1,
      nome: 'Roberto de Oliveira',
      categoria: enums.Categoria.PROFISSIONAL,
      email: 'roberto.oliveira@gmail.com',
      telefone: '9862-6523'
    },
    {
      id: 2,
      nome: 'Mauricio da Silva',
      categoria: enums.Categoria.PESSOAL,
      email: 'mauricio..silva@gmail.com',
      telefone: '9862-6523'
    },
    {
      id: 3,
      nome: 'Paula Vilhena',
      categoria: enums.Categoria.PROFISSIONAL,
      email: 'paula.vilhena@gmail.com',
      telefone: '9862-6523'
    }
  ]
}

const contatosSlice = createSlice({
  name: 'contatos',
  initialState: estadoInicial,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter(
        (contato) => contato.id !== action.payload
      )
    },
    editar: (state, action: PayloadAction<Contato>) => {
      const indexDoContato = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )
      if (indexDoContato >= 0) {
        state.itens[indexDoContato] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Contato, 'id'>>) => {
      const contatoJaExiste = state.itens.find(
        (contato) =>
          contato.nome.toLowerCase() === action.payload.nome.toLowerCase()
      )

      if (contatoJaExiste) {
        alert('Já existe um contato com esse nome')
      } else {
        const ultimoContato = state.itens[state.itens.length - 1]

        const contatoNovo = {
          // ... significa tudo que está no payload
          ...action.payload,
          id: ultimoContato ? ultimoContato.id + 1 : 1
        }
        state.itens.push(contatoNovo)
      }
    }
  }
})

// desestruturacao das acoes
export const { remover, editar, cadastrar } = contatosSlice.actions

export default contatosSlice.reducer
