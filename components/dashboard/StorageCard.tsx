export default function StorageCard() {
  return (
    <div className="rounded-2xl bg-black p-6 text-white shadow">
      <h2 className="text-2xl font-bold">
        Storage Usage
      </h2>

      <div className="mt-6 h-4 overflow-hidden rounded-full bg-gray-700">
        <div className="h-full w-[70%] rounded-full bg-white" />
      </div>

      <p className="mt-4 text-gray-300">
        7GB of 10GB used
      </p>
    </div>
  );
}