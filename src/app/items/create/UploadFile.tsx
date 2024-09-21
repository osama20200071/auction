"use client";

import { storage } from "@/Appwrite/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { env } from "@/env";
import { ID } from "appwrite";
import React from "react";
import { createItemAction } from "./actions";

const UploadFile = () => {
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const file = formData.get("file") as File;

    const response = await storage.createFile(
      env.NEXT_PUBLIC_BUCKET_ID,
      ID.unique(),
      file
    );

    console.log(response);
    await createItemAction(formData, response.$id); // server action
  };

  return (
    <form
      className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg"
      onSubmit={submitHandler}
    >
      <Input
        required
        className="max-w-lg"
        name="name"
        placeholder="Name your item"
      />
      <Input
        required
        className="max-w-lg"
        name="startingPrice"
        type="number"
        step="0.01"
        placeholder="What to start your auction at"
      />
      <Input type="file" name="file"></Input>

      <Button className="self-end" type="submit">
        Post Item
      </Button>
    </form>
  );
};

export default UploadFile;
