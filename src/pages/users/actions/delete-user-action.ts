import { deleteUser } from "../../../shared/api/apiUsers";

type DeleteUserActionState = {
  error?: string;
};

export type DeleteUserAction = (
  state: DeleteUserActionState, 
  formData: FormData
) => Promise<DeleteUserActionState>

interface DeleteUserActionParams {
  refetchUsers: () => void;
  optimisticDelete: (id: string) => void
}

export const deleteUserAction = ({ refetchUsers, optimisticDelete }: DeleteUserActionParams): DeleteUserAction =>
  async (_, formData): Promise<DeleteUserActionState> => {
    const id = String(formData.get('id'))
    optimisticDelete(id)
    try {
      await deleteUser(String(id))
      refetchUsers()

      return {}
    } catch {
      return {
        error: 'Error while deleting user'
      }
    }
}