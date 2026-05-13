interface ProjectDetailsProps {
  title: string;
  description: string;
}

export default function ProjectDetails({
  title,
  description,
}: ProjectDetailsProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      <p className="mt-4 text-gray-500">
        {description}
      </p>
    </div>
  );
}