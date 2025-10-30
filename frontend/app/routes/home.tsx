import type { Route } from "./+types/contact-list";

export function loader() {
  return { name: "Contact List" };
}

export default function ContactList({}: Route.ComponentProps) {
  return (
    <div className="text-center p-4">
      <h1 className="text-2xl">Hello!</h1>
      <h1 className="text-2xl"></h1>
      <br></br>
      <h1 className="text-xl">
        Please click below to go to either the "Contact Us" Page or the "Contact
        List" Page
      </h1>
      <div className="flex justify-center gap-4 mt-2">
        <a
          className="text-blue-500 underline hover:text-blue-600"
          href="/contact-us"
        >
          Contact Us Page
        </a>
        <a
          className="text-blue-500 underline hover:text-blue-600"
          href="/contact-list"
        >
          Contact List Page
        </a>
      </div>
    </div>
  );
}
