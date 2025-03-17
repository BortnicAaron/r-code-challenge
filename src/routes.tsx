import { createBrowserRouter } from "react-router-dom"
import App from "./pages/App"
import CharacterType from "./pages/Character"

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: (
          <App />
        )
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
