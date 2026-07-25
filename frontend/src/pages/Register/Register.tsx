import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import axios from "axios";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post("/api/register", {
        username: username,
        password: password
      });
      console.log(response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Register failed:", error);
    }
  };

  return (
    <Card>
      <h2>Register</h2>
      <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <a href="/login" className="text-blue-500 hover:underline">Already have an account? Login</a>
      <Button onClick={handleRegister}>Register</Button>
    </Card>
  )
}

export default Register
