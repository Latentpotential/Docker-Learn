
const Input = ({ placeholder, type, value, onChange }: { placeholder: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <input 
      className="border border-gray-300 rounded-md p-2" 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange}
      type={type} 
    />
  )
}

export default Input