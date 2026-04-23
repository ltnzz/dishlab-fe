export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={
        "px-4 py-2 rounded bg-white text-black hover:bg-white/80 transition " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}