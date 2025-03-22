import { FormControl, Input, InputLabel } from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText'
import { useId } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

interface ITextInput<N extends string, T extends FieldValues> {
    name: N
    label: string
    control: Control<T>
    required?: boolean
    errorMessages?: {
        required?: string
    }
    disabled?: boolean
    placeholder?: string
    ariaDescribedby?: string
}


function TextInput<N extends Path<T>, T extends FieldValues>({
    name,
    control,
    label,
    disabled = false,
    placeholder = '',
    ariaDescribedby,
    required,
    errorMessages
}: ITextInput<N, T>) {
    const ID = useId()
    const controller = useController<T>({
        name,
        control,
        disabled,
        rules: {
            required: required && errorMessages?.required
        }
    })
    console.log(controller.fieldState.error)
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
