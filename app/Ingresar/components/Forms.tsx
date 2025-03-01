"use client";

import { useState, useEffect } from "react";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export const Forms = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [networkError, setNetworkError] = useState<string>("");
  const router = useRouter();

  // 📌 Obtener el token CSRF al montar el componente (para sesiones stateful)
  useEffect(() => {
    fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
      method: "GET",
      credentials: "include", // Asegura que se envíen cookies
    });
  }, []);

  // 📌 Verificar si el usuario ya está autenticado y el token es válido
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://127.0.0.1:8000/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include", // Asegura que se envíen cookies
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 401 || response.status === 419) {
              // Token inválido o expirado
              localStorage.removeItem("token");
              showSessionExpired();
              return;
            }
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
          }
          return response.json();
        })
        .then(() => {
          router.push("/Blog/create");
        })
        .catch((error) => {
          console.error("Error al validar token:", error);
          if (error.name === "TypeError" && error.message.includes("NetworkError")) {
            setNetworkError("No se pudo conectar con el servidor. Verifica que Laravel esté corriendo en http://127.0.0.1:8000 y que CORS esté configurado correctamente.");
          }
        });
    }
  }, [router]);

  // 📌 Manejo del formulario de login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNetworkError(""); // Limpiar errores de red al intentar login

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include", // Asegura que se envíen cookies
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Credenciales incorrectas");
        } else if (response.status === 419) {
          throw new Error("Sesión expirada o CSRF inválido. Por favor, intenta de nuevo.");
        } else {
          throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }
      }

      const data = await response.json();

      // Guardar el token en localStorage
      localStorage.setItem("token", data.token);

      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso",
        text: "¡Bienvenido de nuevo!",
      });

      // Resetear formulario
      setEmail("");
      setPassword("");
      setRememberMe(false);

      // Redirigir al dashboard
      router.push("/Blog/create");
    } catch (error: any) {
      if (error.name === "TypeError" && error.message.includes("NetworkError")) {
        setNetworkError("No se pudo conectar con el servidor. Verifica que Laravel esté corriendo en http://127.0.0.1:8000 y que CORS esté configurado correctamente.");
        Swal.fire({
          icon: "error",
          title: "Error de red",
          text: "No se pudo conectar con el servidor. Por favor, verifica tu conexión o asegúrate de que Laravel esté activo.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "No se pudo iniciar sesión",
        });
      }
    }
  };

  // 📌 Mostrar notificación de sesión expirada y redirigir
  const showSessionExpired = () => {
    Swal.fire({
      title: "Sesión expirada",
      text: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
      icon: "warning",
      confirmButtonText: "Ir al login",
      timer: 3000, // Redirige automáticamente después de 3 segundos
      showConfirmButton: true,
    }).then(() => {
      router.push("/login");
    });
  };

  return (
    <>
      {/* component */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Ingresar</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            {networkError && (
              <p className="text-red-500 text-center">{networkError}</p>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-600">Recuérdame</span>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <Link href="/" className="p-2 flex gap-2 rounded-md text-pink-400 transition-all">
                <span>
                  <ArrowBigLeft />
                </span>{" "}
                Regresar
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forms;