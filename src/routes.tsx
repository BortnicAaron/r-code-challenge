import { QueryClient } from "@tanstack/react-query"
import { createBrowserRouter } from "react-router-dom"
import { CharacterEditPage } from "./features/CharacterEditPage"
import { CharacterPage } from "./features/CharacterPage"
import { HomePage } from "./features/HomePage"
import { RootPage } from "./features/RootPage"


export const queryClient = new QueryClient()


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
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
