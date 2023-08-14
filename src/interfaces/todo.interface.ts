export interface ToDoItemType {
  id: number;
  content: string;
  completed: boolean;
}

export type EmitCompleteTaskType = Pick<ToDoItemType, "id" | "completed">;
export type EmitContentTaskType = Pick<ToDoItemType, "id" | "content">;
