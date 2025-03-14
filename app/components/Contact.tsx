"use client";

import Image from "next/image";
import { useState } from "react";
import Swal from "sweetalert2";

const Contact = () => {
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [networkError, setNetworkError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNetworkError("");
  
    try {
      // 🔹 Obtener el token CSRF antes de enviar el formulario
      await fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include",
      });
  
      // 🔹 Enviar los datos del formulario
      const response = await fetch("http://127.0.0.1:8000/api/correo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          correo,
          telefono,
          asunto,
          mensaje,
        }),
        credentials: "include",
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la solicitud");
      }
  
      Swal.fire({
        icon: "success",
        title: "Correo enviado",
        text: "Pronto recibirás tu respuesta",
      });
  
      setCorreo("");
      setTelefono("");
      setAsunto("");
      setMensaje("");
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";
      console.error("Error en la solicitud:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    }
  };
  
  return (
    <div className="relative pl-5 pr-5 lg:pl-10 lg:pr-10 overflow-hidden py-2" id="contactanos">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-transparent blur-3xl opacity-50 pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative z-10">
        <div className="flex justify-center mt-10">
          <Image className="max-w-xs lg:max-w-md" src="/divino.png" alt="Divino Niño" width={1000} height={1000}/>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-8 border border-blue-200 relative overflow-hidden">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-indigo-500">Contáctanos</h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">
            Envíanos un mensaje dejando tu correo y número de teléfono.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {networkError && <p className="text-red-500 text-center">{networkError}</p>}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Correo Electrónico</label>
              <input type="email" id="email" value={correo} onChange={(e) => setCorreo(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5" placeholder="hola@gmail.com" required />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Número de Teléfono</label>
              <input type="tel" id="phone" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5" placeholder="9xx-xxx-xxxx" required />
            </div>

            <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">Asunto</label>
              <input type="text" id="subject" value={asunto} onChange={(e) => setAsunto(e.target.value)} className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-400 focus:border-blue-400" placeholder="Déjanos saber en qué te podemos ayudar" required />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Mensaje</label>
              <textarea id="message" rows={6} value={mensaje} onChange={(e) => setMensaje(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-blue-400 focus:border-blue-400" placeholder="Dejar Mensaje" required />
            </div>

            <div className="flex justify-start">
              <button type="submit" className="relative flex items-start gap-2 py-3 px-5 bg-blue-500 transition-all hover:bg-blue-600 text-white text-sm font-medium rounded-lg shadow-lg focus:ring-4 focus:outline-none focus:ring-blue-300">
                <span className="absolute -inset-0.5 bg-blue-300 opacity-20 blur-md"></span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
                Enviar Mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Contact;
