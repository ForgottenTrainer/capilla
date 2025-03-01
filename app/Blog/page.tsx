import AllPosts from "./components/AllPosts";

async function getPosts() {
  const response = await fetch("http://127.0.0.1:8000/api/posts", {
    cache: "no-store", // Evita que Next.js almacene en caché los datos
  });

  if (!response.ok) {
    throw new Error("Error al obtener los posts");
  }

  return response.json();
}

export default async function HomeBlog() {
  const posts = await getPosts();

  return (
    <div>
      <AllPosts posts={posts} />
    </div>
  );
}
