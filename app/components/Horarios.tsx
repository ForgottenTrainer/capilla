

const Horarios = () => {
    const horarios = [
        {
            evento: 'Misa',
            dia: 'Domingo',
            horario: '7:00 PM - 8:00 PM',
            imagen: 'https://images.unsplash.com/photo-1499097505928-42fd92ac09f1?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            evento: 'Confesiones',
            dia: 'Domingo',
            horario: '7:00 PM - 8:00 PM',
            imagen: 'https://images.unsplash.com/photo-1549485455-ce6f0a9da36d?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

        },
        {
            evento: 'Llama de amor',
            dia: 'Miercoles',
            horario: '5:00 PM - 6:30 PM',
            imagen: 'https://i.pinimg.com/550x/d3/2c/86/d32c8628c6d094c82fb668bc67e28936.jpg'

        },
        {
            evento: 'Hora Santa',
            dia: 'Jueves',
            horario: '6:00 PM - 7:00 PM',
            imagen: 'https://images.unsplash.com/photo-1687459730891-47dfa3217811?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvcmElMjBzYW50YXxlbnwwfHwwfHx8MA%3D%3D'
        },

        {
            evento: 'Catequesis',
            dia: 'Sabado',
            horario: '10:00 AM - 12:30 PM',
            imagen: 'https://parroquiasanjosecoruna.com/wp-content/uploads/2019/09/catequesis.jpg?w=640'
        },
        
        
    ]
  return (
    <div className="pr-5 pl-5 lg:pr-10 lg:pl-10 py-5 ">
        <h1 className="text-center text-5xl lg:text-7xl mb-20 font-bold text-indigo-500">
            Horarios
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-4 mx-auto">
            {horarios.map((misa, index) => (
            <div key={index} className="max-w-sm rounded-lg overflow-hidden shadow-lg  bg-white">
                <img className="w-full h-56 object-cover" src={misa.imagen} alt={misa.dia} />
                <div className="px-6 py-4">
                <h2 className="font-bold text-2xl text-gray-800 mb-2">{misa.evento}</h2>
                <p className="text-xl text-gray-800 mb-2 font-semibold">{misa.dia}</p>
                <p className="text-gray-600 text-lg">{misa.horario}</p>
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default Horarios