/* eslint-disable react/prop-types */
export function Message({ message }) {
  return (
    <p className="text-slate-200 bg-red-500 py-2 px-3 text-sm rounded-lg my-3 w-full max-w-md">
      {message}
    </p>
  );
}
