export function Card({ children, ...props }) {
  return <div {...props} style={{ border: '1px solid #ccc', borderRadius: '8px' }}>{children}</div>;
}
export function CardContent({ children }) {
  return <div style={{ padding: '1rem' }}>{children}</div>;
}