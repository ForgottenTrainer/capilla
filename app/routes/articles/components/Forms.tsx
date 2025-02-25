import React from 'react'

const Forms = () => {
  return (
    <div>
        <div className="bg-white shadow-lg rounded-xl p-8 border border-blue-200 relative overflow-hidden">
                {/* Sombra animada en la parte superior */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/9 w-40 h-40 bg-pink-300 blur-3xl opacity-50 animate-pulse"></div>
    
                    <section>
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-indigo-500">
                        Crear un Post
                    </h2>
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">
                        El campo subtitulo e imagen son opcionales
                    </p>
        
                    <form action="#" className="space-y-8">
                        {/* Campo de Correo */}
                        <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                            Titulo
                        </label>
                        <input
                            type="text"
                            id="titulo"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5"
                            placeholder="Titulo"
                            required
                        />
                        </div>
        
                        {/* Campo de Teléfono */}
                        <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
                            Subtitulo <span className="text-sm">Opcional</span>
                        </label>
                        <input
                            type="text"
                            id="subtitulo"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5"
                            placeholder="9xx-xxx-xxxx"
                            required
                        />
                        </div>

        
                        {/* Campo de Mensaje */}
                        <div className="sm:col-span-2">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
                            Post
                        </label>
                        <textarea
                            id="message"
                            rows={6}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-blue-400 focus:border-blue-400"
                            placeholder="Dejar Mensaje"
                        />
                        </div>
        
                        {/* Botón de Enviar */}
                        <>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="file_input"
                            >
                                Subir imagen
                            </label>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2"
                                aria-describedby="file_input_help"
                                id="file_input"
                                type="file"
                            />
                            <p
                                className="mt-1 text-sm text-gray-500 "
                                id="file_input_help"
                            >
                                SVG, PNG, JPG or GIF (MAX. 800x400px).
                            </p>
                        </>

                        <div className="flex justify-start">


                        <button
                            type="submit"
                            className="relative flex items-start gap-2 py-3 px-5 bg-blue-500 transition-all hover:bg-blue-600 text-white text-sm font-medium rounded-lg shadow-lg focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                            {/* Destello en el botón */}
                            <span className="absolute -inset-0.5 bg-blue-300 opacity-20 blur-md"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                            </svg>

                            Subir Post
                        </button>
                        </div>
                    </form>
                    </section>
                </div>
    </div>
  )
}

export default Forms