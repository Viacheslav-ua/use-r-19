import { startTransition } from "react";
import { createUser } from "../../shared/api";

type CreateActionsState = {
  error?: string;
};

export const createUserAction =
  ({
    refetchUsers,
    setEmail,
  }: {
    refetchUsers: () => void;
    setEmail: (email: string) => void;
  }) =>
  async (
    prevState: CreateActionsState,
    formData: { email: string }
  ): Promise<CreateActionsState> => {
    try {
      await createUser({
        id: crypto.randomUUID(),
        email: formData.email,
      });
      startTransition(() => {
        refetchUsers()
        setEmail("")
      })

      return {}

    } catch {

      return { 
        error: 'Error while creating user'
      }
    }
  };
