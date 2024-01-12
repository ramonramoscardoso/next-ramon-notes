"use client";

import { getUserById } from "@/app/utils/local-storage";
import { LocalStorageUserData } from "@/app/utils/types";
import { CreateNotebookCard } from "@/components/create-notebook-card";
import { NotebooksCard } from "@/components/notebooks-card";

export default function UserHomePage({ params }: { params: { id: string } }) {
  const user: LocalStorageUserData = getUserById(params.id);

  return (
    <>
      <div>Olá, {user.user.name}!</div>
      {user?.notebooks?.length === 0 && (
        <>Você ainda não tem nenhum caderno criado.</>
      )}
      <NotebooksCard id={params.id} />
      <CreateNotebookCard id={params.id} />
    </>
  );
}
