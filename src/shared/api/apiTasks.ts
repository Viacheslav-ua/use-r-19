export type Task = {
  id: string;
  userId: string;
  title: string;
  done: boolean;
  createdAt: number;
};

interface FetchTasksParams {
  page?: number;
  per_page?: number;
  filter?: {
    userId?: string;
  }
  sort?: {
    createdAt?: 'asc' | 'desc';
  }
}

type PaginatedResponse<T> = {
  data: T[],
  first: number,
  prev: number | null,
  next: number | null,
  last: number,
  pages: number,
  items: number,
  
}

export const fetchTasks = ({
  page = 1, 
  per_page = 10, 
  filter, 
  sort = { createdAt: 'asc' },
}: FetchTasksParams) => {
  return fetch(`http://localhost:3008/tasks?_page=${page}&_per_page=${per_page}
    &_sort=${sort.createdAt==='asc' ? 'createdAt' : '-createdAt'}&userId=${filter?.userId}`)
  
    .then(res => res.json() as Promise<PaginatedResponse<Task>>);
}

export const createTask = (task: Task) => {
  return fetch('http://localhost:3008/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then(res => res.json())
}

export const deleteTask = (id: string) => {
  return fetch(`http://localhost:3008/tasks/${id}`, {
    method: 'DELETE',
  })
    .then(res => res.json())
}