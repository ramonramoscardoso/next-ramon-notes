"use client";

import {
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
    <>
      {users && users.length > 0 && (
        <>
          {users.map((user) => {
            return (
              <Card className="w-[350px]" key={`${user.user.name}-login-card`}>
                <CardHeader>
                  <CardTitle>{user.user.name}</CardTitle>
                </CardHeader>
                <CardContent>Nenhum caderno criado ainda</CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      router.push(`/user/${user.user.id}`);
                    }}
                  >
                    Login
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </>
      )}
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Criar novo usuário</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateUser}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Nome do usuário"
                  onChange={handleChange}
                />
              </div>
            </div>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="submit">
                Criar
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
