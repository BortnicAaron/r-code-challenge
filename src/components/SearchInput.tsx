

interface ISearchInput {
    setValue: (v: string) => void
}

const SearchInput = ({ setValue }: ISearchInput) => {

    const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const value = formData.get('value') as string
        setValue(value)
    }

    return <form onSubmit={handlerSubmit}>
        <input
            type="text"
            name="value"
        />
        <button
            type="submit"
        >Buscar</button>
    </form>
}



export { SearchInput }
