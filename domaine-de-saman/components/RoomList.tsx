import type { Room, SiteContent } from "@/content";

export default function RoomList({
  rooms,
  labels,
}: {
  rooms: Room[];
  labels: SiteContent["ui"]["roomTable"];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse font-body text-sm">
        <thead>
          <tr className="border-b border-charcoal/20 text-left text-xs uppercase tracking-[0.15em] text-charcoal/60">
            <th className="py-3 pr-4">{labels.room}</th>
            <th className="py-3 pr-4">{labels.beds}</th>
            <th className="py-3 pr-4">{labels.sleeps}</th>
            <th className="py-3">{labels.bathroom}</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.name} className="border-b border-charcoal/10">
              <td className="py-3 pr-4 text-charcoal">{room.name}</td>
              <td className="py-3 pr-4 text-grey">{room.beds}</td>
              <td className="py-3 pr-4 text-grey">{room.sleeps}</td>
              <td className="py-3 text-grey">{room.bathroom}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 font-body text-xs text-charcoal/40">{labels.caption}</p>
    </div>
  );
}
