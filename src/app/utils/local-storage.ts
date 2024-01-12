import { LocalStorageUserData, Notebook, User } from "./types";

export function createUserInLocalStorage(userData: User) {
  let localStorageData = getUsersDataInLocalStorage();
  const newUser: LocalStorageUserData = {
    user: { ...userData, id: 1 },
    notebooks: [],
  };

  if (localStorageData && localStorageData.length > 0) {
    localStorageData.push(newUser);
  } else {
    localStorageData = [newUser];
  }

  localStorage.setItem("ramonotesData", JSON.stringify(localStorageData));

  return 1;
}

export function getUsersDataInLocalStorage() {
  const usersData = localStorage.getItem("ramonotesData");

  if (!usersData) {
    return null;
  }
  return JSON.parse(usersData);
}

export const getUserById = (id: string) => {
  const users = getUsersDataInLocalStorage();

  if (!users) {
    return null;
  }

  try {
    return users.find(
      (user: LocalStorageUserData) => user.user.id === parseInt(id)
    );
  } catch {
    return null;
  }
};

export function saveNotebookOnLocalStorage(notebook: Notebook, userId: string) {
  const usersData = getUsersDataInLocalStorage();

  usersData.forEach((userData: LocalStorageUserData) => {
    if (userData.user.id === parseInt(userId)) {
      userData.notebooks.push(notebook);
    }
  });

  localStorage.setItem("ramonotesData", JSON.stringify(usersData));
}

export function updateNotebookOnLocalStorage(
  updatedNotebook: Notebook,
  userId: string,
  notebookId: string
) {
  const usersData = getUsersDataInLocalStorage();

  usersData.forEach((userData: LocalStorageUserData) => {
    if (userData.user.id === parseInt(userId)) {
      userData.notebooks.forEach((notebook, index) => {
        if (notebook.id === parseInt(notebookId)) {
          userData.notebooks.splice(index, 1);
          userData.notebooks.push(updatedNotebook);
        }
      });
    }
  });

  localStorage.setItem("ramonotesData", JSON.stringify(usersData));
}

export const userNotebook = (userId: string, notebookId: string) => {
  const userData = getUserById(userId);

  const notebook = userData.notebooks.find(
    (notebook: Notebook) => notebook.id === parseInt(notebookId)
  );

  if (!notebook) return false;

  return notebook;
};
