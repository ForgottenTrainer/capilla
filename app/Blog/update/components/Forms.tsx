"use client";
/* eslint-disable */


import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";
import { Navbar } from "@/app/components/Navbar";
const url = process.env.NEXT_PUBLIC_DATABASE_URL;
type Post = {
  id: number;
  titulo: string;
  subtitulo?: string;
  mensaje: string;
};

export default function EditPost() {
  const router = useRouter();
  const { id } = useParams(); // Obtiene el ID desde la URL
  const [post, setPost] = useState<Post | null>(null);
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(true);

  // Cargar datos del post para edición
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${url}/api/posts/${id}`);
        if (!response.ok) throw new Error("Error al obtener el post");

        const data = await response.json();
        setPost(data);
        setTitulo(data.titulo);
        setSubtitulo(data.subtitulo || "");
        setMensaje(data.mensaje);
      } catch (error) {
        Swal.fire("Error", "No se pudo cargar el post", "error");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  // Enviar la actualización
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedPost = { titulo, subtitulo, mensaje };

    try {
      const response = await fetch(`${url}/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });

      if (!response.ok) throw new Error("Error al actualizar el post");

      Swal.fire("Actualizado", "El post fue actualizado con éxito", "success");

      setTimeout(() => {
        router.push("/Blog"); // Redirige a la lista de posts
      }, 2000);
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el post", "error");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Cargando post...</p>;

  return (
    <>
      <Navbar />
      <div className="px-5 lg:px-10 py-5">
        <div className="max-w-3xl mx-auto p-5 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-indigo-600 mb-5">Editar Post</h1>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Título</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Subtítulo (opcional)</label>
              <input
                type="text"
                value={subtitulo}
                onChange={(e) => setSubtitulo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mensaje</label>
              <textarea
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition-all"
            >
              Actualizar Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
}