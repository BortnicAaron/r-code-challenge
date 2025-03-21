import PaginationMUI from "@mui/material/Pagination"


function Pagination({ count, page, disabled, onPageChange }: { count?: number, page: number, disabled?: boolean, onPageChange?: (n: number) => void }) {
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        onPageChange && onPageChange(value)
    }
    return (
        <PaginationMUI
            page={page}
            count={count}
            disabled={disabled}
            onChange={handleChange}
            size='small'
        />
    )
}

export { Pagination }

