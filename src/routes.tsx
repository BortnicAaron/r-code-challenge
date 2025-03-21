import { QueryClient } from "@tanstack/react-query"
import { createBrowserRouter } from "react-router-dom"
import { queries } from "./controllers/queries"
import App from "./pages/App"
import CharacterType from "./pages/Character"



export const queryClient = new QueryClient()


// ⬇️ needs access to queryClient
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
    loader: loader(queryClient),

    children: [
      {
        path: "",
        element: (
          <App />
        ),
        loader: loader(queryClient),
      },
      {
        path: ':id',
        element: (
          <CharacterType />
        )
      }
    ]
  }
])
