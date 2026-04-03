import {Avatar, AvatarFallback} from "@/components/ui/avatar";

const teamMembers = [
  {name: "Dr. Arisa K.", role: "Director of Lab", img: "AK"},
  {name: "James Lin", role: "Senior ML Engineer", img: "JL"},
  {name: "Sarah Vance", role: "Research Scientist", img: "SV"},
  {name: "Dr. Chen W.", role: "Computational Theorist", img: "CW"},
];

export default function TeamSection() {
  return (
    <section className="space-y-12 border-t border-border/30 pt-24">
      <div className="text-center sm:text-left space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          Principal Investigators
        </h2>
        <p className="text-muted-foreground">
          Guided by distinguished scientists driving theoretical advancements.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {teamMembers.map((member, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center p-8 rounded-[2rem] bg-transparent border border-border/20 hover:border-border/50 hover:bg-secondary/5 transition-all duration-300"
          >
            <Avatar className="w-20 h-20 mb-5 border border-border/40 shadow-xs">
              <AvatarFallback className="bg-secondary/40 text-lg font-medium text-foreground">
                {member.img}
              </AvatarFallback>
            </Avatar>
            <h4 className="text-[17px] font-semibold tracking-tight text-foreground">
              {member.name}
            </h4>
            <p className="text-sm text-muted-foreground mt-1.5 font-medium">
              {member.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
