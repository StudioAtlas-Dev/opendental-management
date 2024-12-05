export function ErrorCard({ message }: { message: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-red-600">Error</h2>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}
