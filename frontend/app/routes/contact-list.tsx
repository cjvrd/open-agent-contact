import type { Route } from "./+types/contact-list";
import { useGetAllContacts } from "~/api/queries";
import { useDeleteContact, useVerifyContact } from "~/api/mutations";
import { Button } from "~/components/ui/button";

export default function ContactList({}: Route.ComponentProps) {
  const { data: contacts, status } = useGetAllContacts();
  const deleteContact = useDeleteContact();
  const verifyContact = useVerifyContact();

  //TODO:add loading thingo with status

  if (!contacts)
    return (
      <div className="text-center p-4">
        <h1 className="text-2xl">No Contacts Found!</h1>
      </div>
    );

  return (
    <div className="text-center p-4">
      <h1 className="text-2xl">Contact List</h1>
      <ul className="mt-4">
        {contacts.map((contact) => (
          <li key={contact.id} className="mb-2">
            <strong>
              {contact.first_name} {contact.last_name}
            </strong>
            <br />
            Email: {contact.email}
            <br />
            Phone: {contact.phone}
            <br />
            Verified: {contact.verified ? "Yes" : "No"}
            <br />
            <Button
              variant="default"
              onClick={() => verifyContact.mutate(contact.id.toString())}
              disabled={contact.verified}
            >
              {contact.verified ? "Verified" : "Verify"}
            </Button>
            {"  "}
            <Button
              variant="destructive"
              onClick={() => deleteContact.mutate(contact.id.toString())}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
