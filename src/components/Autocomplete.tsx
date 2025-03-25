import { Autocomplete as AutocompleteMUI, FormControl, FormHelperText, InputLabel, TextField } from '@mui/material'
import { useId } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'



export interface Option {
    label: string
    id: number | string
}

interface ITextInput<O extends Option, N extends string, T extends FieldValues> {
    name: N
    label: string
    control: Control<T>
    disabled?: boolean
    placeholder?: string
    ariaDescribedby?: string
    options: O[]
    required?: boolean
    errorMessages?: {
        required?: string
    }
}


function Autocomplete<O extends Option, N extends Path<T>, T extends FieldValues>({
    name,
    control,
    label,
    disabled = false,
    placeholder = '',
    ariaDescribedby,
    options,
    required,
    errorMessages
}: ITextInput<O, N, T>) {
    const ID = useId()

    const controller = useController<T>({
        name,
        control,
        disabled,
        rules: {
            required: required && errorMessages?.required
        }
    })

    return <FormControl variant="standard" fullWidth error={Boolean(controller.fieldState.error)}>
        <InputLabel htmlFor={ID} shrink style={{ position: 'relative' }}>{label}</InputLabel>
        <AutocompleteMUI
            {...controller.field}
            aria-describedby={ariaDescribedby}
            placeholder={placeholder}
            options={options}
            getOptionLabel={(option) => option.label || ""}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            onChange={(_, newValue) => {
                controller.field.onChange(newValue)
            }}
            onBlur={controller.field.onBlur}
            ref={controller.field.ref}
            value={controller.field.value}
            disabled={controller.field.disabled}
            renderInput={(params) => <TextField
                {...params}
                variant="standard"
            />
            }

        />
        {controller.fieldState.error && <FormHelperText id={ID} error > {controller.fieldState.error.message}</FormHelperText>}
    </FormControl>
}



export { Autocomplete }
