"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/app/components/Navbar";
import Swal from "sweetalert2";

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
  const [imagen, setImagen] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 📌 Verificar autenticación y manejar token expirado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      showSessionExpired();
      return;
    }

    // Validar token con el endpoint /api/user
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
      .catch((error) => {
        localStorage.removeItem("token");
        showSessionExpired();
      });
  }, [router]);

  // 📌 Mostrar notificación de sesión expirada y redirigir
  const showSessionExpired = () => {
    Swal.fire({
      title: "Sesión expirada",
      text: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
      icon: "warning",
      confirmButtonText: "Ir al login",
      timer: 3000, // Redirige automáticamente después de 3 segundos
      showConfirmButton: true,
    }).then(() => {
      router.push("/Blog");
    });
  };

  // 📌 Cargar posts al montar el componente (solo si está autenticado)
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
          if (response.status === 401) { // Token inválido o expirado
            localStorage.removeItem("token");
            showSessionExpired();
            return;
          }
          throw new Error("Error al cargar los posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError("No se pudieron cargar los posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 📌 Manejar la creación del post
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      showSessionExpired();
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("subtitulo", subtitulo);
    formData.append("mensaje", mensaje);
    if (imagen) formData.append("imagen", imagen);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          showSessionExpired();
          return;
        }
        throw new Error("Error al crear el post");
      }

      Swal.fire({
        title: "Post creado",
        text: "El post se ha publicado correctamente",
        icon: "success",
        confirmButtonText: "OK",
      });

      setTitulo("");
      setSubtitulo("");
      setMensaje("");
      setImagen(null);

      setTimeout(() => {
        router.push("/Blog");
      }, 2000);
    } catch (err) {
      setError("Hubo un problema al crear el post.");
    }
  };

  // 📌 Manejar la eliminación del post
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

  // 📌 Si está cargando o redirigiendo, mostrar un placeholder
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="px-5 lg:px-10 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <div className="max-w-3xl p-5 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-indigo-600 mb-5">Crear Post</h1>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Título
                </label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subtítulo (opcional)
                </label>
                <input
                  type="text"
                  value={subtitulo}
                  onChange={(e) => setSubtitulo(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mensaje
                </label>
                <textarea
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Imagen (opcional)
                </label>
                <input
                  type="file"
                  onChange={(e) => setImagen(e.target.files?.[0] || null)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  accept="image/*"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition-all"
              >
                Crear Post
              </button>
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
                          <a
                            href={`/Blog/update/${post.id}`}
                            className="text-indigo-400 block font-sans text-sm font-medium leading-normal"
                          >
                            Editar
                          </a>
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
      </div>
    </>
  );
}