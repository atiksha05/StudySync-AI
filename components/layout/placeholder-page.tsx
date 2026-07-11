import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

export function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Card className="border-white/10 bg-[#0d1424]/80 p-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20">
          <Sparkles className="h-6 w-6 text-[#A78BFA]" />
        </div>
        <h1 className="text-2xl font-bold text-[#F8FAFC]">{title}</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">{description}</p>
        <p className="mt-6 text-xs text-slate-500">Coming soon in the next sprint</p>
      </Card>
    </div>
  );
}
