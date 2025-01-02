import { Route, Routes } from "react-router-dom";
import { UsersPage } from "../pages/users";
import { TodoPage } from "../pages/todo-list";

export default function App() {
  return <Routes>
    <Route path="/" element={<UsersPage />} />
    <Route path="/:userId/tasks" element={<TodoPage />} />
  </Routes>
}