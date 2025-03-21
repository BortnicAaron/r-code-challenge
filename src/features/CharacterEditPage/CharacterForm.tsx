import { Save } from "@mui/icons-material"
import { Box, Button, Card, CardContent, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { TextInput } from "../../components/TextInput"
import { Character } from "../../interfaces/Character"


interface FieldValues {
    name: string
    species: string
}


const CharacterForm = (character: Partial<Character>) => {
    console.log(character)
    const form = useForm<FieldValues>({
        values: {
            name: character.name || '',
            species: character.species || ''
        }
    })

    return <Card sx={{ maxWidth: '20rem', width: '100%' }} >
        <CardContent >
            <Box component={'form'} display="flex" flexDirection="column" alignItems="start" gap='1rem'>
                <Typography variant="h5" component={'h1'}>
                    Editar personaje
                </Typography>
                <TextInput
                    control={form.control}
                    label="name"
                    name="name"
                />

                <Button
                    type='submit'
                    endIcon={<Save />}
                    variant="outlined"
                >Guardar</Button>
            </Box>
        </CardContent>
    </Card>
}


export { CharacterForm }
