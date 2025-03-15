import AllPosts from "./components/AllPosts";

async function getPosts() {
  const url = process.env.NEXT_PUBLIC_DATABASE_URL;

  if (!url) {
    throw new Error("La URL de la API no está definida en .env.local");
  }

  const response = await fetch(`${url}/api/posts`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Error al obtener los posts: ${response.statusText}`);
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
