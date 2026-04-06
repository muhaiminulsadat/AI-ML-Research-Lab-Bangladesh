"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const departmentsData = {
  admin: {
    id: "admin",
    label: "Administration",
    description:
      "Responsible for overall governance, strategy, policy formulation, and nationwide coordination.",
    members: [
      {name: "Nirob Devnath", role: "Director", dept: "CU"},
      {name: "Apurbo Kumar", role: "Co-Director", dept: "BUET"},
      {name: "Nafi Naib Mon", role: "Co-Director", dept: "CU"},
    ],
  },
  research: {
    id: "research",
    label: "Research (Core)",
    description:
      "Dedicated to conducting ML & AI research, project execution, and driving global academic publications.",
    members: [{name: "Samyo Pramanik", role: "Research Head", dept: "BUET"}],
  },
  ict: {
    id: "ict",
    label: "ICT",
    description:
      "Manages technical support, software and web development, and digital infrastructure.",
    members: [
      {name: "Muhaiminul Islam Sadat", role: "ICT Secretary", dept: "BUET"},
    ],
  },
  law: {
    id: "law",
    label: "Law",
    description:
      "Handles legal advisory, compliance, policy documentation, and partnership agreements.",
    members: [{name: "Sadat", role: "Legal Advisor", dept: "BUET"}],
  },
};

export default function DepartmentsSection() {
  const [activeTab, setActiveTab] = useState("admin");

  return (
    <section className="relative py-24 bg-[#090A0F] overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 w-full max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-wider text-primary uppercase mb-3">
            // Departments
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Our Divisions
          </h3>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Meet the dedicated teams driving our organization forward across
            various functional areas.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="inline-flex h-auto sm:h-12 items-center justify-center rounded-lg bg-white/5 p-1 text-zinc-400 border border-white/5 mb-8 w-full max-w-3xl overflow-x-auto flex-wrap sm:flex-nowrap gap-1">
            {Object.values(departmentsData).map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveTab(dept.id)}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-6 py-2.5 sm:py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 flex-1 ${
                  activeTab === dept.id
                    ? "bg-white/10 text-white shadow-sm"
                    : "hover:bg-white/5 hover:text-zinc-200"
                }`}
              >
                {dept.label}
              </button>
            ))}
          </div>

          <div className="w-full min-h-[400px]">
            {Object.values(departmentsData).map(
              (dept) =>
                activeTab === dept.id && (
                  <motion.div
                    key={dept.id}
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -10}}
                    transition={{duration: 0.3}}
                    className="flex flex-col gap-8"
                  >
                    <div className="text-center max-w-3xl mx-auto mb-4">
                      <p className="text-zinc-400 text-base">
                        {dept.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {dept.members.map((member, i) => (
                        <div
                          key={i}
                          className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="h-14 w-14 border border-white/10">
                              <AvatarImage
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                                alt={member.name}
                              />
                              <AvatarFallback className="bg-primary/20 text-primary">
                                {member.name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                                {member.name}
                              </h4>
                              <p className="text-sm text-primary/80 font-medium">
                                {member.role}
                              </p>
                              <p className="text-xs text-zinc-500 mt-1">
                                {member.dept}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
