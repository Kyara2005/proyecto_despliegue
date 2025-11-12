import logo from '../assets/logo-vibe-u.webp'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Confirm = () => {
  const { token } = useParams()
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState(false)
  const [cargando, setCargando] = useState(true)

  const toastMostrado = useRef(false)

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/confirmar/${token}`
        const respuesta = await fetch(url)
        const data = await respuesta.json()

        if (!toastMostrado.current) {
          setMensaje('Gracias')
          setTimeout(() => {
            toast.success('Gracias por confirmar tu cuenta ✅', {
              position: 'top-right',
              autoClose: 3000,
              transition: Slide,
              style: {
                background: 'white',
                color: 'black',
                fontWeight: 'bold',
              },
              progressStyle: { background: 'green' },
            })
          }, 100)
          toastMostrado.current = true
        }
      } catch (error) {
        console.error('Error en confirmación:', error)
        if (!toastMostrado.current) {
          setMensaje('Gracias')
          setTimeout(() => {
            toast.info('Gracias por confirmar tu cuenta 😊', {
              position: 'top-right',
              autoClose: 3000,
              transition: Slide,
              style: {
                background: 'white',
                color: 'black',
                fontWeight: 'bold',
              },
              progressStyle: { background: 'green' },
            })
          }, 100)
          toastMostrado.current = true
        }
      } finally {
        setCargando(false)
      }
    }

    confirmarCuenta()
  }, [token])

  if (cargando) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '36px', fontWeight: 'bold', color: 'gray' }}>
          Verificando tu cuenta...
        </p>
      </div>
    )
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center overflow-hidden"
    >
      <ToastContainer position="top-right" transition={Slide} />

      {/* Imagen */}
      <img
        src={logo}
        alt="Confirmación"
        className="rounded-full border-4 border-gray-500 shadow-md object-cover overflow-hidden absolute"
        style={{
          width: '300px',
          height: '300px',
          top: '100%',
          left: '100%',
          transform: 'translate(185%, 25%)',
          borderRadius: '300px',
          border: '4px solid black',
          zIndex: 20,
        }}
      />

      {/* Texto y botón movibles manualmente */}
      <div
        style={{
          position: 'absolute',
          zIndex: 30,
          marginTop: '100px', // 🔹 Ajusta este valor para mover el bloque verticalmente
          marginLeft: '590px', // 🔹 Ajusta este valor para mover el bloque horizontalmente
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        <p
          style={{
            fontSize: '42px',
            fontWeight: 'bold',
            color: 'black',
          }}
        >
          {mensaje}
        </p>

        <p style={{ fontSize: '26px', color: 'black' }}>
          Ya puedes iniciar sesión
        </p>

        <Link
          to="/login"
          style={{
            background: 'linear-gradient(90deg, #8c01f7ff, #ad3bffff)',
            color: 'black',
            fontWeight: 'bold',
            fontSize: '25px',
            marginTop: '10px', // 🔹 Ajusta para mover el botón más abajo o arriba
            marginLeft: '25px', // 🔹 Ajusta para mover el botón horizontalmente respecto al bloque
            padding: '12px 0',
            width: '200px',
            textAlign: 'center',
            borderRadius: '20px',
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)'
          }}
        >
          Ir al Login
        </Link>
      </div>
    </div>
  )
}
