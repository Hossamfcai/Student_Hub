import { useReducer, useState } from "react";
import { motion } from "motion/react";
import {
  Modal,
  FileButton,
  TextInput,
  Button,
  Group,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Pencil, Upload } from "lucide-react";
import defaultImage from "../assets/Images/defaultUser.jpg";
import reducer, { getInitialUserState } from "../context/authReducer";

export default function ProfileHero() {
  const [opened, setOpened] = useState(false);

  const [userState, dispatch] = useReducer(reducer, null, getInitialUserState);

  const form = useForm({
    initialValues: {
      url: userState?.image?.url || "",
    },
    validate: {
      url: (val) =>
        val.trim().length === 0 ? "Image URL or file is required" : null,
    },
  });

  const handleOpenModal = () => {
    form.setValues({ url: userState.image.url || "" });
    setOpened(true);
  };

  // Handle local file selection
  const handleFileChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setFieldValue("url", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values) => {
    setOpened(false);
    dispatch({ type: "updateImage", payload: values.url });
  };

  return (
    <>
      <motion.section
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden mb-8 border border-outline-variant"
      >
        <div className="h-32 sm:h-48 md:h-56 bg-linear-to-r from-primary to-primary-container w-full relative" />

        <div className="px-4 sm:px-6 md:px-8 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 -mt-16 sm:-mt-20 md:-mt-24">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 text-center sm:text-left">
              <div className="relative shrink-0 h-28 w-28 sm:h-36 sm:w-36 md:h-40 md:w-40 rounded-full p-1.5 sm:p-2 bg-surface-container-lowest shadow-xl">
                <img
                  loading="lazy"
                  className="rounded-full w-full h-full object-cover"
                  src={userState.image.url ? userState.image.url : defaultImage}
                />
              </div>

              <article className="relative z-10 flex flex-col pt-2 sm:pt-0 sm:pb-2">
                <h2 className="text-headline-lg-mobile sm:text-headline-lg font-bold text-on-surface tracking-tight">
                  {userState.personalInfo.name}
                </h2>
                <p className="text-body-md sm:text-body-lg text-primary font-semibold mt-1">
                  {userState.personalInfo.title}
                </p>
                <span className="text-label-sm sm:text-label-md font-medium text-on-surface-variant mt-1">
                  {userState.AcademicInfo.college}
                </span>
              </article>
            </div>

            <div className="flex items-center justify-center sm:justify-start md:justify-end gap-3 pt-2 md:pt-0 md:pb-2">
              <button
                type="button"
                onClick={handleOpenModal}
                className="flex items-center gap-2 px-4 py-2 text-label-md font-semibold text-on-primary bg-primary hover:bg-primary-container rounded-md shadow-sm transition-colors cursor-pointer"
              >
                <Pencil className="w-4 h-4" />
                Edit Profile Picture
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Update Profile Picture"
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
            <div className="flex justify-center mb-2">
              <div className="h-28 w-28 rounded-full border-2 border-outline-variant overflow-hidden bg-surface-container-low">
                <img
                  src={form.values.url || defaultImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <p className="text-label-md font-bold text-on-surface mb-2">
                Upload New Photo
              </p>
              <FileButton
                onChange={handleFileChange}
                accept="image/png,image/jpeg,image/webp"
              >
                {(props) => (
                  <Button
                    {...props}
                    type="button"
                    variant="outline"
                    leftSection={<Upload className="w-4 h-4 text-primary" />}
                    className="w-full border-dashed border-outline-variant hover:border-primary bg-surface-container-lowest hover:bg-surface-container-low text-primary text-label-md font-semibold py-2 px-4 rounded-md transition-all"
                  >
                    Choose Image File
                  </Button>
                )}
              </FileButton>
            </div>

            <TextInput
              label="Or Image URL"
              placeholder="https://example.com/avatar.jpg"
              {...form.getInputProps("url")}
              classNames={{
                label: "text-label-md font-bold text-on-surface mb-1",
                input:
                  "bg-surface-container-lowest border-outline-variant text-on-surface text-body-md focus:border-primary",
              }}
            />
          </Stack>

          <Group justify="flex-end" mt="xl" gap="xs">
            <Button
              type="button"
              variant="subtle"
              onClick={() => setOpened(false)}
              className="bg-surface-container-low hover:bg-surface-container text-on-surface text-label-md font-semibold px-4 py-2 rounded-md transition-colors"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-primary hover:bg-primary-container text-on-primary text-label-md font-semibold px-4 py-2 rounded-md shadow-sm transition-colors"
            >
              Save Changes
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
