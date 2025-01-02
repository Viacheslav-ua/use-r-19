import { startTransition } from "react";
import { createUser } from "../../shared/api";

type CreateActionsState = {
  error?: string;
};

export const createUserAction =
  ({ refetchUsers }: { refetchUsers: () => void }) =>
  async (
    prevState: CreateActionsState,
    formData: FormData,
  ): Promise<CreateActionsState> => {

    const email = String(formData.get('email'))

    try {
      await createUser({
        id: crypto.randomUUID(),
        email,
      });
      startTransition(() => {
        refetchUsers()
      })

      return {}

    } catch {

      return { 
        error: 'Error while creating user'
      }
    }
  };
