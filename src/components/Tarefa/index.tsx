import { ChangeEvent, useEffect, useState } from 'react'
import * as S from './styles'
import * as enums from '../../utils/enums/Tarefa'
import { useDispatch } from 'react-redux'

//
// Componentização, criando um objeto com as propriedades
//
// ********************************************************
//                      SEM OS ENUMS
// ********************************************************
//
// type Props = {
//   titulo: string
//   prioridade: string
//   status: string
//   descricao: string
// }
// ********************************************************
//                      alteração
// ********************************************************
// type Props = {
//   titulo: string
//   prioridade: enums.Prioridade
//   status: enums.Status
//   descricao: string
// }
import TarefaClass from '../../models/Tarefa'
type Props = TarefaClass
//
// ********************************************************
//                      SEM OS ENUMS
// ********************************************************
//
//
// Agora precisa desestruturar a props...
//
// se não tivesse, seria assim:
// const Tarefa = () => {
//
// const Tarefa = ({ descricao, prioridade, status, titulo }: Props) => {
//   //
//   // fazendo uso do state
//   // estaEditando é uma variavel
//   // essa funcão, setEstaEditando é definida no onClick do botão
//   //
//   const [estaEditando, setEstaEditando] = useState(false)

//   // este return é para fazer uso do state...
//   return (
//     <S.Card>
//       <S.Titulo>{titulo}</S.Titulo>
//       <S.Tag prioridade={prioridade}>{prioridade}</S.Tag>
//       <S.Tag status={status}>{status}</S.Tag>
//       <S.Descricao value={descricao} />
//       <S.BarraAcoes>
//         {estaEditando ? (
//           <>
//             <S.BotaoSalvar>Salvar</S.BotaoSalvar>
//             <S.BotaoCancelarRemover onClick={() => setEstaEditando(false)}>
//               Cancelar
//             </S.BotaoCancelarRemover>
//           </>
//         ) : (
//           <>
//             <S.Botao onClick={() => setEstaEditando(true)}>Editar</S.Botao>
//             <S.BotaoCancelarRemover>Removar</S.BotaoCancelarRemover>
//           </>
//         )}
//       </S.BarraAcoes>
//     </S.Card>
//   )
// }

// importar a tarefa remover...
import { remover, editar, alteraStatus } from '../../store/reducers/tarefas'
import { Botao, BotaoSalvar } from '../../styles'
import { alterarFiltro } from '../../store/reducers/filtro'

const Tarefa = ({
  descricao: descricaoOriginal,
  prioridade,
  status,
  titulo,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  // criando as alterações nas tarefas...
  // veja abaixo...
  // teve que mudar o descricao acima para
  // descricao: descricaoOriginal
  const [descricao, setDescricao] = useState('')
  // ----
  // Agora precisa que o campo descricao seja preenchido com o que esta guardado - valor inicial
  useEffect(() => {
    if (descricaoOriginal.length > 0) {
      setDescricao(descricaoOriginal)
    }
  }, [descricaoOriginal])
  // ----
  function cancelarEdicao() {
    setEstaEditando(false)
    setDescricao(descricaoOriginal)
  }
  // ----
  function alteraStatusTarefa(evento: ChangeEvent<HTMLInputElement>) {
    dispatch(
      alteraStatus({
        id,
        finalizado: evento.target.checked
      })
    )
  }
  // ----
  return (
    <S.Card>
      <label htmlFor={titulo}>
        <input
          type="checkbox"
          id={titulo}
          checked={status === enums.Status.CONCLUIDA}
          onChange={alteraStatusTarefa}
        />
        <S.Titulo>
          {estaEditando ? <em>Editando: </em> : ''}
          {titulo}
        </S.Titulo>
      </label>
      <S.Tag parametro="prioridade" prioridade={prioridade}>
        {prioridade}
      </S.Tag>
      <S.Tag parametro="status" status={status}>
        {status}
      </S.Tag>
      {/* <S.Descricao value={descricao} /> */}
      <S.Descricao
        // desabilitar o campo quando NÃO esta editando
        disabled={!estaEditando}
        // ---
        value={descricao}
        onChange={(evento) => setDescricao(evento.target.value)}
      />
      <S.BarraAcoes>
        {estaEditando ? (
          <>
            <BotaoSalvar
              onClick={() => {
                dispatch(
                  editar({
                    descricao,
                    prioridade,
                    status,
                    titulo,
                    id
                  })
                )
                setEstaEditando(false)
              }}
            >
              Salvar
            </BotaoSalvar>
            {/* <S.BotaoCancelarRemover onClick={() => setEstaEditando(false)}> */}
            {/* alterando para voltar ao estado original, se for cancelado*/}
            <S.BotaoCancelarRemover onClick={cancelarEdicao}>
              Cancelar
            </S.BotaoCancelarRemover>
          </>
        ) : (
          <>
            <Botao onClick={() => setEstaEditando(true)}>Editar</Botao>
            <S.BotaoCancelarRemover onClick={() => dispatch(remover(id))}>
              Removar
            </S.BotaoCancelarRemover>
          </>
        )}
      </S.BarraAcoes>
    </S.Card>
  )
}

export default Tarefa

//
// Se não tivesse que usar o state ficaria só assim:
//
// const Tarefa = () => (
//   <S.Card>
//     <S.Titulo>Nome da Tarefa</S.Titulo>
//     <S.Tag>importante</S.Tag>
//     <S.Tag>pendente</S.Tag>
//     <S.Descricao />
//     <S.BarraAcoes>
//       <S.Botao>Editar</S.Botao>
//       <S.Botao>Removar</S.Botao>
//     </S.BarraAcoes>
//   </S.Card>
// )
