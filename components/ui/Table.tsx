interface TableProps {
  headers: string[];
  data: any[];
}

export default function Table({
  headers,
  data,
}: TableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow">
      <table className="min-w-full">
        <thead className="border-b bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-6 py-4 text-left text-sm font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-b"
            >
              {Object.values(row).map(
                (value: any, i) => (
                  <td
                    key={i}
                    className="px-6 py-4 text-sm"
                  >
                    {value}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
