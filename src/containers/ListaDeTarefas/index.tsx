import Tarefa from '../../components/Tarefa'
import { MainContainer, Titulo } from '../../styles'

// ************************************************************
//             CONFIGURAÇÃO INICIAL
// ************************************************************
// const tarefas = [
//   {
//     titulo: 'Estudar TypeScript',
//     descricao: 'Ver a aula 3 da EBAC',
//     prioridade: enums.Prioridade.IMPORTANTE,
//     status: enums.Status.PENDENTE
//   },
//   {
//     titulo: 'Estudar TypeScript',
//     descricao: 'Ver a aula 3 da EBAC',
//     prioridade: enums.Prioridade.URGENTE,
//     status: enums.Status.CONCLUIDA
//   },
//   {
//     titulo: 'Estudar TypeScript',
//     descricao: 'Ver a aula 3 da EBAC',
//     prioridade: enums.Prioridade.IMPORTANTE,
//     status: enums.Status.PENDENTE
//   }
// ]
//
// const ListaDeTarefas = () => (
//   <Container>
//     <p>2 tarefas marcadas como: &quot;categoria&ldquo; e &quot;termo&ldquo;</p>
//     <ul>
//       {tarefas.map((t) => (
//         <li key={t.titulo}>
//           <Tarefa
//             descricao={t.descricao}
//             titulo={t.titulo}
//             status={t.status}
//             prioridade={t.prioridade}
//           />
//         </li>
//       ))}
//     </ul>
//   </Container>
// )

import { useSelector } from 'react-redux/es/exports'
import { RootReducer } from '../../store'

const ListaDeTarefas = () => {
  const { itens } = useSelector((state: RootReducer) => state.tarefas)
  // opcao *****  const tarefas = useSelector((state: RootReducer) => state.tarefas)
  const { termo, criterio, valor } = useSelector(
    (state: RootReducer) => state.filtro
  )
  //
  // Quando era só pra procurar a tarefa era assim:
  // const filtraTarefas = () => {
  //   // como o termo é um item opcional, tem que colocar esse if pra ver se o termo existe
  //   if (termo) {
  //     return itens.filter(
  //       (item) => item.titulo.toLowerCase().search(termo.toLowerCase()) >= 0
  //     )
  //   } else {
  //     return itens
  //   }
  // }
  //
  // agora vai filtrar por outros criterios tambem:
  const filtraTarefas = () => {
    let tarefasFiltradas = itens
    // como o termo é um item opcional, tem que colocar esse if pra ver se o termo existe
    if (termo !== undefined) {
      tarefasFiltradas = tarefasFiltradas.filter(
        (item) => item.titulo.toLowerCase().search(termo.toLowerCase()) >= 0
      )

      if (criterio === 'prioridade') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.prioridade === valor
        )
      } else if (criterio === 'status') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.status === valor
        )
      }

      return tarefasFiltradas
    } else {
      return itens
    }
  }
  // --------------
  const exibeResultadoFiltragem = (quantidade: number) => {
    let mensagem = ''
    const complementacao =
      termo !== undefined && termo.length > 0 ? `e "${termo}"` : ''

    if (criterio === 'todas') {
      mensagem = `${quantidade} tarefa(s) encontrada(s) como: todas ${complementacao}`
    } else {
      mensagem = `${quantidade} tarefas(s) encontrada(s) como: "${`${criterio}=${valor}`}" ${complementacao}`
    }
    return mensagem
  }
  // --------------
  const tarefas = filtraTarefas()
  const mensagem = exibeResultadoFiltragem(tarefas.length)
  // --------------
  return (
    <MainContainer>
      <Titulo as="p">{mensagem}</Titulo>
      <ul>
        {/* quando não tinha filtro era assim... */}
        {/* {itens.map((t) => ( */}
        {tarefas.map((t) => (
          <li key={t.titulo}>
            <Tarefa
              id={t.id}
              descricao={t.descricao}
              titulo={t.titulo}
              status={t.status}
              prioridade={t.prioridade}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default ListaDeTarefas
