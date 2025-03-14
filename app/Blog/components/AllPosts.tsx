import { Navbar } from "@/app/components/Navbar";
import Image from "next/image";
import Link from "next/link";

// Si `Post` no está definido en otro lugar, agrégalo aquí
type Post = {
    id: number;
    titulo: string;
    subtitulo?: string;
    mensaje: string;
    created_at: string;
    imagen: string;
  };
  
  export default function AllPosts({ posts }: { posts: Post[] }) {
    // 📌 Ordenar los posts por fecha de creación (más recientes primero)
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  
    return (
      <div>
        <Navbar />
        <div className="pl-5 pr-5 lg:pr-10 lg:pl-10 my-5">
          <h1 className="text-center text-3xl lg:text-5xl text-indigo-500 font-bold my-3">
            Blog Divino Niño
          </h1>
          <hr />
  
          {/* Renderizando los posts desde Laravel */}
          {sortedPosts.length > 0 ? (
            sortedPosts.map((post) => (
              <div key={post.id} className="max-w-5xl mx-auto my-3">
                <h3 className="text-3xl font-semibold text-pink-400 mb-7 mt-4">
                  {post.titulo}
                </h3>
                {post.subtitulo && (
                  <h4 className="text-xl font-medium text-gray-600 mb-3">
                    {post.subtitulo}
                  </h4>
                )}
                <p className="text-md text-slate-800 font-extralight">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
                <p className="text-lg text-slate-800 text-light">
                  {post.mensaje.length > 100
                    ? post.mensaje.substring(0, 100) + "..."
                    : post.mensaje}
                </p>
                {post.imagen && (
                  <Image
                    src={post.imagen}
                    alt={post.titulo}
                    className="my-4 w-full max-h-96 object-cover rounded-md"
                  />
                )}
                <br />
                <Link
                  href={`/Blog/posts/${post.id}`}
                  className="p-2 rounded-md bg-indigo-400 transition-all hover:bg-indigo-500 text-white font-semibold"
                >
                  Ver artículo
                </Link>
                <hr className="my-5" />
              </div>
            ))
          ) : (
            <p className="text-center text-lg text-gray-500 mt-10">
              No hay posts disponibles
            </p>
          )}
        </div>
      </div>
    );
  }
  