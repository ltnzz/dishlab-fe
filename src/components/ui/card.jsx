export function Card({ children, className = "" }) {
  return (
    <div className={"rounded-xl border border-white/10 " + className}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={"p-4 " + className}>{children}</div>;
}