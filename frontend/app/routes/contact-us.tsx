import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Spinner } from "~/components/ui/spinner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { useAddContact } from "~/api/mutations";
import { useForm } from "react-hook-form";
type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes?: string;
};

export default function ContactUs() {
  const addContactMutation = useAddContact();

  const form = useForm<FormValues>({
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    addContactMutation.mutate(
      {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        phone: values.phone,
        notes: values.notes ?? "",
        status: "ENABLED",
        verified: false,
      },
      {
        onSuccess: () => form.reset(),
      }
    );
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-medium text-center mt-4 mb-2">
        Contact us, we love to hear from you!
      </h1>
      <div className="max-w-5xl w-full mx-auto mt-8 grid gap-8 md:grid-cols-2">
        <aside className="p-4 border rounded">
          <p>
            Welcome to OpenAgent. We've been around since 2013, and our vision
            is to make it easy for people to buy, sell and own property.
          </p>
          <p className="mt-3">Here are the different ways you can contact us</p>
          <br />
          <h1 className="text-l font-bold mb-3 underline">
            Contact Us Details
          </h1>

          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-medium">
                Phone:{" "}
                <a href="tel:132434" className="text-blue-600 underline">
                  13 24 34
                </a>
              </h3>
            </div>

            <div>
              <h3 className="font-medium">
                Email:{" "}
                <a
                  href="mailto:support@openagent.com.au"
                  className="text-blue-600 underline"
                >
                  support@openagent.com.au
                </a>
              </h3>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold underline">Postal Address</h3>
              <p>PO Box 419, Alexandria NSW 1435</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold underline">
                Contact centre hours of operation
              </h3>
              <p>Monday - Friday 8:30 - 5:00</p>
            </div>
          </div>
        </aside>
        <div className="p-4 border rounded">
          {addContactMutation.isSuccess ? (
            <div className="space-y-4" role="status" aria-live="polite">
              <h2 className="text-2xl font-semibold text-center">
                Thanks for reaching out!
              </h2>
              <p className="text-center">
                We’ve received your message and will get back to you soon.
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="firstName"
                  rules={{
                    required: "First name is required",
                    maxLength: { value: 20, message: "Max 20 characters" },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="p-1">First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="First name"
                          disabled={addContactMutation.isPending}
                          {...field}
                          maxLength={20}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  rules={{
                    required: "Last name is required",
                    maxLength: { value: 20, message: "Max 20 characters" },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="p-1">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Last name"
                          disabled={addContactMutation.isPending}
                          {...field}
                          maxLength={20}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="p-1">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email address"
                          disabled={addContactMutation.isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  rules={{
                    required: "Phone number is required",
                    pattern: {
                      value: /^(?:\+61|0)4(?:[ -]?\d){8}$/,
                      message: "Enter a valid phone number",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="p-1">Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Phone number"
                          inputMode="tel"
                          pattern="^[+]?[-()\\d\\s]+$"
                          disabled={addContactMutation.isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  rules={{
                    maxLength: {
                      value: 1000,
                      message: "Message is too long",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="p-1">Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What do you want to speak to us about"
                          className="w-full border rounded px-3 py-2"
                          rows={3}
                          disabled={addContactMutation.isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {addContactMutation.error ? (
                  <p className="text-destructive text-sm">
                    {(addContactMutation.error as Error).message ||
                      "Failed to submit. Please try again."}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  disabled={addContactMutation.isPending}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  {addContactMutation.isPending ? (
                    <>
                      <Spinner className="size-4" /> Sending
                    </>
                  ) : (
                    "Send"
                  )}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}
