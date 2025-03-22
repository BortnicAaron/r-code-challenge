import { QueryClient } from "@tanstack/react-query"
import { createBrowserRouter } from "react-router-dom"
import { CharacterEditPage } from "./features/CharacterEditPage"
import { CharacterPage } from "./features/CharacterPage"
import { HomePage } from "./features/HomePage"


export const queryClient = new QueryClient()


export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: (
          <HomePage />
        ),
      },
      {
        path: ':id',
        element: (
          <CharacterPage />
        ),
      },
      {
        path: ":id/edit",
        element: (
          <CharacterEditPage />
        ),
      }
    ]
  }
])
