"use client";

import {
  createId,
  createUserInLocalStorage,
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
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Separator } from "../ui/separator";

export function UsersCard() {
  const [formValues, setFormValues] = useState<User>();
  const [users, setUsers] = useState<LocalStorageUserData[]>();
  const router = useRouter();

  useEffect(() => {
    setUsers(getUsersDataInLocalStorage());
  }, []);

  function handleCreateUser(event: FormEvent) {
    event.preventDefault();

    if (formValues) {
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

  return (
    <div className="flex flex-col gap-20">
      {users && users.length > 0 && (
        <section className="flex flex-col gap-3">
          <h3 className="text-xl font-bold">Usuários</h3>
          <Separator />
          <div className="flex gap-3 grid grid-cols-3">
            {users.map((user) => {
              return (
                <Card
                  className="w-[350px] flex flex-col items-center"
                  key={`${user.user.name}-login-card`}
                >
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
            })}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-3">
        <h3 className="text-xl font-bold">Novo por aqui?</h3>
        <Separator />
        <Card className="w-[350px] flex flex-col items-center">
          <CardHeader>
            <CardTitle>Criar novo usuário</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateUser} className="grid w-full items-center gap-4">
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
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
