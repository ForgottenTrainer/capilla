import Link from "next/link"

const About = () => {
  return (
    <div className="pl-5 pr-5 lg:pl-10 lg:pr-10" id="about">

        <div className="grid grid-cols-1 lg:grid-cols-2 py-20">
            <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
                <h3 className="text-4xl lg:text-6xl text-indigo-500 font-bold">
                    Acerca de Nosotros
                </h3>
                <p className="text-lg text-slate-800 font-normal py-5 w-full max-w-[40em]">
                    En la Capilla Divino Niño, creemos en el amor, la fe y la esperanza como pilares fundamentales para acercarnos a Dios. Nuestra comunidad está dedicada a ofrecer un espacio de paz y reflexión para todos aquellos que buscan fortalecer su relación con Cristo.
                </p>
                <Link
                    href="/#contactanos"
                    className="p-3 bg-pink-400 rounded-md text-white shadow-sm transition-all hover:bg-pink-500"
                >
                    Únete al apostolado
                </Link>
            </div>
            <div className="">
                <div className="rounded-md mt-5 p-3 border border-slate-200 bg-slate-100">
                    <img src="./capilla.jpg" className="rounded-md shadow-md lg:h-[30em] lg:w-[70em]" alt="Capilla" />
                </div>
            </div>
        </div>

    </div>
  )
}

export default About