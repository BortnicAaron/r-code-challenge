import { Container } from "@mui/material"
import { useParams } from "react-router-dom"
import { useCharacter } from "../../controllers/useCharacter"
import { CharacterForm } from "./CharacterForm"


function CharacterEditPage() {
  let { id } = useParams()
  const character = useCharacter(id)

  return (
    <Container maxWidth="lg" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '3rem', padding: '3rem' }}>
      <CharacterForm {...character.data?.data} />
    </Container>
  )
}

export { CharacterEditPage }
