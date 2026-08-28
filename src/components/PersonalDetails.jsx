import { useReducer, useState } from "react";
import { motion } from "motion/react";

import { Modal, TextInput, Group, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IdCard, Pencil } from "lucide-react";
import reducer, { getInitialUserState } from "../context/authReducer";
import { notifications } from "@mantine/notifications";

export default function PersonalDetails() {
  const [opened, setOpened] = useState(false);
  const [userState, dispatch] = useReducer(reducer, null, getInitialUserState);

  const form = useForm({
    initialValues: { ...userState.personalInfo },
    validate: {
      name: (val) => (val.trim().length === 0 ? "Name is required" : null),
      title: (val) => (val.trim().length === 0 ? "Title is required" : null),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email address"),
      phone: (val) =>
        val.trim().length === 0 ? "Phone number is required" : null,
      address: (val) =>
        val.trim().length === 0 ? "Address is required" : null,
    },
  });

  const handleOpenModal = () => {
    form.setValues({ ...userState.personalInfo });
    setOpened(true);
  };

  const handleSubmit = (values) => {
    setOpened(false);
    dispatch({ type: "updatePersonalInfo", payload: values });
    notifications.show({
      title: "Notification",
      message: "Personal Informations updated successfully",
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-6 sm:p-8 border-b border-outline-variant"
      >
        <div className="flex items-center justify-between pb-2 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
              <IdCard className="w-5 h-5 text-on-primary-fixed-variant" />
            </div>
            <h3 className="text-headline-md font-bold text-on-surface">
              Personal Details
            </h3>
          </div>

          <button
            type="button"
            aria-label="Edit personal userState.personalInfo"
            onClick={handleOpenModal}
            className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-md transition-colors flex items-center justify-center shrink-0 cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 sm:gap-y-6 md:gap-y-8 gap-x-6 md:gap-x-12">
          <div>
            <p className="text-label-sm font-bold text-primary uppercase tracking-wider mb-1 sm:mb-1.5">
              Full Name
            </p>
            <p className="text-body-md text-on-surface font-medium break-words">
              {userState.personalInfo.name}
            </p>
          </div>

          <div>
            <p className="text-label-sm font-bold text-primary uppercase tracking-wider mb-1 sm:mb-1.5">
              Title
            </p>
            <p className="text-body-md text-on-surface font-medium break-words">
              {userState.personalInfo.title}
            </p>
          </div>

          <div>
            <p className="text-label-sm font-bold text-primary uppercase tracking-wider mb-1 sm:mb-1.5">
              Email
            </p>
            <p className="text-body-md text-on-surface font-medium break-all md:break-words">
              {userState.personalInfo.email}
            </p>
          </div>

          <div>
            <p className="text-label-sm font-bold text-primary uppercase tracking-wider mb-1 sm:mb-1.5">
              Phone Number
            </p>
            <p className="text-body-md text-on-surface font-medium break-words">
              {userState.personalInfo.phone}
            </p>
          </div>

          <div className="col-span-1 md:col-span-2">
            <p className="text-label-sm font-bold text-primary uppercase tracking-wider mb-1 sm:mb-1.5">
              Current Address
            </p>
            <p className="text-body-md text-on-surface font-medium break-words">
              {userState.personalInfo.address}
            </p>
          </div>
        </div>
      </motion.div>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Edit Personal Details"
        centered
        radius="lg"
        size="lg"
        classNames={{
          title: "text-headline-sm font-bold text-on-surface",
          header:
            "bg-surface-container-lowest border-b border-outline-variant pb-3",
          content: "bg-surface-container-lowest border border-outline-variant",
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md" mt="sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput
                label="Full Name"
                placeholder="Alex J. Mercer"
                {...form.getInputProps("name")}
                classNames={{
                  label: "text-label-md font-bold text-on-surface mb-1",
                  input:
                    "bg-surface-container-lowest border-outline-variant text-on-surface text-body-md focus:border-primary",
                }}
              />
              <TextInput
                label="Title"
                placeholder="Computer Science Major & Software Developer"
                {...form.getInputProps("title")}
                classNames={{
                  label: "text-label-md font-bold text-on-surface mb-1",
                  input:
                    "bg-surface-container-lowest border-outline-variant text-on-surface text-body-md focus:border-primary",
                }}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput
                label=" Email"
                placeholder="alex.mercer@university.edu"
                {...form.getInputProps("email")}
                classNames={{
                  label: "text-label-md font-bold text-on-surface mb-1",
                  input:
                    "bg-surface-container-lowest border-outline-variant text-on-surface text-body-md focus:border-primary",
                }}
              />

              <TextInput
                label="Phone Number"
                placeholder="+1 (555) 123-4567"
                {...form.getInputProps("phone")}
                classNames={{
                  label: "text-label-md font-bold text-on-surface mb-1",
                  input:
                    "bg-surface-container-lowest border-outline-variant text-on-surface text-body-md focus:border-primary",
                }}
              />
            </div>

            <TextInput
              label="Current Address"
              placeholder="742 Evergreen Terrace, Springfield, State 12345"
              {...form.getInputProps("address")}
              classNames={{
                label: "text-label-md font-bold text-on-surface mb-1",
                input:
                  "bg-surface-container-lowest border-outline-variant text-on-surface text-body-md focus:border-primary",
              }}
            />
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
