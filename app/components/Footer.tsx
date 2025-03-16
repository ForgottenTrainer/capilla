import Image from "next/image"
import Link from "next/link"


const Footer = () => {
  return (
    <div className="px-5 lg:px-10">
      <footer className="bg-white rounded-lg shadow-sm m-4">
        <div className="w-full max-w-screen-xl mx-auto p-6 md:py-8">
          
          {/* Contenedor principal responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:justify-between items-center gap-6">
            
            {/* Logo + Nombre */}
            <Link href="/" className="flex items-center justify-center lg:justify-start space-x-3">
              <Image
                src="/logo.png"
                width={100}
                height={100}
                className="h-16 w-16"
                alt="Capilla Logo"
              />
              <span className="text-2xl font-semibold text-center sm:text-left">
                Capilla Divino Niño PDC
              </span>
            </Link>
            <br />
            {/* Menú de navegación */}
            <ul className="flex flex-wrap justify-center lg:justify-end items-center text-sm font-medium text-gray-500 gap-4 py-4">
              <li>
                <Link href="#horarios" className="hover:underline">
                  Horarios
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:underline">
                  Acerca de Nosotros
                </Link>
              </li>
              <li>
                <Link href="#servicios" className="hover:underline">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="#contactanos" className="hover:underline">
                  Contáctanos
                </Link>
              </li>
              <li>
                <Link href="/Blog" className="hover:underline">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Línea divisoria */}
          <hr className="my-6 border-gray-200" />

          {/* Texto de copyright */}
          <p className="text-sm text-gray-500 text-center">
            © 2025{" "}
            <Link href="/" className="hover:underline">
              Capilla Divino Niño PDC
            </Link>
          </p>
        </div>
      </footer>



    </div>
  )
}

export default Footer