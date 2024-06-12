import { fetchProfile } from "@/lib/spotify";

export default async function Page() {
  const user = await fetchProfile();
  // console.log(user);
  return (
    <div className="h-screen bg-purple-900 bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500">
      <img
        src={user.images[1].url}
        alt="Spotify Profile"
        className="h-64 w-64 rounded-full"
      />
      <h1 className="text-4xl font-medium text-white">
        Welcome, {user.display_name}!
      </h1>
    </div>
  );
}
