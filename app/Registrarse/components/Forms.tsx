"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export const Forms = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_DATABASE_URL;

  // 📌 Manejo del formulario con tipado explícito
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden",
      });
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirm,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registro fallido");
      }

      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "¡Bienvenido! Tu cuenta ha sido creada.",
      });

      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");

      router.push("/Blog/create");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "No se pudo completar el registro";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    }
  };
    const showSessionExpired = useCallback(() => {
      Swal.fire({
        title: "Sesión expirada",
        text: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
        icon: "warning",
        confirmButtonText: "Ir al login",
        timer: 3000,
        showConfirmButton: true,
      }).then(() => {
        localStorage.removeItem("token");
        router.push("/Blog");
      });
    }, [router]);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        showSessionExpired();
        return;
      }
  
      fetch(`${url}/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Token inválido");
          return response.json();
        })
        .catch(() => showSessionExpired());
    }, [showSessionExpired]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Registrarse</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="••••••••" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required />
          </div>

          <div className="flex items-center justify-between">
            <Link href="/" className="p-2 flex gap-2 rounded-md text-pink-400 transition-all">
              <ArrowBigLeft /> Regresar
            </Link>
          </div>

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
            Crear Cuenta
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forms;
