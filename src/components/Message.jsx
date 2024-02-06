/* eslint-disable react/prop-types */
export function Message({ message }) {
  return (
    <div className="text-slate-200 bg-red-500 py-2 px-3 text-sm rounded-lg my-3 min-w-full max-w-xs">
      <p>{message}</p>
    </div>
  );
}
