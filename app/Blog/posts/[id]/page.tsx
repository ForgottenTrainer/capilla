"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/app/components/Navbar";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
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
  } catch (error) {
    console.error("Error obteniendo post:", error);
    return null;
  }
}

// 📌 Formatear Fecha
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("es-ES", options);
}

export default function PostPage() {
  const { id } = useParams(); // Obtener ID dinámico
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  // 📌 Cargar datos en Cliente
  useEffect(() => {
    if (!id) return;
    async function getData() {
      const fetchedPost = await fetchPost(id as string);
      if (!fetchedPost) {
        router.push("/404"); // Redirigir si no encuentra el post
      } else {
        setPost(fetchedPost);
        setLoading(false);
      }
    }
    getData();
  }, [id, router]);

  if (loading) return <p className="text-center text-lg text-gray-500">Cargando post...</p>;
  if (!post) return <p className="text-center text-lg text-red-500">No se encontró el post</p>;

  // 📌 Calcular Tiempo de Lectura
  const wordCount = post.mensaje.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // 📌 Formatear párrafos
  const formattedContent = post.mensaje.split("\n").map((paragraph, index) => (
    <p key={index} className="mb-4 text-gray-800 leading-relaxed">{paragraph}</p>
  ));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Botón de regreso */}
        <Link href="/Blog" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition duration-200">
          <ArrowLeft size={18} className="mr-2" />
          Volver a todos los posts
        </Link>

        <article className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
          {/* Encabezado del artículo */}
          <div className="p-8 border-b border-gray-100">
            <h1 className="text-4xl font-bold text-indigo-600 mb-3">{post.titulo}</h1>
            {post.subtitulo && <h2 className="text-xl text-gray-600 font-medium mb-6">{post.subtitulo}</h2>}

            {/* Metadatos */}
            <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mt-6">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                {formatDate(post.created_at)}
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                {readingTime} min de lectura
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-8">
            <div className="prose max-w-none">{formattedContent}</div>
          </div>
        </article>
      </main>
    </div>
  );
}
