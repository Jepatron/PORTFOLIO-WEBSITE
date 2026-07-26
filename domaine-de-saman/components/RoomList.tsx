import { estate } from "@/content/site";

export default function RoomList() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse font-body text-sm">
        <thead>
          <tr className="border-b border-charcoal/20 text-left text-xs uppercase tracking-[0.15em] text-charcoal/60">
            <th className="py-3 pr-4">Room</th>
            <th className="py-3 pr-4">Beds</th>
            <th className="py-3 pr-4">Sleeps</th>
            <th className="py-3">Bathroom</th>
          </tr>
        </thead>
        <tbody>
          {estate.rooms.map((room) => (
            <tr key={room.name} className="border-b border-charcoal/10">
              <td className="py-3 pr-4 text-charcoal">{room.name}</td>
              <td className="py-3 pr-4 text-grey">{room.beds}</td>
              <td className="py-3 pr-4 text-grey">{room.sleeps}</td>
              <td className="py-3 text-grey">{room.bathroom}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 font-body text-xs text-charcoal/40">
        Room-by-room details above are placeholders pending confirmation — see content/site.ts.
      </p>
    </div>
  );
}
