export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <nav className="fixed top-0 left-0 z-10 w-full bg-white py-4 px-2 shadow-md">
        <h1 className="ml-2 text-4xl">
          <span className="text-green-600 font-bold">Spotify</span>{" "}
          <span className="opacity-50">re</span>
          <span className="font-medium text-slate-700">Wrapped</span>
        </h1>
      </nav>
      {children}
    </div>
  );
}
