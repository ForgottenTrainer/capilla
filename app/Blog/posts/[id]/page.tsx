import { Navbar } from "@/app/components/Navbar";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"; // Importamos íconos
import Link from "next/link";

type Post = {
  id: number;
  titulo: string;
  subtitulo?: string;
  mensaje: string;
  created_at: string;
};

// 📌 Obtener los datos del post según el ID dinámico
async function getPost(id: string): Promise<Post | null> {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
      cache: "no-store", // Asegura que siempre obtiene datos actualizados
      next: { revalidate: 60 } // Revalidar cada minuto como alternativa
    });
    
    console.log(`Intentando obtener post ID: ${id}, Status: ${response.status}`);
    
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Error obteniendo post:", error);
    return null;
  }
}

// Función para formatear fechas de manera legible
function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('es-ES', options);
}

// 📌 Página dinámica para ver un solo post
export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
 
  if (!post) {
    return notFound(); // Muestra error 404 si no encuentra el post
  }
  
  // Calculamos tiempo de lectura estimado (1 min por cada 200 palabras)
  const wordCount = post.mensaje.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  
  // Formateamos el contenido para soportar párrafos
  const formattedContent = post.mensaje.split('\n').map((paragraph, index) => (
    <p key={index} className="mb-4 text-gray-800 leading-relaxed">
      {paragraph}
    </p>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              {post.titulo}
            </h1>
            
            {post.subtitulo && (
              <h2 className="text-xl text-gray-600 font-medium mb-6">
                {post.subtitulo}
              </h2>
            )}
            
            {/* Metadatos del artículo */}
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
          
          {/* Contenido del artículo */}
          <div className="p-8">
            <div className="prose max-w-none">
              {formattedContent}
            </div>
            
            {/* Herramientas de compartir */}
            <div className="mt-10 pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Publicado el {new Date(post.created_at).toLocaleDateString()}
                </p>
              
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}