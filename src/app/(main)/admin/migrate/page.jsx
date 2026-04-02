"use client";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {runMigration} from "@/actions/migration.action";
import {toast} from "sonner";
import {RefreshCcw, AlertTriangle, CheckCircle} from "lucide-react";
import {cn} from "@/lib/utils";
import Link from "next/link";

export default function MigrationPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleMigrate = async () => {
    setLoading(true);
    try {
      const res = await runMigration();
      if (res.success) {
        toast.success(res.message);
        setResult({
          success: true,
          message: res.message,
        });
      } else {
        toast.error(res.message);
        setResult({
          success: false,
          message: res.message,
        });
      }
    } catch (error) {
      toast.error("Migration failed.");
      setResult({
        success: false,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-20 px-6">
      <Card className="border-warning/20 bg-warning/5 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
             <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-warning" />
             </div>
          </div>
          <CardTitle className="text-2xl">Database Migration Tool</CardTitle>
          <CardDescription>
            Synchronize your members with the new Role and Unique ID system.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 flex flex-col items-center">
           <div className="px-6 pb-6 space-y-6 flex flex-col items-center w-full">
             <div className="text-sm text-center text-muted-foreground space-y-3 max-w-md">
                <p>This will process all members and ensure they have:</p>
                <ul className="grid grid-cols-2 gap-2 text-xs font-semibold">
                   <li className="bg-background border rounded px-2 py-1">Role: "member"</li>
                   <li className="bg-background border rounded px-2 py-1">ID: "ML-XXXX"</li>
                </ul>
                <p className="mt-4 italic text-warning/80">Confirm you are an admin before running this process.</p>
             </div>

             {result ? (
                <div className={cn(
                   "w-full p-4 rounded-lg flex items-start gap-3 border text-sm animate-in fade-in zoom-in duration-300",
                   result.success ? "bg-success/10 border-success/20 text-success" : "bg-destructive/10 border-destructive/20 text-destructive"
                )}>
                   {result.success ? <CheckCircle className="h-5 w-5 shrink-0" /> : <AlertTriangle className="h-5 w-5 shrink-0" />}
                   <span>{result.message}</span>
                </div>
             ) : (
                <Button 
                  onClick={handleMigrate} 
                  disabled={loading}
                  className="w-full max-w-sm h-11 gap-2 text-md font-bold shadow-lg shadow-warning/20 transition-all hover:scale-[1.02] active:scale-95 bg-warning text-warning-foreground hover:bg-warning/90"
                >
                  {loading ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
                  {loading ? "Migrating Data..." : "Run Migration Now"}
                </Button>
             )}

             <div className="pt-4 border-t w-full text-center">
                <Link href="/admin">
                   <Button variant="link" className="text-muted-foreground text-xs">
                      Cancel & Return to Dashboard
                   </Button>
                </Link>
             </div>
           </div>
        </CardContent>
      </Card>
      <div className="mt-8 text-[10px] text-muted-foreground text-center opacity-40">
         Admin Security Clearance Required. This tool performs direct database mutations.
      </div>
    </div>
  );
}
