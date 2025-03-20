import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import Cookies from "js-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMessage } from "../hooks/useMessage";
import { MessageType } from "../types/Message";

const Login: React.FC = () => {
  const [emailLocal, setEmailLocal] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { showMessage } = useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/investigaciones");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/login",
        {
          usuario: emailLocal,
          clave: password,
        },
        {
          withCredentials: true,
        }
      );
      Cookies.set("token", response.data.token, { sameSite: "Strict" });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userRole", String(response.data.data.nivel)); 
      console.log("Nivel almacenado en localStorage:", response.data.data.nivel); 
      navigate("/investigaciones");
    } catch (error: any) {
      const message =
        error?.response?.status === 401
          ? "Credenciales incorrectas"
          : error?.response?.data?.message ||
            error.message ||
            "Error en el login";
      showMessage({
        type: MessageType.ERROR,
        title: "Error de autenticación",
        content: message,
      });
      console.error("Error en el login:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="w-24 h-auto" />
          </div>
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
            Bienvenido
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Usuario
                </label>
                <input
                  id="email"
                  type="text"
                  value={emailLocal}
                  onChange={(e) => setEmailLocal(e.target.value)}
                  className="w-full px-4 py-2 border border-[#CFD7E0] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Usuario"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-[#CFD7E0] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors pr-10"
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
