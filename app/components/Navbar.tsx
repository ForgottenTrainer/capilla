
export const Navbar = () => {
  return (
    <>
        <div className="flex px-5 bg-white/40 shadow-sm items-center justify-between text-blue-gray-900">
            <a
            href="/"
            className="block antialiased font-sans text-base leading-relaxed text-inherit mr-4 cursor-pointer py-1.5 font-medium"
            >
            <img className="w-[5em] mx-auto h-auto object-contain" src="/logo.png" alt="Divino Niño" />

            </a>
            <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">
                <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                <li className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 p-1 font-normal">
                    <a href="/" className="flex items-center">
                    Inicio
                    </a>
                </li>
                <li className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 p-1 font-normal">
                    <a href="#horarios" className="flex items-center">
                    Horarios
                    </a>
                </li>
                <li className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 p-1 font-normal">
                    <a href="#about" className="flex items-center">
                    Acerca de nosotros
                    </a>
                </li>
                <li className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 p-1 font-normal">
                    <a href="#servicios" className="flex items-center">
                        Servicios
                    </a>
                </li>
                <li className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 p-1 font-normal">
                    <a href="#contactanos" className="flex items-center">
                        Contactanos
                    </a>
                </li>
                </ul>
            </div>
            <div className="flex items-center gap-x-1">
                
                <a
                href="/blog"
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] hidden lg:inline-block"
                type="button"
                >
                <span>Blog</span>
                </a>
            </div>
            <button
                className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none max-w-[40px] max-h-[40px] rounded-lg text-xs ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                type="button"
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
        <div
            className="block w-full basis-full overflow-hidden"
            style={{ height: 0, opacity: 0 }}
        >
            <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 p-1 font-normal">
                <a href="#" className="flex items-center">
                Pages
                </a>
            </li>
            <li className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 p-1 font-normal">
                <a href="#" className="flex items-center">
                Account
                </a>
            </li>
            <li className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 p-1 font-normal">
                <a href="#" className="flex items-center">
                Blocks
                </a>
            </li>
            <li className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 p-1 font-normal">
                <a href="#" className="flex items-center">
                Docs
                </a>
            </li>
            </ul>
            <div className="flex items-center gap-x-1">
            <button
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] block w-full"
                type="button"
            >
                <span>Blog</span>
            </button>
            </div>
        </div>
    </>

  )
}
