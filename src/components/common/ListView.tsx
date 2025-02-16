interface ListViewProps {
  children: React.ReactNode
}

const ListView: React.FC<ListViewProps> = ({ children }) => {
  return <div className="flex flex-col gap-3 mt-5">{children}</div>
}

export default ListView
