import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {ArrowLeft, Save} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function WorkshopFormSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="icon" disabled>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-5 w-80" />
        </div>
      </div>

      <div className="space-y-8 bg-[#090A0F] border border-white/5 p-6 rounded-xl shadow-sm">
        {/* Basic Info Placeholder */}
        <div className="space-y-4">
          <Skeleton className="h-7 w-48 mb-6" /> {/* Section Title */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" /> {/* Label */}
            <Skeleton className="h-10 w-full" /> {/* Input */}
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" /> {/* Label */}
            <Skeleton className="h-24 w-full" /> {/* Textarea */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>

        {/* Dates Placeholder */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <Skeleton className="h-7 w-40 mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>

        {/* Actions Placeholder */}
        <div className="flex justify-end gap-3 pt-6 border-t border-white/5">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-40 rounded-md" />
        </div>
      </div>
    </div>
  );
}
