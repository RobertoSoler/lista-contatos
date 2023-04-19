import Contato from '../../components/Contato'
import { MainContainer, Nome } from '../../styles'

import { useSelector } from 'react-redux/es/exports'
import { RootReducer } from '../../store'

const ListaDeContatos = () => {
  const { itens } = useSelector((state: RootReducer) => state.contatos)
  const { termo, criterio, valor } = useSelector(
    (state: RootReducer) => state.filtro
  )

  const filtraContatos = () => {
    let contatosFiltrados = itens
    // como o termo é um item opcional, tem que colocar esse if pra ver se o termo existe
    if (termo !== undefined) {
      contatosFiltrados = contatosFiltrados.filter(
        (item) => item.nome.toLowerCase().search(termo.toLowerCase()) >= 0
      )

      if (criterio === 'categoria') {
        contatosFiltrados = contatosFiltrados.filter(
          (item) => item.categoria === valor
        )
      }

      return contatosFiltrados
    } else {
      return itens
    }
  }
  // --------------
  const contatos = filtraContatos()
  return (
    <MainContainer>
      <Nome as="p">Lista de Contatos</Nome>
      <ul>
        {contatos
          .sort((a, b) => a.nome.localeCompare(b.nome))
          .map((t) => (
            <li key={t.nome}>
              <Contato
                id={t.id}
                email={t.email}
                telefone={t.telefone}
                nome={t.nome}
                // status={t.status}
                categoria={t.categoria}
              />
            </li>
          ))}
      </ul>
    </MainContainer>
  )
}

export default ListaDeContatos
