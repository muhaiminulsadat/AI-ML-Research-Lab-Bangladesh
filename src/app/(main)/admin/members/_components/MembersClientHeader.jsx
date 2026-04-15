import {Search} from "lucide-react";

export default function MembersClientHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Manage Members</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Assign leadership roles to organize your directory.
        </p>
      </div>
    </div>
  );
}
