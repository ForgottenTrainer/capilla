import Image from "next/image"
import Link from "next/link"


const Footer = () => {
  return (
    <div className="px-5 lg:px-10">
        <footer className="bg-white rounded-lg shadow-sm m-4">
          <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <Link
                href="/"
                className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
              >
                <Image
                  src="/logo.png"
                  width={1000} 
                  height={1000}
                  className="h-[5em] w-[5em]"
                  alt="Capilla Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap ">
                  Capilla Divino Niño PDC
                </span>
              </Link>
              <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
                <li>
                  <Link href="#horarios" className="hover:underline me-4 md:me-6">
                    Horarios
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="hover:underline me-4 md:me-6">
                    Acerca de Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#servicos" className="hover:underline me-4 md:me-6">
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link href="#contactanos" className="hover:underline">
                    Contactanos
                  </Link>
                </li>
                <li className="pl-4">
                  <Link href="/Blog" className="bg-indigo-500 text-white p-2 px-3 rounded-md transition-all hover:bg-indigo-600">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center ">
              © 2025{" "}
              <Link href="/" className="hover:underline">
                Capilla Divino Niño PDC
              </Link>
            </span>
          </div>
        </footer>

    </div>
  )
}

export default Footer