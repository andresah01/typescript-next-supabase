"use client"
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useTabContext } from './context/TabContext'
import BasicTabs from './components/BasicTabs'

export default function Home() {

  const { tabs, handleAddTab } = useTabContext()

  return (
    <section>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link >Home</Nav.Link>
            <Nav.Link onClick={() => handleAddTab("Listar", "ClientList")}>Listar</Nav.Link>
            <Nav.Link onClick={() => handleAddTab("Crear", "FormNewClient")}>Crear</Nav.Link>
            <Nav.Link onClick={() => handleAddTab("Ver mas", "FormClient", { id: "f54ab4a8-7754-480f-b6eb-14f4104d57ea" })}>Ver Mas</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <BasicTabs tabs={tabs} />
    </section>
  )
}
