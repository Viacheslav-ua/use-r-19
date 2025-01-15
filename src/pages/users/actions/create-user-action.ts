import { startTransition } from "react";
import { createUser, User } from "../../../shared/api/apiUsers";

type CreateActionsState = {
  error?: string
  email?: string
};

export type CreateUserAction = (
  state: CreateActionsState, 
  formData: FormData
) => Promise<CreateActionsState>

type CreateUserActionParams = {
  refetchUsers: () => void
  optimisticCreate: (user: User) => void
}

export const createUserAction =
  ({ refetchUsers, optimisticCreate }: CreateUserActionParams): CreateUserAction =>
  async (_, formData: FormData) => {

    const email = String(formData.get('email'))

    if (email === 'admin@gmail.com') {
      return {
        error: 'Admin account is not allowed',
        email,
      }
    }

    try {
      const user = {
        id: crypto.randomUUID(),
        email,
      }
      optimisticCreate(user)

      await createUser({
        id: crypto.randomUUID(),
        email,
      });
      startTransition(() => {
        refetchUsers()
      })

      return {
        email: '',
      }

    } catch {

      return { 
        error: 'Error while creating user',
        email,
      }
    }
  };
