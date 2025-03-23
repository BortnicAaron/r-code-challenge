import { FormControl, InputLabel, MenuItem, Select as SelectMUI } from '@mui/material'
import { useId } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

interface ISelect<N extends string, T extends FieldValues> {
    name: N
    label: string
    control: Control<T>
    required?: boolean
    disabled?: boolean
    items: {
        value: string | number,
        text: string
    }[]
}

function Select<N extends Path<T>, T extends FieldValues>({
    name,
    control,
    label,
    disabled = false,
    items
}: ISelect<N, T>) {
    const LABEL_ID = useId()
    const ID = useId()
    const controller = useController<T>({
        name,
        control,
        disabled,
    })

    return <FormControl variant="standard" fullWidth>
        <InputLabel variant="standard" id={LABEL_ID} shrink>
            {label}
        </InputLabel>
        <SelectMUI
            value={controller.field.value}
            disabled={controller.field.disabled}
            name={controller.field.name}
            onChange={(event) => {
                controller.field.onChange(event.target.value)
            }}
            onBlur={controller.field.onBlur}
            inputRef={controller.field.ref}
            id={ID}
            labelId={LABEL_ID}
        >
            {items.map(({ value, text }) => <MenuItem key={value} value={value}>{text}</MenuItem>)}
        </SelectMUI>
    </FormControl>
}


export { Select }

