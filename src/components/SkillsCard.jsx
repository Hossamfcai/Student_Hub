import { useReducer, useState } from "react";
import { motion } from "motion/react";
import { Modal, TagsInput, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Brain, Pencil } from "lucide-react";
import reducer, { getInitialUserState } from "../context/authReducer";
export default function SkillsCard() {
  const [opened, setOpened] = useState(false);
  const [userState, dispatch] = useReducer(reducer, null, getInitialUserState);

  const form = useForm({
    initialValues: {
      skills: userState.skills,
    },
    validate: {
      skills: (value) =>
        value.length === 0 ? "Please add at least one skill" : null,
    },
  });

  const handleOpenModal = () => {
    form.setValues({ skills: [...userState.skills] });
    setOpened(true);
  };

  const handleSubmit = (values) => {
    setOpened(false);
    console.log(values.skills);
    dispatch({ type: "updateUserSkills", payload: { skills: values.skills } });
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
          <h3 className="text-headline-sm font-bold text-on-surface flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary shrink-0" />
            Skills
          </h3>

          <button
            type="button"
            aria-label="Edit skills"
            onClick={handleOpenModal}
            className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-md transition-colors flex items-center justify-center shrink-0 cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {userState.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-label-sm font-semibold"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Edit Skills"
        centered
        radius="lg"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TagsInput
            label="Your Skills"
            description="Type a skill and press Enter to add it"
            placeholder="e.g. TypeScript, GraphQL"
            splitChars={[",", " "]}
            clearable
            classNames={{
              label: "text-label-md font-bold text-on-surface mb-1",
              description: "text-body-sm text-on-surface-variant mb-2",
              input:
                "bg-surface-container-lowest border-outline-variant text-on-surface rounded-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-colors",
              pill: "bg-primary-fixed text-on-primary-fixed-variant font-semibold text-label-sm rounded-full px-2 py-0.5",
            }}
            {...form.getInputProps("skills")}
          />

          <Group justify="flex-end" mt="xl" gap="xs">
            <button
              type="button"
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
