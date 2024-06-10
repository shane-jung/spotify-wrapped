import { fetchTopTracks } from "@/lib/spotify";

export default async function AnnualStats() {
  const stats = await fetchTopTracks();

  return (
    <div>
      <p className="mb-4">
        You've listened to {stats?.total.toLocaleString()} tracks in the last
        year.
      </p>

      {stats && (
        <div>
          <h2 className="mb-2 text-lg font-semibold">Top Tracks</h2>
          <ol className="list-decimal pl-4">
            {stats.items.slice(0, 5).map((item: any, i: number) => (
              <li key={item.id} className="text-sm opacity-50">
                {item.name} - {item.artists.map((a: any) => a.name).join(", ")}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
