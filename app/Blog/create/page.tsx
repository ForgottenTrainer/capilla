"use client";
/* eslint-disable */


import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/app/components/Navbar";
import Swal from "sweetalert2";
import Link from "next/link";

type Post = {
  id: number;
  titulo: string;
  subtitulo?: string;
  mensaje: string;
};

export default function CreatePost() {
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [mensaje, setMensaje] = useState("");
  //const [imagen, setImagen] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const showSessionExpired = useCallback(() => {
    Swal.fire({
      title: "Sesión expirada",
      text: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
      icon: "warning",
      confirmButtonText: "Ir al login",
      timer: 3000,
      showConfirmButton: true,
    }).then(() => {
      router.push("/Blog");
    });
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      showSessionExpired();
      return;
    }

    fetch("http://127.0.0.1:8000/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Token inválido");
        }
        return response.json();
      })
      .catch(() => {
        localStorage.removeItem("token");
        showSessionExpired();
      });
  }, [showSessionExpired]);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      showSessionExpired();
      return;
    }

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            if (response.status === 401) {
              localStorage.removeItem("token");
              showSessionExpired();
              return;
            }
            throw new Error("Error al eliminar el post");
          }

          setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));

          Swal.fire("Eliminado", "El post ha sido eliminado.", "success");
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar el post.", "error");
        }
      }
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchPosts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token");
            showSessionExpired();
            return;
          }
          throw new Error("Error al cargar los posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch {
        setError("No se pudieron cargar los posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [showSessionExpired]);

  return (
    <>
      <Navbar />
      <div className="px-5 lg:px-10 py-5 grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="max-w-3xl p-5 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-indigo-600 mb-5">Crear Post</h1>

          {error && <p className="text-red-500">{error}</p>}

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Título</label>
              <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Subtítulo (opcional)</label>
              <input type="text" value={subtitulo} onChange={(e) => setSubtitulo(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mensaje</label>
              <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
          </form>
        </div>
        <div className="col-span-2">
          <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
          <table className="w-full text-left table-auto min-w-max">
                <thead>
                  <tr>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm font-normal leading-none text-blue-gray-900 opacity-70">
                        Título
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm font-normal leading-none text-blue-gray-900 opacity-70">
                        Subtítulo
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm font-normal leading-none text-blue-gray-900 opacity-70">
                        Mensaje
                      </p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                      <p className="block font-sans text-sm font-normal leading-none text-blue-gray-900 opacity-70">
                        Acciones
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-gray-500">
                        Cargando posts...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-red-500">
                        {error}
                      </td>
                    </tr>
                  ) : posts.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-gray-500">
                        No hay posts disponibles.
                      </td>
                    </tr>
                  ) : (
                    posts.map((post) => (
                      <tr key={post.id}>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block font-sans text-sm font-normal leading-normal text-blue-gray-900">
                            {post.titulo}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block font-sans text-sm font-normal leading-normal text-blue-gray-900">
                            {post.subtitulo || "Sin subtítulo"}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <p className="block font-sans text-sm font-normal leading-normal text-blue-gray-900">
                            {post.mensaje.length > 50
                              ? post.mensaje.substring(0, 50) + "..."
                              : post.mensaje}
                          </p>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50 flex gap-4">
                          <Link
                            href={`/Blog/update/${post.id}`}
                            className="text-indigo-400 block font-sans text-sm font-medium leading-normal"
                          >
                            Editar
                          </Link>
                          <button
                            className="text-red-400 block font-sans text-sm font-medium leading-normal"
                            onClick={() => handleDelete(post.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
          </div>
        </div>
      </div>
    </>
  );
}
