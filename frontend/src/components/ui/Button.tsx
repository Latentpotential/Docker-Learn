
const Button = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => {
  return (
    <div className="bg-blue-500 text-white p-2 rounded cursor-pointer" onClick={onClick}>
      {children}
    </div>
  )
}

export default Button