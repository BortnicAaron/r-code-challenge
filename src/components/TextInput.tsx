import { FormControl, Input, InputLabel } from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText'
import { useId } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

const validateUrl: (urlString: string) => boolean = (urlString: string) => {
    try {
        const url = new URL(urlString)
        return !(url.protocol !== 'http:' && url.protocol !== 'https:')
    } catch (_) {
        return false
    }
}
interface ITextInput<N extends string, T extends FieldValues> {
    name: N
    label: string
    control: Control<T>
    required?: boolean
    validUrl?: boolean
    errorMessages?: {
        required?: string
        validUrl?: string
    }
    disabled?: boolean
    placeholder?: string
    ariaDescribedby?: string
}



const ERROR_MESSAGES_DEFAULT = {
    required: 'Campo requerido',
    validUrl: 'URL no válida'
}


function TextInput<N extends Path<T>, T extends FieldValues>({
    name,
    control,
    label,
    disabled = false,
    placeholder = '',
    ariaDescribedby,
    required,
    validUrl,
    errorMessages,
}: ITextInput<N, T>) {
    const ID = useId()

    const errorMessagesR = {
        ...ERROR_MESSAGES_DEFAULT,
        ...errorMessages
    }

    const controller = useController<T>({
        name,
        control,
        disabled,
        rules: {
            required: required && errorMessagesR?.required,
            validate: (v) => {
                if (validUrl && !validateUrl(v)) return errorMessagesR.validUrl
                return true
            },
        },
    })
    return <FormControl variant="standard" fullWidth>
        <InputLabel htmlFor={ID} shrink>{label}</InputLabel>
        <Input
            id={ID}
            aria-describedby={ariaDescribedby}
            value={controller.field.value}
            disabled={controller.field.disabled}
            name={controller.field.name}
            onChange={controller.field.onChange}
            onBlur={controller.field.onBlur}
            inputRef={controller.field.ref}
            placeholder={placeholder}
        />
        {controller.fieldState.error && <FormHelperText id={ID} error > {controller.fieldState.error.message}</FormHelperText>}
    </FormControl>
}



export { TextInput }
