import { baseURL } from "@/constants/constants";

export async function getStatic(filename: string) {
  const res = await fetch(
    `${baseURL}/api/exhibits/static/${filename}`,
    { cache: "force-cache" }
  );

  if (!res.ok) throw new Error("Failed to fetch static file");

  return res.json();
}
