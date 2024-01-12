export interface User {
  id?: number;
  name: string;
}

export interface LocalStorageUserData {
  user: User;
  notebooks: Notebook[];
}

export interface Notebook {
  id: number;
  name: string;
  tasks: Task[];
  done: boolean;
}

interface Task {
  description: string;
  done: boolean;
}
