import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.jpg'
import useModal from '../hooks/useModal'
import Modal from '../components/common/Modal'
import { setCookie } from '../utils'

// Add interface for login response
interface LoginResponse {
    correo: string;
    token: string;
}

interface ErrorResponse {
    message: string;
    status?: number;
}

const Login: React.FC = () => {
    const [emailLocal, setEmailLocal] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const { isOpen, modalConfig, openModal, closeModal } = useModal()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        try {
            const response = await axios.post<LoginResponse>('/login', {
                usuario: emailLocal,
                contraseña: password
            })
            console.log('Response:', response.data)

            console.log('Token:', response.data.token)
            setCookie('auth_token', response.data.token)
            localStorage.setItem('userEmail', response.data.correo)
            console.log('Cookie set:', document.cookie)
            
            openModal({
                title: 'Éxito',
                message: 'Inicio de sesión exitoso',
                type: 'success'
            })
            
            setTimeout(() => {
                navigate("/home")
            }, 1000)
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>
            let errorMessage = 'Error al iniciar sesión'

            if (axiosError.response?.status === 401) {
                errorMessage = 'Credenciales incorrectas'
            } else if (axiosError.response?.data?.message) {
                errorMessage = axiosError.response.data.message
            }

            openModal({
                title: 'Error de autenticación',
                message: errorMessage,
                type: 'error'
            })
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <div className="flex justify-center mb-6">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-24 h-auto"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
                            Bienvenido 
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Contraseña
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-2 border border-[#CFD7E0] rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                        placeholder="Ingresa tu contraseña"
                                        required
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                            Recordar
                                        </label>
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
            <Modal 
                isOpen={isOpen}
                onClose={closeModal}
                title={modalConfig?.title || ''}
                message={modalConfig?.message || ''}
                type={modalConfig?.type || 'error'}
            />
        </>
    )
}

export default Login