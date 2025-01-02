export type User = {
  id: string;
  email: string;
};

export const fetchUsers = () => {
  return fetch('http://localhost:3008/users')
    .then(res => res.json() as Promise<User[]>)
}

export const createUser = (user: User) => {
  // throw new Error('Not created')
  return fetch('http://localhost:3008/users', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
}

export const deleteUser = (id: string) => {
  return fetch(`http://localhost:3008/users/${id}`, {
    method: 'DELETE',
  })
    .then(res => res.json())
}