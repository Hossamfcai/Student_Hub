import { useReducer, useState } from "react";
import { motion } from "motion/react";

import { Modal, TextInput, Group, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Landmark, Pencil } from "lucide-react";
import reducer, { getInitialUserState } from "../context/authReducer";
import { notifications } from "@mantine/notifications";

export default function AcademicProfile() {
  const [opened, setOpened] = useState(false);
  const [userState, dispatch] = useReducer(reducer, null, getInitialUserState);

  const form = useForm({
    initialValues: { ...userState.AcademicInfo },
    validate: {
      college: (val) =>
        val.trim().length === 0 ? "College is required" : null,
      degree: (val) =>
        val.trim().length === 0 ? "Degree Program is required" : null,
    },
  });

  const handleOpenModal = () => {
    form.setValues({ ...userState.AcademicInfo });
    setOpened(true);
  };

  const handleSubmit = (values) => {
    setOpened(false);
    dispatch({ type: "updateAcademicInfo", payload: values });
    notifications.show({
      title: "Notification",
      message: "Academic Information updated successfully",
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-6 sm:p-8 bg-surface-container-low/50"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
              <Landmark className="w-5 h-5 text-on-primary-fixed-variant" />
            </div>
            <h3 className="text-headline-md font-bold text-on-surface">
              Academic Profile
            </h3>
          </div>

          <button
            type="button"
            aria-label="Edit academic profile"
            onClick={handleOpenModal}
            className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-md transition-colors flex items-center justify-center shrink-0 cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-surface-container-lowest p-5 rounded-lg border border-outline-variant shadow-sm">
            <h4 className="text-label-sm font-bold text-primary uppercase tracking-wider mb-2">
              College / School
            </h4>
            <p className="text-body-md font-semibold text-on-surface">
              {userState.AcademicInfo.college}
            </p>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-lg border border-outline-variant shadow-sm">
            <h4 className="text-label-sm font-bold text-primary uppercase tracking-wider mb-2">
              Degree Program
            </h4>
            <p className="text-body-md font-semibold text-on-surface">
              {userState.AcademicInfo.degree}
            </p>
            {userState.AcademicInfo.major && (
              <p className="text-body-sm text-on-surface-variant mt-1">
                {userState.AcademicInfo.major}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Edit Academic Profile"
        centered
        radius="lg"
        size="md"
        classNames={{
          title: "text-headline-sm font-bold text-on-surface",
          header:
            "bg-surface-container-lowest border-b border-outline-variant pb-3",
          content: "bg-surface-container-lowest border border-outline-variant",
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md" mt="sm">
            <TextInput
              label="College / School"
              placeholder="e.g. College of Engineering"
              {...form.getInputProps("college")}
              classNames={{
                label: "text-label-md font-bold text-on-surface mb-1",
                input:
                  "bg-surface-container-lowest border-outline-variant text-on-surface text-body-md focus:border-primary",
              }}
            />

            <TextInput
              label="Degree Program"
              placeholder="e.g. B.S. Computer Science"
              {...form.getInputProps("degree")}
              classNames={{
                label: "text-label-md font-bold text-on-surface mb-1",
                input:
                  "bg-surface-container-lowest border-outline-variant text-on-surface text-body-md focus:border-primary",
              }}
            />

            <TextInput
              label="Major / Minor Details"
              placeholder="e.g. Minor in Mathematics"
              {...form.getInputProps("major")}
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
