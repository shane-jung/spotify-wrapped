import SignIn from "./sign-in";
export default function Page() {
  return (
    <div className="mt-12 flex h-screen flex-col items-center justify-center">
      <h1>Spotify reWrapped</h1>
      <p>Sign in with Spotify to see your listening history</p>

      <SignIn />
    </div>
  );
}
