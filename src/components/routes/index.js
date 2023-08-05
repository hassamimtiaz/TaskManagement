import { createBrowserRouter } from "react-router-dom";
import { ListTasks } from "./../pages/list-tasks";
import CreateTask from "./../pages/create-task";
import BulkDelete from "./../pages/bulk-delete";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <ListTasks />,
  },
  {
    path: "/list-tasks",
    element: <ListTasks />,
  },
  {
    path: "create-task",
    element: <CreateTask />,
  },
  {
    path: "bulk-delete",
    element: <BulkDelete />,
  },
]);

export default AppRoutes;