import SearchIcon from '@mui/icons-material/Search'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from "@mui/material/IconButton"
import InputBase from "@mui/material/InputBase"
import Paper from "@mui/material/Paper"
import { Control, FieldValues, Path, useController } from 'react-hook-form'

interface ISearchInput<N extends string, T extends FieldValues> {
    name: N
    label: string
    control: Control<T>
    required?: boolean
    disabled?: boolean
    placeholder?: string
    inputAriaLabel?: string
    buttonAriaLabel?: string
}


function SearchInput<N extends Path<T>, T extends FieldValues>({
    name,
    control,
    disabled = false,
    placeholder = 'Search',
    inputAriaLabel,
    buttonAriaLabel
}: ISearchInput<N, T>) {

    const controller = useController<T>({
        name,
        control,
        disabled,
    })

    return <div style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <Paper
            component="div"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
            style={{ boxSizing: 'border-box' }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={placeholder}
                inputProps={{ 'aria-label': inputAriaLabel }}
                value={controller.field.value}
                disabled={controller.field.disabled}
                name={controller.field.name}
                onChange={controller.field.onChange}
                onBlur={controller.field.onBlur}
                inputRef={controller.field.ref}
            />
            <IconButton
                type="submit"
                sx={{ p: '10px' }}
                aria-label={buttonAriaLabel}
                onSubmit={(event) => event.preventDefault()}
                disabled={disabled}
            >
                <SearchIcon />
            </IconButton>

        </Paper>
        {controller.fieldState.error && <FormHelperText error > {controller.fieldState.error.message}</FormHelperText>}
    </div>
}



export { SearchInput }
