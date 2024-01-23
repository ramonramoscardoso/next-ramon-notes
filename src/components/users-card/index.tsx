"use client";

import {
  createUserInLocalStorage,
  deleteUserById,
  getUserByName,
  getUsersDataInLocalStorage,
} from "@/app/utils/local-storage";
import { LocalStorageUserData, User } from "@/app/utils/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { Trash2 } from "lucide-react";

export function UsersCard() {
  const [formValues, setFormValues] = useState<User>();
  const [users, setUsers] = useState<LocalStorageUserData[]>();
  const [userDeleteId, setUserDeleteId] = useState<number | null>(null);
  const [alertUserName, setAlertUserName] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    setUsers(getUsersDataInLocalStorage());
  }, []);

  function handleCreateUser(event: FormEvent) {
    event.preventDefault();

    if (formValues) {
      const checkUsername = getUserByName(formValues.name);

      if (checkUsername) {
        setAlertUserName(true);
        return;
      }

      const userId = createUserInLocalStorage(formValues);
      router.push(`/user/${userId}`);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  }

  function handleDeleteUser(id: number) {
    deleteUserById(id);

    window.location.reload();
  }

  function userCard(user: LocalStorageUserData) {
    return (
      <Card
        className="w-[350px] flex flex-col items-center"
        key={`${user.user.name}-login-card`}
      >
        <div className="w-full flex justify-end h-0">
          <Button
            variant="ghost"
            onClick={() => setUserDeleteId(user.user.id as number)}
          >
            <Trash2 size={15} />
          </Button>
        </div>
        <CardHeader>
          <CardTitle>{user.user.name}</CardTitle>
        </CardHeader>
        {user.notebooks.length === 0 ? (
          <CardContent>Nenhum caderno criado ainda</CardContent>
        ) : (
          <CardContent>
            {`${user.notebooks.length} ${
              user.notebooks.length === 1 ? "caderno" : "cadernos"
            } `}
          </CardContent>
        )}

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              router.push(`/user/${user.user.id}`);
            }}
          >
            Acessar
          </Button>
        </CardFooter>
      </Card>
    );
  }

  function userDeleteCard(user: LocalStorageUserData) {
    return (
      <Card
        className="w-[350px] flex flex-col items-center bg-rose-700"
        key={`${user.user.name}-login-card`}
      >
        <CardHeader>
          Tem certeza que deseja deletar o usuário {user.user.name}?
        </CardHeader>

        <CardFooter className="flex w-full justify-between">
          <Button
            variant="outline"
            className="bg-transparent"
            onClick={() => handleDeleteUser(user.user.id as number)}
          >
            Sim
          </Button>
          <Button
            variant="outline"
            className="bg-transparent"
            onClick={() => setUserDeleteId(null)}
          >
            Cancelar
          </Button>
        </CardFooter>
      </Card>
    );
  }

  function newUserSection() {
    const users = getUsersDataInLocalStorage();

    return (
      <>
        {!users || users?.length < 5 ? (
          <Card className="min-[600px]:w-[500px] w-[350px] flex flex-col items-center">
            <CardHeader>
              <CardTitle>Criar novo usuário</CardTitle>
            </CardHeader>
            <CardContent>
              {!alertUserName ? (
                <form
                  onSubmit={handleCreateUser}
                  className="grid w-full items-center gap-4"
                >
                  <div className="flex flex-col space-y-1.5">
                    <Input
                      id="name"
                      placeholder="Nome do usuário"
                      onChange={handleChange}
                    />
                  </div>
                  <Button variant="outline" type="submit">
                    Criar
                  </Button>
                </form>
              ) : (
                <>
                  <div className="flex flex-col space-y-1.5">
                    <span>Usuário já existe!</span>
                    <Button
                      variant="outline"
                      onClick={() => setAlertUserName(false)}
                    >
                      Ok
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ) : (
          <>🚨 Máximo de 5 usuários atingido!</>
        )}
      </>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {users && users.length > 0 && (
        <section className="flex flex-col gap-3">
          <h3 className="text-xl font-bold">Usuários</h3>
          <Separator />
          <div className="grid min-[1200px]:grid-cols-3 md:grid-cols-2 gap-5 place-items-center">
            {users.map((user) => {
              return (
                <div key={`user-${user.user.id}`}>
                  {userDeleteId && userDeleteId === user.user.id ? (
                    <>{userDeleteCard(user)}</>
                  ) : (
                    <>{userCard(user)}</>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-3">
        <h3 className="text-xl font-bold">Deseja criar um novo usuário?</h3>
        <Separator />
        {newUserSection()}
      </section>
    </div>
  );
}
