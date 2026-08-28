import { useReducer, useState } from "react";
import { motion } from "motion/react";
import { Modal, TextInput, Group, ActionIcon, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Pencil, Trash2 } from "lucide-react";
import reducer, { getInitialUserState } from "../context/authReducer";
export default function ConnectLinks() {
  const [opened, setOpened] = useState(false);
  const [userState, dispatch] = useReducer(reducer, null, getInitialUserState);

  const form = useForm({
    initialValues: {
      links: userState.connect,
    },
    validate: {
      links: {
        name: (value) =>
          value.trim().length === 0 ? "Name is required" : null,
        url: (value) => (value.trim().length === 0 ? "URL is required" : null),
      },
    },
  });

  const handleOpenModal = () => {
    form.setValues({ links: [...userState.connect] });
    setOpened(true);
  };

  const handleSubmit = (values) => {
    setOpened(false);
    dispatch({ type: "updateConnect", payload: { connect: values.links } });
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant"
      >
        <div className="flex items-center justify-between pb-2 mb-4 border-b border-outline-variant">
          <h3 className="text-headline-sm font-bold text-on-surface">
            Connect
          </h3>

          <button
            type="button"
            aria-label="Edit connect links"
            onClick={handleOpenModal}
            className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-md transition-colors flex items-center justify-center shrink-0 cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {userState.connect.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors text-label-md font-medium border border-outline-variant"
            >
              {link.name}
            </a>
          ))}
        </div>
      </motion.div>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Edit Connect Links"
        centered
        radius="lg"
        classNames={{
          title: "text-headline-sm font-bold text-on-surface",
          header:
            "bg-surface-container-lowest border-b border-outline-variant pb-3",
          content: "bg-surface-container-lowest border border-outline-variant",
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md" mt="sm">
            {form.values.links.map((_, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-3 bg-surface-container-low rounded-lg border border-outline-variant"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                  <TextInput
                    placeholder="Link Name (e.g. Website)"
                    {...form.getInputProps(`links.${index}.name`)}
                    classNames={{
                      input:
                        "bg-surface-container-lowest border-outline-variant text-on-surface text-body-md focus:border-primary",
                    }}
                  />
                  <TextInput
                    placeholder="URL (e.g. https://...)"
                    {...form.getInputProps(`links.${index}.url`)}
                    classNames={{
                      input:
                        "bg-surface-container-lowest border-outline-variant text-on-surface text-body-md focus:border-primary",
                    }}
                  />
                </div>

                <ActionIcon
                  color="red"
                  variant="subtle"
                  className="mt-1"
                  onClick={() => form.removeListItem("links", index)}
                  disabled={form.values.links.length === 1}
                >
                  <Trash2 className="w-4 h-4" />
                </ActionIcon>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                form.insertListItem("links", { name: "", url: "" })
              }
              className="w-full   border border-primary hover:border-primary bg-surface-container-lowest hover:bg-surface-container-low text-primary text-label-md font-semibold py-2 px-4 rounded-md transition-all duration-200"
            >
              Add Another Link
            </button>
          </Stack>

          <Group justify="flex-end" mt="xl" gap="xs">
            <button
              type="button"
              variant="subtle"
              onClick={() => setOpened(false)}
              className="bg-surface-container-low hover:bg-surface-container text-on-surface text-label-md font-semibold px-4 py-2 rounded-md transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-primary hover:bg-primary-container text-on-primary text-label-md font-semibold px-4 py-2 rounded-md shadow-sm transition-colors"
            >
              Save Changes
            </button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
