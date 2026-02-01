"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  Search,
  Terminal,
  Code2,
  Database,
  Settings,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { getSkills, saveSkill, deleteSkill } from "../../lib/actions/skills";
import { toast } from "sonner";

// Mapping categories to visual styles
const CATEGORY_CONFIG = {
  FRONTEND: {
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    icon: <Code2 size={16} />,
  },
  BACKEND: {
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/20",
    icon: <Database size={16} />,
  },
  TOOLS: {
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
    icon: <Settings size={16} />,
  },
};

export default function SkillManagement() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSkills();
  }, []);

  async function fetchSkills() {
    setLoading(true);
    try {
      const data = await getSkills();
      setSkills(data);
    } catch (error) {
      toast.error("Failed to sync with Skill Core");
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (skill: any) => {
    setCurrentSkill(skill);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Permanently wipe this technology from your library?")) {
      try {
        toast.loading("Wiping data...", { id: "skill-action" });
        await deleteSkill(id);
        toast.success("Skill deleted", { id: "skill-action" });
        fetchSkills();
      } catch (error) {
        toast.error("Error deleting skill", { id: "skill-action" });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      toast.loading("Saving to Skill Core...", { id: "skill-action" });
      await saveSkill(formData, currentSkill?.id);
      toast.success(
        currentSkill ? "Skill entry updated" : "New skill added to library",
        { id: "skill-action" },
      );
      setIsFormOpen(false);
      setCurrentSkill(null);
      fetchSkills();
    } catch (err) {
      toast.error("Process failed. Skill names must be unique.", {
        id: "skill-action",
      });
    }
  };

  const filteredSkills = skills.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-soft-white uppercase leading-none">
            Technology Library
          </h2>
          <p className="text-gray-500 text-xs font-mono mt-2 uppercase tracking-widest">
            Manage global tech stack and proficiency levels
          </p>
        </div>
        <button
          onClick={() => {
            setCurrentSkill(null);
            setIsFormOpen(true);
          }}
          className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
        >
          <Plus size={18} /> REGISTER TECH
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-dark-secondary border border-dark-tertiary p-6 rounded-sm space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="SEARCH BY NAME OR CATEGORY (FRONTEND, BACKEND...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-primary border border-dark-tertiary p-4 pl-12 text-soft-white text-xs font-mono focus:border-primary outline-none transition-all uppercase"
          />
        </div>

        {loading ? (
          <div className="py-20 text-center flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
              Accessing Skill Database...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.length === 0 && (
              <div className="col-span-full py-20 text-center border border-dashed border-dark-tertiary">
                <AlertCircle className="mx-auto text-gray-600 mb-2" size={32} />
                <p className="text-xs font-mono text-gray-500 uppercase">
                  No matching tech records found
                </p>
              </div>
            )}

            {filteredSkills.map((skill) => {
              const config =
                CATEGORY_CONFIG[skill.category as keyof typeof CATEGORY_CONFIG];
              return (
                <div
                  key={skill.id}
                  className="bg-dark-primary border border-dark-tertiary p-5 flex flex-col justify-between group hover:border-primary/50 transition-all relative overflow-hidden"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 bg-dark-secondary border border-dark-tertiary ${config.color} group-hover:scale-110 transition-transform`}
                      >
                        <Terminal size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-soft-white uppercase tracking-tight">
                          {skill.name}
                        </h3>
                        <div
                          className={`mt-1 flex items-center gap-1.5 px-2 py-0.5 rounded-full ${config.bg} ${config.border} ${config.color} text-[8px] font-black uppercase`}
                        >
                          {config.icon} {skill.category}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="p-2 text-gray-500 hover:text-primary transition-colors"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id)}
                        className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Level Bar */}
                  <div className="mt-6 space-y-1.5">
                    <div className="flex justify-between text-[8px] font-mono text-gray-500 uppercase">
                      <span>Proficiency</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="h-1 bg-dark-secondary w-full rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL FORM */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
          <div className="bg-dark-secondary border border-dark-tertiary w-full max-w-lg p-10 rounded-sm shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-soft-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="mb-10">
              <h3 className="text-2xl font-black text-soft-white uppercase leading-none">
                {currentSkill ? "Update Record" : "New Tech Entry"}
              </h3>
              <p className="text-gray-500 text-[10px] font-mono mt-2 uppercase tracking-widest">
                Define technology parameters and proficiency
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">
                    Tech Name
                  </label>
                  <input
                    name="name"
                    defaultValue={currentSkill?.name}
                    placeholder="e.g. Next.js"
                    className="w-full bg-dark-primary border border-dark-tertiary p-3 text-soft-white text-sm focus:border-primary outline-none transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">
                    Category Tag
                  </label>
                  <select
                    name="category"
                    defaultValue={currentSkill?.category || "FRONTEND"}
                    className="w-full bg-dark-primary border border-dark-tertiary p-3 text-soft-white text-sm focus:border-primary outline-none appearance-none cursor-pointer"
                  >
                    <option value="FRONTEND">FRONTEND</option>
                    <option value="BACKEND">BACKEND</option>
                    <option value="TOOLS">TOOLS & DEVOPS</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">
                    Proficiency Level (%)
                  </label>
                  <input
                    type="number"
                    name="level"
                    min="0"
                    max="100"
                    defaultValue={currentSkill?.level || 0}
                    className="w-full bg-dark-primary border border-dark-tertiary p-3 text-soft-white text-sm focus:border-primary outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">
                    Icon ID (Optional)
                  </label>
                  <input
                    name="icon"
                    defaultValue={currentSkill?.icon}
                    placeholder="lucide-icon-name"
                    className="w-full bg-dark-primary border border-dark-tertiary p-3 text-soft-white text-sm focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-secondary text-white font-black py-5 flex items-center justify-center gap-3 uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <Save size={20} /> Save Tech Record
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
