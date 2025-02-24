import { Navbar } from "./Navbar";

export const Header = () => {
  return (
    <div className="bg-gradient-to-r from-pink-100 to-blue-100 min-h-screen">
      <Navbar />

      <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-screen px-6 lg:px-20">
        {/* Sección de Texto */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <p className="text-lg gap-2 flex font-semibold mb-4 text-slate-800 mt-5 lg:mt-0">
            <span className="text-indigo-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>

            </span> Cristo te esta esperando
          </p>
          <h1 className="text-6xl lg:text-8xl text-center font-bold mb-6">
            Capilla Divino Niño
          </h1>
          <p className="text-gray-700 text-center text-lg font-semibold mb-8">
            Un lugar de Fe y Esperanza en Honor al Divino Niño
          </p>

          {/* Botones */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-sm">
            <button className="p-[3px] relative w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"></div>
              <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                Eventos
              </div>
            </button>
            <button className="px-8 py-2 w-full bg-white/40 text-sm rounded-md font-semibold hover:shadow-lg">
              Horarios
            </button>
          </div>
        </div>

        {/* Imagen Centrada */}
        <div className="flex justify-center mt-10 ">
          <img className="max-w-xs lg:max-w-md" src="/divino.png" alt="Divino Niño" />
        </div>
      </div>
      <div className="inset-x-0 bottom-0 h-60 bg-gradient-to-t from-white via-white to-transparent"></div>
    </div>
  );
};

