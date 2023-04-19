import styled from 'styled-components'
import variaveis from '../../styles/variaveis'

import * as enums from '../../utils/enums/Contato'
import { Botao } from '../../styles'

type TagProps = {
  categoria?: enums.Categoria
  parametro: 'categoria'
}

function retornaCorDeFundo(props: TagProps): string {
  if (props.parametro === 'categoria') {
    if (props.categoria === enums.Categoria.PESSOAL) return variaveis.amarelo
    if (props.categoria === enums.Categoria.PROFISSIONAL)
      return variaveis.amarelo2
  }
  return '#ccc'
}

export const Card = styled.div`
  background-color: #fcfcfc;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 16px;
  margin-bottom: 32px;

  label {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
`

export const Nome = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-left: 8px;
`

export const Tag = styled.span<TagProps>`
  padding: 4px 8px;
  color: #fff;
  font-weight: bold;
  font-size: 10px;
  background-color: ${(props) => retornaCorDeFundo(props)};
  margin-right: 16px;
  display: inline-block;
`

export const Email = styled.input`
  color: #2c3e50;
  font-size: 14px;
  line-height: 24px;
  font-family: 'Roboto Mono', monospace;
  display: block;
  width: 100%;
  margin-bottom: 16px;
  margin-top: 16px;
  resize: none;
  border: none;
  background-color: '#ecf0f1';
`

export const Telefone = styled.input`
  color: #2c3e50;
  font-size: 14px;
  line-height: 24px;
  font-family: 'Roboto Mono', monospace;
  display: block;
  width: 100%;
  margin-bottom: 16px;
  margin-top: 16px;

  resize: none;
  border: none;
  background-color: '#ecf0f1';
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
