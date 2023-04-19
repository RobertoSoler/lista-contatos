import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { BotaoSalvar, MainContainer, Nome } from '../../styles'
import { Campo } from '../../styles'
import { Form, Opcoes, Opcao } from './styles'
import * as enums from '../../utils/enums/Contato'
import { cadastrar } from '../../store/reducers/contatos'

const Formulario = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [categoria, SetCategoria] = useState(enums.Categoria.PESSOAL)

  const cadastrarContato = (evento: FormEvent) => {
    evento.preventDefault()

    dispatch(
      cadastrar({
        nome,
        categoria,
        email,
        telefone
      })
    )
    navigate('/')
  }

  return (
    <MainContainer>
      <Nome>Novo Contato</Nome>
      <Form onSubmit={cadastrarContato}>
        <Campo
          value={nome}
          onChange={(evento) => setNome(evento.target.value)}
          type="text"
          placeholder="Nome"
        />
        <Campo
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
          type="text"
          placeholder="email"
        />
        <Campo
          value={telefone}
          onChange={(evento) => setTelefone(evento.target.value)}
          type="text"
          placeholder="telefone"
        />
        <Opcoes>
          <p>Categoria</p>
          {Object.values(enums.Categoria).map((categoria) => (
            <Opcao key={categoria}>
              <input
                value={categoria}
                name="categoria"
                type="radio"
                onChange={(evento) =>
                  SetCategoria(evento.target.value as enums.Categoria)
                }
              />
              <label htmlFor={categoria}>{categoria}</label>
            </Opcao>
          ))}
        </Opcoes>
        <BotaoSalvar type="submit">Cadastrar</BotaoSalvar>
      </Form>
    </MainContainer>
  )
}

export default Formulario
