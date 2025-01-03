import { deleteUser } from "../../../shared/api";

type DeleteUserActionState = {
  error?: string;
};

export const deleteUserAction = 
({ refetchUsers, id }: { refetchUsers: () => void, id: string }) =>
  async (): Promise<DeleteUserActionState> => {

    try {
      await deleteUser(id)
      refetchUsers()

      return {}
    } catch {
      return {
        error: 'Error while deleting user'
      }
    }
}