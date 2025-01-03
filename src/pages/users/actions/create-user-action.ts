import { startTransition } from "react";
import { createUser } from "../../../shared/api";

type CreateActionsState = {
  error?: string
  email?: string
};

export const createUserAction =
  ({ refetchUsers }: { refetchUsers: () => void }) =>
  async (
    _: CreateActionsState,
    formData: FormData,
  ): Promise<CreateActionsState> => {

    const email = String(formData.get('email'))

    if (email === 'admin@gmail.com') {
      return {
        error: 'Admin account is not allowed',
        email,
      }
    }

    try {
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
