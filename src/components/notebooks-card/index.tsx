"use client";

import { getUserById } from "@/app/utils/local-storage";
import { LocalStorageUserData, Notebook } from "@/app/utils/types";
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
import { FormEvent, useState } from "react";

interface NotebooksCardParams {
  id: string;
}

export function NotebooksCard({ id }: NotebooksCardParams) {
  const userData: LocalStorageUserData = getUserById(id);
  const router = useRouter();

  return (
    <>
      {userData && userData.notebooks.length && (
        <>
          {userData.notebooks.map((notebook) => {
            return (
              <Card
                className="w-[350px]"
                key={`${notebook.name}-notebook-card`}
              >
                <CardHeader>
                  <CardTitle>{notebook.name}</CardTitle>
                </CardHeader>
                {notebook.tasks.length > 0 ? (
                  <CardContent>{notebook.tasks.length} anotações</CardContent>
                ) : (
                  <CardContent>Nenhuma anotação criada ainda</CardContent>
                )}
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      router.push(`/user/${id}/notebook/${notebook.id}`);
                    }}
                  >
                    Abrir caderno
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </>
      )}
    </>
  );
}
