import { useDispatch, useSelector } from 'react-redux'
import * as S from './styles'
import { alterarFiltro } from '../../store/reducers/filtro'
import * as enums from '../../utils/enums/Tarefa'
import { RootReducer } from '../../store'
// Pra importar todos !

// Aquisão criadas as propriedades...
//
// o ? indica que é um parametro opcional...

export type Props = {
  //ativo?: boolean
  //contador: number
  legenda: string
  criterio: 'prioridade' | 'status' | 'todas'
  valor?: enums.Prioridade | enums.Status
}

//
// Essa props passa parametros lá para o styles...
// Quando não tem props a serem passadas fica assim:
// const FiltroCard = () => (
//

const FiltroCard = ({ legenda, criterio, valor }: Props) => {
  // o dispatch é pra fazer a atualização do estado do componente...
  const dispatch = useDispatch()
  // precisa pegar o filtro:
  const { filtro, tarefas } = useSelector((state: RootReducer) => state)

  const verificaEstaAtivo = () => {
    //forma reduzida de ver se é verdadeiro e criar uma variavel
    const mesmoCriterio = filtro.criterio === criterio
    const mesmoValor = filtro.valor === valor

    return mesmoCriterio && mesmoValor
  }

  const contarTarefas = () => {
    if (criterio === 'todas') return tarefas.itens.length
    if (criterio === 'prioridade') {
      return tarefas.itens.filter((item) => item.prioridade === valor).length
    }
    if (criterio === 'status') {
      return tarefas.itens.filter((item) => item.status === valor).length
    }
  }

  const filtrar = () => {
    dispatch(
      alterarFiltro({
        criterio,
        valor
      })
    )
  }

  const contador = contarTarefas()
  const ativo = verificaEstaAtivo()

  //
  // Tem que passar os parametros, as props...
  // Quando não tem props a serem passadas fica assim:
  // <S.Card>
  //
  return (
    <S.Card ativo={ativo} onClick={filtrar}>
      <S.Contador>{contador}</S.Contador>
      <S.Label>{legenda}</S.Label>
    </S.Card>
  )
}

export default FiltroCard
