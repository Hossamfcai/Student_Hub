import { motion } from "motion/react";
import { Edit3, Heart, Pin, Trash2 } from "lucide-react";
import pdfImage from "../assets/pdfImage.jpg";
import videoImage from "../assets/videoImage.jpg";
import websiteImage from "../assets/websiteImage.jpg";

const typeStyles = {
  Pdf: {
    badge: "bg-primary-fixed text-on-primary-fixed-variant",
    dot: "bg-primary",
  },
  Video: {
    badge: "bg-[#e8e7ff] text-[#514b91]",
    dot: "bg-[#6b63c5]",
  },
  Website: {
    badge: "bg-[#e3f7ec] text-[#23784f]",
    dot: "bg-[#2d9562]",
  },
};

export default function ResourceCard({
  resource,
  onEdit,
  onDelete,
  onTogglePin,
  onToggleFavorite,
}) {
  function deleteResourceCard(resource) {
    console.log("done");
    onDelete(resource);
  }
  const type = typeStyles[resource.type];
  console.log(resource.type);
  console.log(type);
  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
      }}
      whileHover={{
        y: -5,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`group relative overflow-hidden rounded-2xl border border-outline-variant  shadow-sm transition-shadow duration-300 hover:shadow-lg `}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 absolute w-full px-4 py-1 z-49">
        <div className="min-w-0 flex-1 items-center">
          <div className=" flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${type.badge}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full   ${type.dot} `} />

              {resource.type}
            </span>

            {resource.pinned && (
              <span className="inline-flex items-center gap-1 rounded-full bg-surface-container-high px-2 py-1 text-[11px] font-semibold text-on-surface-variant">
                <Pin size={10} fill="currentColor" />
                Pinned
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onToggleFavorite(resource.id)}
          aria-label={
            resource.favourite
              ? `Remove ${resource.title} from favorites`
              : `Add ${resource.title} to favorites`
          }
          className={`flex h-9 w-9 shrink-0 items-center  justify-center rounded-full transition-all duration-200 ${
            resource.favourite
              ? "bg-primary-fixed text-primary"
              : "text-outline hover:bg-surface-container-high hover:text-primary"
          }`}
        >
          <Heart
            size={25}
            fill={resource.favourite ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="w-full hover:scale-105 transition-all duration-500">
        {resource.type == "Pdf" && (
          <img className="w-full" src={pdfImage} alt="" />
        )}
        {resource.type == "Video" && (
          <img className="w-full" src={videoImage} alt="" />
        )}
        {resource.type == "Website" && (
          <img className="w-full" src={websiteImage} alt="" />
        )}
      </div>
      <div className="p-5 flex flex-col">
        {" "}
        <h3 className="line-clamp-2 text-lg font-bold leading-6 text-on-surface">
          {resource.title}
        </h3>
        {/* Content preview */}
        <p className="mt-4 line-clamp-5 text-sm leading-6 text-on-surface-variant">
          {resource.content || "This resource is empty."}
        </p>
        {/* Tags */}
        {resource.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {resource.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-surface-container-lowest/70 px-2 py-1 text-[10px] font-semibold text-on-surface-variant"
              >
                #{tag}
              </span>
            ))}

            {resource.tags.length > 3 && (
              <span className="px-1 py-1 text-[10px] font-semibold text-outline">
                +{resource.tags.length - 3}
              </span>
            )}
          </div>
        )}
        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-outline-variant/60 pt-4">
          <a
            href={resource.link}
            target="_blank"
            className="bg-surface text-primary border border-primary rounded-sm px-4 py-2 font-label-md text-label-md hover:bg-primary/5 transition-colors"
          >
            Visite {resource.type}
          </a>
          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => onTogglePin(resource.id)}
              aria-label={resource.pinned ? "Unpin resource" : "Pin resource"}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                resource.pinned
                  ? "bg-primary-fixed text-primary"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
              }`}
            >
              <Pin size={14} fill={resource.pinned ? "currentColor" : "none"} />
            </button>

            <button
              type="button"
              onClick={() => onEdit(resource)}
              aria-label={`Edit ${resource.title}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary"
            >
              <Edit3 size={14} />
            </button>

            <button
              type="button"
              onClick={() => {
                deleteResourceCard(resource);
              }}
              aria-label={`Delete ${resource.title}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-error-container hover:text-error"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
