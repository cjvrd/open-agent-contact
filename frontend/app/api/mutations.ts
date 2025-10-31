import { mutationOptions, useMutation } from "@tanstack/react-query";
import { GlobalQueryClient } from "queryclient";
import type { Contact } from "./queries";

//TODO: fix this, dont like it
type NewContact = Omit<Contact, "id" | "created_time" | "updated_time">;

const ContactMutations = {
  addContact: () => {
    return mutationOptions({
      mutationFn: async (contact: NewContact) => {
        //add error handling
        const response = await fetch("http://localhost:3000/contacts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contact),
        });
        if (response.status !== 201) throw new Error("Failed to add contact");
        return response.json();
      },
      onSuccess: () => {
        GlobalQueryClient.invalidateQueries({ queryKey: ["contacts"] });
      },
    });
  },
  deleteContact: () => {
    return mutationOptions({
      //TODO: change this to number?
      mutationFn: async (contactId: string) => {
        //add error handling
        const response = await fetch(
          `http://localhost:3000/contacts/${contactId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "DELETED" }),
          }
        );
        if (response.status !== 200)
          throw new Error("Failed to delete contact");
        return response.ok;
      },
      onSuccess: () => {
        GlobalQueryClient.invalidateQueries({ queryKey: ["contacts"] });
      },
    });
  },
  verifyContact: () => {
    return mutationOptions({
      //TODO: change this to number?
      mutationFn: async (contactId: string) => {
        const response = await fetch(
          `http://localhost:3000/contacts/${contactId}/verify`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ verified: true }),
          }
        );
        if (response.status !== 200)
          throw new Error("Failed to verify contact");
        return response.json();
      },
      onSuccess: () => {
        GlobalQueryClient.invalidateQueries({ queryKey: ["contacts"] });
      },
    });
  },
};

export const useAddContact = () => useMutation(ContactMutations.addContact());
export const useDeleteContact = () =>
  useMutation(ContactMutations.deleteContact());
export const useVerifyContact = () =>
  useMutation(ContactMutations.verifyContact());
