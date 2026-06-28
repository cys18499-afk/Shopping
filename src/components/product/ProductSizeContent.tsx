export default function SizeContent({ size }: { size: string[] }) {
  if (!size || size.length === 0) {
    return (
      <div className="py-10 text-sm text-gray-500">사이즈 정보가 없습니다.</div>
    );
  }

  if (size[0] === "F" || size.includes("F")) {
    return (
      <div className="py-10">
        <p className="text-sm font-medium text-gray-700">프리사이즈입니다.</p>
      </div>
    );
  }

  return (
    <div className="py-10">
      <table className="w-full border-collapse border border-gray-200 text-sm text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="border p-2">사이즈 (cm)</th>
            <th className="border p-2">총장</th>
            <th className="border p-2">어깨</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2 font-medium text-black">S</td>
            <td className="border p-2 text-gray-600">68</td>
            <td className="border p-2 text-gray-600">45</td>
          </tr>
          <tr>
            <td className="border p-2 font-medium text-black">M</td>
            <td className="border p-2 text-gray-600">70</td>
            <td className="border p-2 text-gray-600">47</td>
          </tr>
          <tr>
            <td className="border p-2 font-medium text-black">L</td>
            <td className="border p-2 text-gray-600">72</td>
            <td className="border p-2 text-gray-600">49</td>
          </tr>
          <tr>
            <td className="border p-2 font-medium text-black">XL</td>
            <td className="border p-2 text-gray-600">72</td>
            <td className="border p-2 text-gray-600">52</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
