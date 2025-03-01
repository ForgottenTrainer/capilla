import Link from "next/link"


const Services = () => {
  return (
    <div className="pr-5 pl-5 lg:pr-10 lg:pl-10" id="servicios">
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
            <p className="mx-auto mt-2 max-w-lg text-center text-4xl text-indigo-500 font-semibold tracking-tight text-balance sm:text-5xl">
                Servicios Divino Niño
            </p>
            <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
                <div className="relative lg:row-span-2">
                <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                    <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                    <p className="mt-2 text-xl font-medium tracking-tight text-pink-500 max-lg:text-center">
                        Catequesis
                    </p>
                    <p className="mt-2 mb-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    La catequesis es una educación en la fe de los niños, de los jóvenes y adultos, que comprende especialmente una enseñanza de la doctrina cristiana, dada generalmente de modo orgánico y sistemático con miras a iniciarlos en la plenitud de la vida cristiana.
                    </p>
                    </div>
                    
                    <div className="pr-5 pl-5 lg:pr-10 lg:pl-10">
                        <p className="text-xl font-medium tracking-tight text-indigo-500 mt-5">
                            Curso de Catequesis
                        </p>

                        <div className="mt-2 mb-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                            <ul>
                                <li className="my-2">
                                    Checar las inscripciones para el catecismo en la oficina de la capilla y/o algun catequista.
                                </li>
                                <hr />
                                <li className="my-2">
                                    Los costos se pregunta con algun catequista
                                </li>
                                
                                <hr />
                            </ul>
                        </div>
                        <div className="mt-10 mb-10 w-full">
                            <Link href="/#contactanos" className="p-2 rounded-md bg-pink-400 text-white transition-all hover:bg-pink-500">
                                Inscribete
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]"></div>
                </div>
                <div className="relative max-lg:row-start-1">
                <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                    <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <p className="mt-2 text-lg font-medium tracking-tight text-pink-500 max-lg:text-center">Llama de amor</p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    El Rosario de la Llama de Amor es una forma de rezar en honor a la Virgen María. El Movimiento de la Llama de Amor es una asociación de fieles que promueve la oración y la acción apostólica.
                    </p>
                    </div>

                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem]"></div>
                </div>
                <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                <div className="absolute inset-px rounded-lg bg-white"></div>
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                    <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                    <p className="mt-2 text-lg font-medium tracking-tight text-pink-500 max-lg:text-center">La Santa Misa</p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Ceremonia en que el sacerdote ofrece a Dios el sacrificio del cuerpo y sangre de Jesucristo bajo las especies de pan y vino                    </p>
                    </div>

                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5"></div>
                </div>
                <div className="relative lg:row-span-2">
                <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                    <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                    <p className="mt-2 text-lg font-medium tracking-tight text-pink-500 max-lg:text-center">
                        Hora Santa
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    La Hora Santa (en latín: hora sancta) es la práctica devocional católica de pasar una hora en adoración eucarística en presencia del Santísimo Sacramento.
                    </p>
                    </div>

                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Services

