const messages = [
  {
    user: "Mohit",
    message:
      "Backend API completed.",
  },
  {
    user: "Rahul",
    message:
      "UI bugs fixed successfully.",
  },
];

export default function TeamChat() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Team Chat
      </h2>

      <div className="space-y-4">
        {messages.map(
          (message, index) => (
            <div
              key={index}
              className="rounded-xl border p-4"
            >
              <h3 className="font-semibold">
                {message.user}
              </h3>

              <p className="mt-2 text-gray-500">
                {message.message}
              </p>
            </div>
          )
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <input
          type="text"
          placeholder="Type message..."
          className="flex-1 rounded-xl border p-3"
        />

        <button className="rounded-xl bg-black px-6 text-white">
          Send
        </button>
      </div>
    </div>
  );
}