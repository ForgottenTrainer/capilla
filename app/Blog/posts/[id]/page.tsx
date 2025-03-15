"use client";
/* eslint-disable */
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_DATABASE_URL}/api/posts/${id}`, {
      cache: "no-store",
    });
    if (!response.ok) return null;
    return response.json();
  } catch (err) {
    console.error("Error obteniendo post:", err);
    return null;
  }
}

export default function ViewPostPage() {
  const { id } = useParams(); // Obtener ID dinámico
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
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
          setPost(fetchedPost);
        }
        setLoading(false);
      } catch {
        setLoading(false);
        setErrorMessage("Error al cargar el post");
      }
    }
    
    getData();
  }, [id, router]);

  if (loading) return <p className="text-center text-lg text-gray-500">Cargando post...</p>;
  if (!post) return <p className="text-center text-lg text-red-500">No se encontró el post</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Botón de regreso */}
        <Link href={`/Blog`} className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition duration-200">
          <ArrowLeft size={18} className="mr-2" />
          Volver al blog
        </Link>
        
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-indigo-600 mb-4">{post.titulo}</h1>
            {post.subtitulo && (
              <h2 className="text-xl text-gray-600 font-medium mb-4">{post.subtitulo}</h2>
            )}
            <p className="text-gray-800 leading-relaxed whitespace-pre-line">{post.mensaje}</p>
            <p className="text-sm text-gray-500 mt-4">Publicado el {new Date(post.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
