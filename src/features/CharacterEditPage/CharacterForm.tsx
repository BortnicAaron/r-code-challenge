import { ArrowBack, Save } from "@mui/icons-material"
import { Box, Button, Card, CardContent, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { Select } from "../../components/Select"
import { TextInput } from "../../components/TextInput"
import { useUptadeCharacter } from "../../controllers/useUptadeCharacter"
import { Character, Status } from "../../interfaces/Character"


interface FieldValues {
    name: string
    species: string
    status: Status
    type: string
    locationName: string
}


const CharacterForm = (character: Partial<Character>) => {
    const navigate = useNavigate()
    const isFormDisabled = Boolean(!character || character.deletedAt)

    const form = useForm<FieldValues>({
        values: {
            name: character.name || '',
            species: character.species || '',
            status: character.status || 'unknown',
            type: character.type || '',
            locationName: character.location?.name || ''
        },
        disabled: isFormDisabled
    })
    const uptadeCharacter = useUptadeCharacter(character.id)

    const onChange = async (fieldValues: FieldValues) => {
        try {
            await uptadeCharacter.mutateAsync({
                name: fieldValues.name,
                species: fieldValues.species,
                status: fieldValues.status,
                type: fieldValues.type,
                locationName: fieldValues.locationName || 'unknown'
            })
            navigate(`/${character.id}`)
        } catch (error) {

        }

    }



    return <Card sx={{ maxWidth: '20rem', width: '100%' }} >
        <CardContent >
            <Box onSubmit={form.handleSubmit(onChange)} component={'form'} display="flex" flexDirection="column" alignItems="start" gap='1rem'>

                <Typography variant="h5" component={'h1'} color={isFormDisabled ? 'textDisabled' : 'primary'}>
                    Editar personaje
                </Typography>
                {Boolean(character.deletedAt) && <Typography variant="subtitle1" component="div" gutterBottom color='error'>
                    El personaje no se puede editar porque esta eliminado.
                </Typography>}
                <TextInput
                    control={form.control}
                    label="Nombre:"
                    name="name"
                    required
                    errorMessages={{
                        required: 'Campo requerido'
                    }}
                />
                <TextInput
                    control={form.control}
                    label="Tipo(Opcional):"
                    name="type"
                    errorMessages={{
                        required: 'Campo requerido'
                    }}
                />
                <TextInput
                    control={form.control}
                    label="Expecie:"
                    name="species"
                    required
                    errorMessages={{
                        required: 'Campo requerido'
                    }}
                />
                <TextInput
                    control={form.control}
                    label="Última ubicación (Opcional):"
                    name="locationName"
                    required
                />
                <Select
                    control={form.control}
                    label="Estado:"
                    name="status"
                    items={[{
                        text: 'Alive',
                        value: 'Alive',
                    }, {
                        text: 'Dead',
                        value: 'Dead'
                    }, {
                        text: 'unknown',
                        value: 'unknown'
                    }]}
                />
                <Box display="flex" width={'100%'} flexDirection="row" justifyContent={'space-between'}>
                    <Button
                        component={Link}
                        to={`/${character.id}`}
                        startIcon={<ArrowBack />}
                        variant="outlined"
                        loading={form.formState.isSubmitting}
                    >Volver</Button>
                    <Button
                        type='submit'
                        endIcon={<Save />}
                        variant="outlined"
                        loading={form.formState.isSubmitting}
                        disabled={isFormDisabled}
                    >Guardar</Button>
                </Box>
            </Box>
        </CardContent>
    </Card>
}


export { CharacterForm }
