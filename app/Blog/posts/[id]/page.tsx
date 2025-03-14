"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/app/components/Navbar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// 📌 Tipo de Post
type Post = {
  id: number;
  titulo: string;
  subtitulo?: string;
  mensaje: string;
  created_at: string;
};

// 📌 Obtener los datos del post en Cliente
async function fetchPost(id: string): Promise<Post | null> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
      cache: "no-store",
    });
    if (!response.ok) return null;
    return response.json();
  } catch (err) {
    console.error("Error obteniendo post:", err);
    return null;
  }
}

// 📌 Actualizar post
async function updatePost(id: string, postData: Partial<Post>): Promise<boolean> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    
    return response.ok;
  } catch (err) {
    console.error("Error actualizando post:", err);
    return false;
  }
}

export default function UpdatePostPage() {
  const { id } = useParams(); // Obtener ID dinámico
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Post>>({
    titulo: "",
    subtitulo: "",
    mensaje: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 📌 Cargar datos en Cliente
  useEffect(() => {
    if (!id) return;
    
    async function getData() {
      try {
        const fetchedPost = await fetchPost(id as string);
        if (!fetchedPost) {
          router.push("/404"); // Redirigir si no encuentra el post
        } else {
          setFormData({
            titulo: fetchedPost.titulo,
            subtitulo: fetchedPost.subtitulo || "",
            mensaje: fetchedPost.mensaje,
          });
        }
        setLoading(false);
      } catch {
        setLoading(false);
        setErrorMessage("Error al cargar el post");
      }
    }
    
    getData();
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);
    
    try {
      const success = await updatePost(id as string, formData);
      
      if (success) {
        router.push(`/Blog/${id}`);
      } else {
        setErrorMessage("Error al actualizar el post");
      }
    } catch {
      setErrorMessage("Error al procesar la solicitud");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center text-lg text-gray-500">Cargando post...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Botón de regreso */}
        <Link href={`/Blog/${id}`} className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition duration-200">
          <ArrowLeft size={18} className="mr-2" />
          Volver al post
        </Link>
        
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-indigo-600 mb-6">Actualizar Post</h1>
            
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {errorMessage}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="titulo" className="block text-gray-700 font-medium mb-2">
                  Título
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="subtitulo" className="block text-gray-700 font-medium mb-2">
                  Subtítulo (opcional)
                </label>
                <input
                  type="text"
                  id="subtitulo"
                  name="subtitulo"
                  value={formData.subtitulo}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="mensaje" className="block text-gray-700 font-medium mb-2">
                  Contenido
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={10}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? "Guardando..." : "Guardar cambios"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}