import { dateToDDMMYYYY } from "./dayjs";
import { LocalStorageUserData, Notebook, User } from "./types";

export function createUserInLocalStorage(userData: User) {
  let localStorageData = getUsersDataInLocalStorage();
  const newUser: LocalStorageUserData = {
    user: { ...userData, id: createId(null) },
    notebooks: [],
  };

  if (localStorageData && localStorageData.length > 0) {
    localStorageData.push(newUser);
  } else {
    localStorageData = [newUser];
  }

  localStorage.setItem("ramonotesData", JSON.stringify(localStorageData));

  return newUser.user.id;
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

export function deleteUserById(id: number) {
  const users: LocalStorageUserData[] = getUsersDataInLocalStorage();

  if (!users) {
    return;
  }

  const filteredUsers = users.filter((user) => user.user.id !== id);

  localStorage.setItem("ramonotesData", JSON.stringify(filteredUsers));
}

export function saveNotebookOnLocalStorage(notebook: Notebook, userId: string) {
  const usersData = getUsersDataInLocalStorage();

  usersData.forEach((userData: LocalStorageUserData) => {
    if (userData.user.id === parseInt(userId)) {
      userData.notebooks.push(treatedNotebook(notebook));
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

export const userNotebook = (
  userId: string,
  notebookId: string | null = null
) => {
  const userData = getUserById(userId);

  if (!notebookId) {
    return userData.notebooks;
  }

  const notebook = userData.notebooks.find(
    (notebook: Notebook) => notebook.id === parseInt(notebookId)
  );

  if (!notebook) return false;

  return notebook;
};

export function createId(userId: string | null) {
  let data;
  let ids;

  if (userId) {
    data = userNotebook(userId);

    if (!data?.length) return 1;

    ids = data.map((notebook: Notebook) => notebook.id).sort();
  } else {
    data = getUsersDataInLocalStorage();

    if (!data?.length) return 1;

    ids = data.map((user: LocalStorageUserData) => user.user.id).sort();
  }

  return ids[ids.length - 1] + 1;
}

export function deleteNotebook(userId: string, notebookId: number) {
  const usersData: LocalStorageUserData[] = getUsersDataInLocalStorage();

  usersData.forEach((userData: LocalStorageUserData) => {
    if (userData.user.id === parseInt(userId)) {
      userData.notebooks.forEach((notebook, index) => {
        if (notebook.id === notebookId) {
          userData.notebooks.splice(index, 1);
        }
      });
    }
  });

  localStorage.setItem("ramonotesData", JSON.stringify(usersData));
}

const treatedNotebook = (notebook: Notebook) => {
  const transformed = {...notebook, date: dateToDDMMYYYY(notebook.date)}

  return transformed
}