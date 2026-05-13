const devices = [
  {
    name:
      "MacBook Pro",
    location:
      "Pune, India",
  },
  {
    name:
      "Windows Desktop",
    location:
      "Mumbai, India",
  },
];

export default function WorkspaceDevices() {
  return (
    <div className="rounded-2xl bg-black p-6 text-white shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Active Devices
      </h2>

      <div className="space-y-4">
        {devices.map(
          (device, index) => (
            <div
              key={index}
              className="rounded-xl bg-white/10 p-4"
            >
              <h3 className="font-semibold">
                {device.name}
              </h3>

              <p className="mt-2 text-sm text-gray-300">
                {
                  device.location
                }
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}