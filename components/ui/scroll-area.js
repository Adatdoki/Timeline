export function ScrollArea({ children, className }) {
  return <div className={className} style={{ overflowY: 'auto', maxHeight: '600px' }}>{children}</div>;
}