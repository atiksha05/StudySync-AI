import { Card } from "@/components/ui/card";
import { DEMO_NETWORKING_CONTACTS } from "@/lib/career/demo";

export const dynamic = "force-dynamic";

export default function NetworkingPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="mb-2 text-2xl font-bold text-[#F8FAFC]">Networking</h1>
      <p className="mb-6 text-sm text-slate-400">
        Track recruiters, referrals, and professional connections
      </p>

      <div className="space-y-3">
        {DEMO_NETWORKING_CONTACTS.map((contact, i) => (
          <Card key={i} className="border-white/10 bg-[#0d1424]/80 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#F8FAFC]">{contact.name}</p>
                <p className="mt-0.5 text-sm text-slate-400">{contact.role}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">{contact.lastContact}</p>
                <p className="text-[10px] text-[#A78BFA]">{contact.status}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
