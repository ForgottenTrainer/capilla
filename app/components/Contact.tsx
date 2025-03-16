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
            Buscanos en la capilla.
          </p>

          <div className="">
            {/* 
            <div className="p-1 flex gap-4 bg-indigo-100 rounded-md border border-indigo-300 justify-center items-center">
              <span className="bg-indigo-500 rounded-md p-1 text-white">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              <p className="text-pink-600">yadi.nutri90@gmail.com</p>
            </div>
            */}
            <br />
            <div className="p-2 bg-indigo-100 rounded-md border border-indigo-300 justify-center items-center w-full">
              <h5 className="text-center text-2xl lg:text-4xl font-bold text-pink-500">Ubicación</h5>
                <div className="flex justify-center items-center py-5">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.052677359889!2d-87.05992685029622!3d20.66743577669119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f4e5d53d27991f5%3A0xcd207815fe15f01a!2sCapilla%20Divino%20Ni%C3%B1o%20Jes%C3%BAs!5e0!3m2!1ses!2smx!4v1742075694133!5m2!1ses!2smx"
                    width="600"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Contact;
