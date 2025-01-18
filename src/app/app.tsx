import { Route, Routes } from "react-router-dom";
import { UsersPage } from "../pages/users";
import { TodoPage } from "../pages/todo-list";
import { UsersProvider } from "../entities/users";

export default function App() {
  return (
    <UsersProvider>
      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/:userId/tasks" element={<TodoPage />} />
      </Routes>
    </UsersProvider>
  )
}