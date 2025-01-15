import { deleteTask } from "../../../shared/api/apiTasks";

type DeleteTaskActionState = {
  error?: string;
};

interface DeleteTaskActionParams {
  refetchTasks: () => void
}

export type DeleteTaskAction = (
  state: DeleteTaskActionState,
  formData: FormData
) => Promise<DeleteTaskActionState>

export const deleteTaskAction = ({ refetchTasks }: DeleteTaskActionParams): DeleteTaskAction => 
async (_, formData): Promise<DeleteTaskActionState> => {
    const id = String(formData.get('id'))
    
    try {
      await deleteTask(String(id))
      refetchTasks()

      return {}
    } catch {
      return {
        error: 'Error while deleting user'
      }
    }
}