import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

export default function FormField({
  id,
  label,
  icon: Icon,
  disabled,
  className = "",
  ...props
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        )}
        <Input
          id={id}
          disabled={disabled}
          className={`${Icon ? "pl-9" : ""} ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}
