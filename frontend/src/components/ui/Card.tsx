
const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mx-auto max-w-md">
      {children}
    </div>
  )
}

export default Card