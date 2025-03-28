import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import { Box } from '@mui/material'
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
    placeholder = 'Buscar',
    inputAriaLabel,
    buttonAriaLabel
}: ISearchInput<N, T>) {
    const controller = useController<T>({
        name,
        control,
        disabled,
    })

    return <Box display={'flex'} flexDirection={'column'} mx={'1.5rem'} width={'100%'} maxWidth={'20rem'}>
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
                type="button"
                sx={{ p: '4px' }}
                onClick={() => controller.field.onChange('')}
                disabled={controller.field.value === '' || disabled}
            >
                <CloseIcon />
            </IconButton>
            <IconButton
                type="submit"
                sx={{ p: '8px' }}
                aria-label={buttonAriaLabel}
                onSubmit={(event) => event.preventDefault()}
                disabled={disabled}
            >
                <SearchIcon />
            </IconButton>
        </Paper>
        {controller.fieldState.error && <FormHelperText error > {controller.fieldState.error.message}</FormHelperText>}
    </Box>
}



export { SearchInput }
