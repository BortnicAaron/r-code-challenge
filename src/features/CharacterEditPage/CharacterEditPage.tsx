import { Container } from "@mui/material"
import { useParams } from "react-router-dom"
import { useCharacter } from "../../controllers/useCharacter"
import { CharacterForm } from "./CharacterForm"


function CharacterEditPage() {
  let { id } = useParams()
  const character = useCharacter(id ? Number(id) : undefined)

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '3rem', px: '1rem' }}>
      <CharacterForm {...character.data} />
    </Container>
  )
}

export { CharacterEditPage }
