import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  children: ReactNode;
}

const people = [
  {
    id: "212g2f2s22ki232l",
    first_name: "Vishal",
    last_name: "Kashi",
    email: "vishalkashi@gmail.com",
  },
  {
    id: "212g2f2s22ki232l4",
    first_name: "Kunal",
    last_name: "Kashi",
    email: "kunalkashi@gmail.com",
  },
];

const SearchContactModal = ({ children }: Props) => {
  const renderPerson = (person) => {
    return (
      <div
        key={person.id}
        className={`flex items-center p-2 cursor-pointer hover:bg-gray-100 w-full`}
        onClick={() => {}}
      >
        <Avatar className="h-10 w-10">
          <AvatarImage src={person.avatar} alt={person.name} />
          <AvatarFallback>
            {person.first_name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="ml-4 flex-1">
          <div className="flex justify-between items-baseline">
            <h3 className="font-semibold">
              {person.first_name + " " + person?.last_name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">{person.email}</p>
        </div>
      </div>
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search for people</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Input
            id="name"
            defaultValue=""
            placeholder="Search by email"
            className="col-span-3"
          />
          <div className="w-full">
            {people?.map((person, index) => {
              return renderPerson(person, index);
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchContactModal;
