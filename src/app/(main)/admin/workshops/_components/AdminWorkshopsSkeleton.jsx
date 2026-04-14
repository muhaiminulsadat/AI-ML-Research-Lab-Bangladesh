import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Skeleton} from "@/components/ui/skeleton";

export default function AdminWorkshopsSkeleton() {
  return (
    <div className="bg-[#090A0F] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 bg-muted/30 hover:bg-muted/30">
            <TableHead className="w-[300px] h-12 uppercase text-[10px] tracking-wider text-muted-foreground">
              Workshop Title
            </TableHead>
            <TableHead className="h-12 uppercase text-[10px] tracking-wider text-muted-foreground text-center">
              Dates
            </TableHead>
            <TableHead className="h-12 uppercase text-[10px] tracking-wider text-muted-foreground text-center">
              Status
            </TableHead>
            <TableHead className="h-12 uppercase text-[10px] tracking-wider text-muted-foreground text-center">
              Registration
            </TableHead>
            <TableHead className="h-12 uppercase text-[10px] tracking-wider text-muted-foreground text-center">
              Seats
            </TableHead>
            <TableHead className="text-right pr-6 h-12 uppercase text-[10px] tracking-wider text-muted-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4, 5].map((i) => (
            <TableRow
              key={i}
              className="border-white/5 hover:bg-white/[0.02] transition-colors"
            >
              <TableCell className="py-4">
                <Skeleton className="h-5 w-48" />
              </TableCell>
              <TableCell className="py-4 flex justify-center">
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell className="py-4 text-center">
                <Skeleton className="h-5 w-16 rounded-full mx-auto" />
              </TableCell>
              <TableCell className="py-4 text-center">
                <Skeleton className="h-5 w-16 rounded-full mx-auto" />
              </TableCell>
              <TableCell className="py-4 flex justify-center">
                <Skeleton className="h-4 w-12" />
              </TableCell>
              <TableCell className="py-4">
                <div className="flex justify-end gap-1.5 pr-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
