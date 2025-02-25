import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import { Navbar } from "~/components/Navbar";

interface Post {
  id: number;
  titulo: string;
  subtitulo?: string;
  mensaje: string;
  imagen?: string;
  created_at: string;
}

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/posts") 
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error cargando los posts:", error));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="pl-5 pr-5 lg:pr-10 lg:pl-10 my-5">
        <h1 className="text-center text-3xl lg:text-5xl text-indigo-500 font-bold my-3">
          Blog Divino Niño
        </h1>
        <hr />

        {/* Renderizando los posts desde Laravel */}
        {posts.length > 0 ? (
          posts.map((post) => (
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
              <p className="text-lg text-slate-800 text-light">{post.mensaje}</p>
              {post.imagen && (
                <img src={post.imagen} alt={post.titulo} className="my-4 w-full max-h-96 object-cover rounded-md" />
              )}
              <br />
              <Link to={`/post/${post.id}`} className="p-2 rounded-md bg-indigo-400 transition-all hover:bg-indigo-500 text-white font-semibold">
                Ver artículo
              </Link>
              <hr className="my-5" />
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-500 mt-10">No hay posts disponibles</p>
        )}
      </div>
    </div>
  );
};

export default Index;
