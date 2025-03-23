import { ArrowBack, Save } from "@mui/icons-material"
import { Box, Button, Card, CardContent, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Autocomplete, Option } from "../../components/Autocomplete"
import { Select } from "../../components/Select"
import { TextInput } from "../../components/TextInput"
import { useUptadeCharacter } from "../../controllers/useUptadeCharacter"
import { Character, Status } from "../../interfaces/Character"
import { LOCATIONS } from "./Locations"


const locationOptions: Option[] = LOCATIONS.map(({ url, name }) => ({ id: url, label: name }))

interface FieldValues {
    image: string
    name: string
    species: string
    status: Status
    type: string
    location: Option
}


const CharacterForm = (character: Partial<Character>) => {
    const navigate = useNavigate()
    const isFormDisabled = Boolean(!character || character.deletedAt)

    const form = useForm<FieldValues>({
        values: {
            image: character.image || '',
            name: character.name || '',
            species: character.species || '',
            status: character.status || 'unknown',
            type: character.type || '',
            location: character.location ? {
                id: character.location?.url,
                label: character.location?.name
            } : {
                id: '',
                label: ''
            }
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
                locationName: fieldValues.location.label,
                locationUrl: String(fieldValues.location.id),
                image: fieldValues.image
            })
            navigate(`/${character.id}`, { replace: true })
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
                    label="Imagen:"
                    name="image"
                    required
                    validUrl
                    errorMessages={{
                        required: 'Campo requerido',
                        validUrl: 'URL no válida'
                    }}
                />
                <Autocomplete
                    control={form.control}
                    label="Última ubicación:"
                    name="location"
                    options={locationOptions}
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
                        onClick={() => navigate(`/${character.id}`, { replace: true })}
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
