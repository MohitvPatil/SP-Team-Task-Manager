interface SearchInputProps {
  placeholder: string;
}

export default function SearchInput({
  placeholder,
}: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full rounded-xl border bg-white p-4 shadow outline-none"
    />
  );
}