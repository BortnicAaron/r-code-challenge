
function Pagination({ page, setPage }: { page: number, setPage: (page: number) => void }) {
    return (
        <div>
            <p>Page: {page}</p>
            {page > 1 && <button onClick={() => setPage(page - 1)} >
                anterior
            </button>}
            <button onClick={() => setPage(page + 1)} >
                siguiente
            </button>
        </div>
    )
}

export { Pagination }
