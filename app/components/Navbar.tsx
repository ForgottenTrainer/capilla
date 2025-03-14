"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const router = useRouter();

  // 📌 Verificar autenticación y obtener el nombre del usuario
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Hacer solicitud a un endpoint protegido para obtener los datos del usuario
      fetch("http://127.0.0.1:8000/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Token inválido");
          }
          return response.json();
        })
        .then((data) => {
          setIsAuthenticated(true);
          setUserName(data.name); // Asumimos que la API devuelve un campo "name"
        })
        .catch(() => {
          localStorage.removeItem("token"); // Limpiar token inválido
          setIsAuthenticated(false);
          setUserName("");
        });
    } else {
      setIsAuthenticated(false);
      setUserName("");
    }
  }, []);

  // 📌 Función para toggle del menú móvil
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // 📌 Función para cerrar sesión
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await fetch("http://127.0.0.1:8000/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    }
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserName("");
    router.push("/Blog");
  };

  return (
    <>
      <div className="flex px-5 bg-white/40 shadow-sm items-center justify-between text-blue-gray-900">
        <Link
          href="/"
          className="block antialiased font-sans text-base leading-relaxed text-inherit mr-4 cursor-pointer py-1.5 font-medium"
        >
          <Image
            className="w-[5em] mx-auto h-auto object-contain"
            src="/logo.png"
            alt="Divino Niño"
            width={1000} height={1000}
          />
        </Link>
        <div className="flex items-center gap-4">
          {/* Menú para pantallas grandes */}
          <div className="mr-4 hidden lg:block">
            <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              <li className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 p-1 font-normal">
                <Link href="/" className="flex items-center">
                  Inicio
                </Link>
              </li>
              <li className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 p-1 font-normal">
                <Link href="/#horarios" className="flex items-center">
                  Horarios
                </Link>
              </li>
              <li className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 p-1 font-normal">
                <Link href="/#about" className="flex items-center">
                  Acerca de nosotros
                </Link>
              </li>
              <li className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 p-1 font-normal">
                <Link href="/#servicios" className="flex items-center">
                  Servicios
                </Link>
              </li>
              <li className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 p-1 font-normal">
                <Link href="/#contactanos" className="flex items-center">
                  Contactanos
                </Link>
              </li>
            </ul>
          </div>
          {/* Botones para pantallas grandes */}
          <div className="flex items-center gap-x-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm font-medium text-gray-900 hidden lg:inline-block">
                  Hola, {userName}
                </span>
                <button
                  onClick={handleLogout}
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg bg-gradient-to-tr from-red-900 to-red-800 text-white shadow-md shadow-red-900/10 hover:shadow-lg hover:shadow-red-900/20 active:opacity-[0.85] hidden lg:inline-block"
                >
                  <span>Cerrar Sesión</span>
                </button>
              </>
            ) : (
              <>

              </>
            )}
            <Link
              href="/Blog"
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg bg-gradient-to-tr from-indigo-600 to-pink-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] hidden lg:inline-block"
            >
              <span>Blog</span>
            </Link>
          </div>
          {/* Botón hamburguesa para móviles */}
          <button
            className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none max-w-[40px] max-h-[40px] rounded-lg text-xs ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            type="button"
            onClick={toggleMobileMenu}
          >
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={`w-full basis-full overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "h-auto opacity-100" : "h-0 opacity-0"
        }`}
      >
        <ul className="mt-2 mb-4 flex flex-col gap-2 p-4">
          <li className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 p-1 font-normal">
            <Link href="/" className="flex items-center">
              Inicio
            </Link>
          </li>
          <li className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 p-1 font-normal">
            <Link href="/#horarios" className="flex items-center">
              Horarios
            </Link>
          </li>
          <li className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 p-1 font-normal">
            <Link href="/#about" className="flex items-center">
              Acerca de nosotros
            </Link>
          </li>
          <li className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 p-1 font-normal">
            <Link href="/#servicios" className="flex items-center">
              Servicios
            </Link>
          </li>
          <li className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 p-1 font-normal">
            <Link href="/#contactanos" className="flex items-center">
              Contactanos
            </Link>
          </li>
        </ul>
        <div className="flex flex-col items-center gap-2 p-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm font-medium text-gray-900">
                Hola, {userName}
              </span>
              <button
                onClick={handleLogout}
                className="w-full align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg bg-gradient-to-tr from-red-900 to-red-800 text-white shadow-md shadow-red-900/10 hover:shadow-lg hover:shadow-red-900/20 active:opacity-[0.85]"
              >
                <span>Cerrar Sesión</span>
              </button>
            </>
          ) : (
            <>
              
            </>
          )}
          <Link
            href="/Blog"
            className="w-full align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85]"
          >
            <span>Blog</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;