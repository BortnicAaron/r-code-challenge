import { ArrowBack } from "@mui/icons-material"
import AddCommentIcon from '@mui/icons-material/AddComment'

import { Box, Button, Card, CardContent, Divider, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { TextInput } from "../../components/TextInput"
import { useCreateComment } from "../../controllers/useCreateComment"
import { Character } from "../../interfaces/Character"



interface FieldValues {
    message: string,

}

interface ICharacterCommentForm {
    character: Character
    handleClose: () => void
}

const CharacterCommentForm = ({ character, handleClose }: ICharacterCommentForm) => {

    const form = useForm<FieldValues>({
        values: {
            message: ''
        }
    })
    const createComment = useCreateComment(character.id)

    const onChange = async (fieldValues: FieldValues) => {
        try {
            await createComment.mutateAsync(fieldValues.message)
        } catch (error) {

        }
        handleClose()
    }



    return <Card sx={{ maxWidth: '24rem', width: '100%' }} >
        <CardContent >
            <Box onSubmit={form.handleSubmit(onChange)} component={'form'} sx={{ display: "flex", flexDirection: "column", gap: '1.5rem', alignItems: 'stretch' }} >
                <Typography variant="h5" component={'h1'}>
                    Crear comentario
                </Typography>
                <Divider variant="fullWidth" component="div" />
                <TextInput
                    control={form.control}
                    label="Comentario:"
                    name="message"
                    required
                    multiline
                    minRows={5}
                    maxRows={10}
                    maxLength={400}
                    placeholder="Escribe un comentario sobre este personaje..."
                    errorMessages={{
                        required: 'Campo requerido.',
                        maxLength: `Máximo ${400} caracteres permitidos.`
                    }}
                />
                <Box display="flex" width={'100%'} flexDirection="row" justifyContent={'space-between'} marginTop={'1rem'}>
                    <Button
                        startIcon={<ArrowBack />}
                        variant="outlined"
                        loading={form.formState.isSubmitting}
                        onClick={handleClose}
                    >Volver</Button>
                    <Button
                        type='submit'
                        startIcon={<AddCommentIcon />}
                        variant="outlined"
                        loading={form.formState.isSubmitting}
                    >Crear</Button>
                </Box>
            </Box>
        </CardContent>
    </Card>
}


export { CharacterCommentForm }
