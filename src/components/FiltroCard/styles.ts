import styled from 'styled-components'

// Tem que criar um outro tipo para omitir os parametros que não são usados aqui no styles...

type Props = {
  ativo?: boolean
}

// Se não tivesse props, usaria:
// export const Card = styled.div`
//
// Se não fosse omitir, usaria:
// export const Card = styled.div<Props>`
//
export const Card = styled.div<Props>`
  padding: 8px;
  //
  // A cor deve variar... cria-se então essa props
  // Essa props tem que cria lá no arquivo index.tsx
  // lá cria essa propriedade 'ativo'
  //
  border: 1px solid ${(props) => (props.ativo ? '#1E90FF' : '#a1a1a1')};
  background-color: ${(props) => (props.ativo ? '#fff' : '#fcfcfc')};
  color: ${(props) => (props.ativo ? '#1E90FF' : '#5e5e5e')};
  border-radius: 8px;
  cursor: pointer;
`

export const Contador = styled.span`
  font-weight: bold;
  font-size: 24px;
  display: block;
`

export const Label = styled.span`
  font-size: 14px;
`
