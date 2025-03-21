import { QueryClient } from "@tanstack/react-query"
import { createBrowserRouter } from "react-router-dom"
import { queries } from "./controllers/queries"
import { CharacterPage } from "./features/CharacterPage"
import { HomePage } from "./features/HomePage"



export const queryClient = new QueryClient()


export const loader =
  (queryClient: QueryClient) =>
    async () => {
      const query = queries.getPaginatedCharacters(1)

      return (
        queryClient.getQueryData(query) || null
      )
    }


export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: (
          <HomePage />
        ),
        loader: loader(queryClient),
      },
      {
        path: ':id',
        element: (
          <CharacterPage />
        )
      }
    ]
  }
])
