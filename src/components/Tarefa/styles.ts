import styled from 'styled-components'
import variaveis from '../../styles/variaveis'

import * as enums from '../../utils/enums/Tarefa'
import { Botao } from '../../styles'

// ********************************************************
//                      SEM OS ENUMS
// ********************************************************
//
// Criando uma tipagem para usar na Tag
//
// type TagProps = {
//   prioridade?: string
//   status?: string
// }
//
// Criando uma função para usar na Tag
//
// function retornaCorDeFundo(props: TagProps): string {
//   //
//   // primeiro verifica se passou o status,
//   // depois qual o status
//   //
//   if ('status' in props) {
//     if (props.status === 'pendente') return variaveis.amarelo
//     if (props.status === 'concluída') return variaveis.verde
//   } else if ('prioridade' in props) {
//     if (props.prioridade === 'urgente') return variaveis.vermelho
//     if (props.prioridade === 'importante') return variaveis.amarelo2
//   }
//   return '#ccc'
// }

type TagProps = {
  prioridade?: enums.Prioridade
  status?: enums.Status
  parametro: 'status' | 'prioridade'
}

function retornaCorDeFundo(props: TagProps): string {
  if (props.parametro === 'prioridade') {
    if (props.prioridade === enums.Prioridade.URGENTE) return variaveis.vermelho
    if (props.prioridade === enums.Prioridade.IMPORTANTE)
      return variaveis.amarelo2
  } else {
    if (props.status === enums.Status.PENDENTE) return variaveis.amarelo
    if (props.status === enums.Status.CONCLUIDA) return variaveis.verde
  }
  return '#ccc'
}

export const Card = styled.div`
  background-color: #fcfcfc;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 16px;
  margin-bottom: 32px;
  border-radius: 16px;

  label {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
`

export const Titulo = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-left: 8px;
`
// Se não tivesse parametros a passar ficaria assim:
// export const Tag = styled.span<TagProps>`
//   padding: 4px 8px;
//   color: #fff;
//   font-weight: bold;
//   font-size: 10px;
//   background-color: #e1a32a;
//   border-radius: 8px;
//   margin-right: 16px;
//   display: inline-block;
// `
//
export const Tag = styled.span<TagProps>`
  padding: 4px 8px;
  color: #fff;
  font-weight: bold;
  font-size: 10px;
  background-color: ${(props) => retornaCorDeFundo(props)};
  border-radius: 8px;
  margin-right: 16px;
  display: inline-block;
`

export const Descricao = styled.textarea`
  color: #8b8b8b;
  font-size: 14px;
  line-height: 24px;
  font-family: 'Roboto Mono', monospace;
  display: block;
  width: 100%;
  margin-bottom: 16px;
  margin-top: 16px;
  resize: none;
  border: none;
  background-color: transparent;
`

export const BarraAcoes = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 16px;
`

//
// Está criando uma função que altera o Botao original
//
// export const BotaoSalvar = styled(Botao)`
//   background-color: ${variaveis.verde};
// `

export const BotaoCancelarRemover = styled(Botao)`
  background-color: ${variaveis.vermelho};
`
