"use client";

import {useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {Trash2, AlertTriangle, ArrowRight, Trash} from "lucide-react";
import {deleteUser} from "@/actions/user.action";
import {toast} from "sonner";
import {cn} from "@/lib/utils";

export default function DeleteMemberDialog({member, onDeleteSuccess}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [emailInput, setEmailInput] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setStep(1);
    setEmailInput("");
    setIsAgreed(false);
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await deleteUser(member._id);
      if (res.success) {
        toast.success(res.message);
        onDeleteSuccess(member._id);
        setOpen(false);
        reset();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Internal server error during deletion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { setOpen(val); if(!val) reset(); }}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer active:scale-95 transition-all"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2 text-destructive mb-2">
            <AlertTriangle className="h-5 w-5" />
            <DialogTitle className="font-bold text-xl">Danger Zone</DialogTitle>
          </div>
          <DialogDescription className="text-xs font-semibold text-muted-foreground uppercase tracking-widest pb-2 border-b">
            Critical Action Required
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {/* Progress Indicators */}
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1.5 w-10 rounded-full transition-all duration-300",
                  step >= s ? "bg-destructive" : "bg-muted"
                )}
              />
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
               <p className="text-sm font-semibold leading-relaxed">
                  You are about to permanently delete <span className="text-destructive underline decoration-dotted underline-offset-4">{member.name}</span>.
               </p>
               <div className="p-4 bg-destructive/5 rounded-xl border border-destructive/20 text-[13px] text-destructive space-y-3">
                  <p className="font-bold border-b border-destructive/10 pb-1 mb-1 flex items-center gap-2">
                     <Trash className="h-3 w-3" />
                     Impact Analysis:
                  </p>
                  <ul className="list-disc pl-4 space-y-1.5 opacity-90 font-medium">
                     <li>Course enrollments and learning progress</li>
                     <li>Personal profile and research interests</li>
                     <li>Community directory listing</li>
                  </ul>
               </div>
               <Button 
                onClick={() => setStep(2)} 
                variant="destructive"
                className="w-full h-10 gap-2 cursor-pointer active:scale-[0.98] transition-all font-bold tracking-tight hover:bg-destructive/90"
               >
                 I understand, Continue
                 <ArrowRight className="h-3.5 w-3.5" />
               </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-3">
                <label className="text-[13px] font-bold">Identity Verification</label>
                <div className="p-3 bg-muted/50 rounded-lg border border-dashed border-border/60">
                   <p className="text-xs text-muted-foreground mb-2">
                     To confirm, please type the member's email exactly:
                   </p>
                   <span className="font-mono font-bold text-[13px] text-foreground select-all bg-background border px-2 py-1 rounded inline-block w-full text-center">
                     {member.email}
                   </span>
                </div>
                <Input 
                  placeholder="Type email here..." 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="h-10 focus-visible:ring-destructive border-border/80"
                />
              </div>
              <Button 
                onClick={() => setStep(3)} 
                disabled={emailInput.trim() !== member.email}
                variant="destructive"
                className="w-full h-10 gap-2 cursor-pointer active:scale-[0.98] transition-all font-bold tracking-tight hover:bg-destructive/90"
              >
                Confirm Identity
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-start space-x-3 p-4 bg-muted/40 rounded-xl border group hover:border-destructive/30 transition-colors cursor-pointer" onClick={() => setIsAgreed(!isAgreed)}>
                <Checkbox 
                  id="agree" 
                  checked={isAgreed} 
                  onCheckedChange={setIsAgreed} 
                  className="mt-1 data-[state=checked]:bg-destructive data-[state=checked]:border-destructive cursor-pointer"
                />
                <label htmlFor="agree" className="text-[13px] font-medium leading-tight cursor-pointer select-none">
                  I acknowledge that this action is irreversible and the user data cannot be recovered even by system administrators.
                </label>
              </div>
              
              <div className="flex gap-3">
                 <Button variant="outline" onClick={() => setStep(2)} className="flex-1 h-10 cursor-pointer active:scale-[0.98] transition-all font-medium">Back</Button>
                 <Button 
                   onClick={handleDelete} 
                   disabled={!isAgreed || loading}
                   variant="destructive"
                   className="flex-[2] h-10 gap-2 cursor-pointer active:scale-[0.98] transition-all hover:bg-destructive/90 font-bold"
                 >
                    {loading ? "Processing..." : "Permanently Delete"}
                    {!loading && <Trash className="h-3.5 w-3.5" />}
                 </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
