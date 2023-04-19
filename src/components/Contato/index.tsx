import { useEffect, useState } from 'react'
import * as S from './styles'
import { useDispatch } from 'react-redux'

import ContatoClass from '../../models/Contato'
type Props = ContatoClass

// importar a contato remover...
import { remover, editar } from '../../store/reducers/contatos'
import { Botao, BotaoSalvar } from '../../styles'

const Contato = ({
  email: emailOriginal,
  telefone: telefoneOriginal,
  categoria,
  nome,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  // ---------------------
  const [email, setEmail] = useState('')
  useEffect(() => {
    if (emailOriginal.length > 0) {
      setEmail(emailOriginal)
    }
  }, [emailOriginal])

  const [telefone, setTelefone] = useState('')
  useEffect(() => {
    if (telefoneOriginal.length > 0) {
      setTelefone(telefoneOriginal)
    }
  }, [telefoneOriginal])

  function cancelarEdicao() {
    setEstaEditando(false)
    setEmail(emailOriginal)
    setTelefone(telefoneOriginal)
  }
  return (
    <S.Card>
      <label htmlFor={nome}>
        <S.Nome>
          {estaEditando ? <em>Editando: </em> : ''}
          {nome}
        </S.Nome>
      </label>
      <S.Tag parametro="categoria" categoria={categoria}>
        {categoria}
      </S.Tag>
      <S.Email
        disabled={!estaEditando}
        value={email}
        onChange={(evento) => setEmail(evento.target.value)}
      />
      <S.Telefone
        disabled={!estaEditando}
        value={telefone}
        onChange={(evento) => setTelefone(evento.target.value)}
      />
      <S.BarraAcoes>
        {estaEditando ? (
          <>
            <BotaoSalvar
              onClick={() => {
                dispatch(
                  editar({
                    email,
                    telefone,
                    categoria,
                    // status,
                    nome,
                    id
                  })
                )
                setEstaEditando(false)
              }}
            >
              Salvar
            </BotaoSalvar>
            <S.BotaoCancelarRemover onClick={cancelarEdicao}>
              Cancelar
            </S.BotaoCancelarRemover>
          </>
        ) : (
          <>
            <Botao onClick={() => setEstaEditando(true)}>Editar</Botao>
            <S.BotaoCancelarRemover onClick={() => dispatch(remover(id))}>
              Remover
            </S.BotaoCancelarRemover>
          </>
        )}
      </S.BarraAcoes>
    </S.Card>
  )
}

export default Contato
