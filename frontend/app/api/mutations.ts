import { mutationOptions, useMutation } from "@tanstack/react-query";
import { GlobalQueryClient } from "queryclient";
import type { Contact } from "./queries";
const API_URL = "http://localhost:3000";

//TODO: fix this, dont like it
type NewContact = Omit<Contact, "id" | "created_time" | "updated_time">;

const ContactMutations = {
  addContact: () => {
    return mutationOptions({
      mutationFn: async (contact: NewContact) => {
        //add error handling
        const response = await fetch(`${API_URL}/contacts`, {
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
      mutationFn: async (contactId: string) => {
        //TODO:add error handling
        const response = await fetch(`${API_URL}/contacts/${contactId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "DELETED" }),
        });
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
      mutationFn: async (contactId: string) => {
        const response = await fetch(`${API_URL}/contacts/${contactId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ verified: true }),
        });
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
