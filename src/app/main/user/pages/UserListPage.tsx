import React, { useState } from "react";
import { useSpinner, useSuperQuery } from "@vadiun/react-hooks";
import { PageContainer } from "layout/components";
import { Card } from "shared/components";
import { useUserRepository } from "../services/UserRepository";
import { TextField } from "@material-ui/core";
import { Button } from "@vadiun/react-components";
import { User } from "app/auth/models";

export const UserListPage = () => {
  const showSpinner = useSpinner();
  const [text, setText] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const userRepo = useUserRepository();

  const onSearch = async () => {
    const promise = userRepo.getUserByName(text);
    showSpinner(promise);
    const users = await promise;
    console.log(users);
    setUsers(users);
  };

  return (
    <PageContainer>
      <div className="flex-1">
        <Card title="Usuarios">
          <div className="p-8">
            <div className="flex gap-6">
              <TextField
                type="outline"
                label="Usuario"
                onChange={(ev) => setText(ev.target.value)}
                value={text}
              />
              <Button onClick={onSearch} variant="light">
                Buscar
              </Button>
            </div>
            {users.map((user) => (
              <div className="p-8 shadow-md my-4">
                <p className="text-bold">{user.email}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};
