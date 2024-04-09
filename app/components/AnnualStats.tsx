"use client";
import spotify from "@/lib/spotify";
import { useEffect, useState } from "react";

export default function AnnualStats() {
  const [stats, setStats] = useState<any>(null);

  async function getStats() {
    const data = await spotify.currentUser.topItems("tracks", "long_term");
    console.log(data);
    setStats(data);
  }
  useEffect(() => {
    getStats();
  }, []);

  return (
    <div>
      <p className="mb-4">
        You've listened to {stats?.total.toLocaleString()} tracks in the last
        year.
      </p>

      {stats && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Top Tracks</h2>
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
