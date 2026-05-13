interface BreadcrumbProps {
  page: string;
}

export default function Breadcrumb({
  page,
}: BreadcrumbProps) {
  return (
    <div className="mb-6 text-sm text-gray-500">
      Dashboard / {page}
    </div>
  );
}
