"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  ArrowLeft,
  Briefcase,
  MapPin,
  Calendar,
  Globe,
  PlusCircle,
  X,
} from "lucide-react";
import {
  getExperiences,
  saveExperience,
  deleteExperience,
} from "../../lib/actions/experience";
import { getAllSkills } from "../../lib/actions/projects";
import { toast } from "sonner";

export default function ExperienceManagement() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [availableSkills, setAvailableSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExp, setCurrentExp] = useState<any>(null);

  // Form States
  const [bullets, setBullets] = useState<string[]>([""]);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isCurrent, setIsCurrent] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const [e, s] = await Promise.all([getExperiences(), getAllSkills()]);
    setExperiences(e);
    setAvailableSkills(s);
    setLoading(false);
  }

  const handleEdit = (exp: any) => {
    setCurrentExp(exp);
    setBullets(exp.description || [""]);
    setLogoPreview(exp.companyLogo);
    setIsCurrent(exp.current);
    setIsEditing(true);
  };

  const addBullet = () => setBullets([...bullets, ""]);
  const removeBullet = (index: number) =>
    setBullets(bullets.filter((_, i) => i !== index));
  const updateBullet = (index: number, val: string) => {
    const newBullets = [...bullets];
    newBullets[index] = val;
    setBullets(newBullets);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Bullet points are handled via controlled inputs, but we append them to the form
    bullets.forEach((b) => {
      if (b.trim()) formData.append("description", b);
    });

    try {
      toast.loading("Saving career entry...", { id: "exp" });
      await saveExperience(formData, currentExp?.id);
      toast.success("Experience updated", { id: "exp" });
      setIsEditing(false);
      fetchData();
    } catch (err) {
      toast.error("Error saving");
    }
  };

  if (loading)
    return (
      <div className="py-20 text-center font-mono animate-pulse">
        Loading Career History...
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-soft-white uppercase leading-none">
          Career Path
        </h2>
        {!isEditing && (
          <button
            onClick={() => {
              setCurrentExp(null);
              setBullets([""]);
              setLogoPreview(null);
              setIsEditing(true);
            }}
            className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-sm font-bold flex items-center gap-2 transition-all"
          >
            <Plus size={18} /> ADD POSITION
          </button>
        )}
      </div>

      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="bg-dark-secondary border border-dark-tertiary p-8 rounded-sm space-y-10 animate-in fade-in slide-in-from-bottom-4"
        >
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="text-gray-500 hover:text-primary flex items-center gap-2 text-xs font-mono"
          >
            <ArrowLeft size={14} /> BACK
          </button>

          {/* Section 01: Company Info */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest border-b border-dark-tertiary pb-2">
              01. Company Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                name="role"
                defaultValue={currentExp?.role}
                placeholder="Job Title (e.g. Senior Dev)"
                className="w-full bg-dark-primary border border-dark-tertiary p-3 text-soft-white outline-none"
                required
              />
              <input
                name="company"
                defaultValue={currentExp?.company}
                placeholder="Company Name"
                className="w-full bg-dark-primary border border-dark-tertiary p-3 text-soft-white outline-none"
                required
              />
              <input
                name="location"
                defaultValue={currentExp?.location}
                placeholder="Location (e.g. Remote / NY)"
                className="w-full bg-dark-primary border border-dark-tertiary p-3 text-soft-white outline-none"
              />
              <input
                name="companyWebsite"
                defaultValue={currentExp?.companyWebsite}
                placeholder="Website URL"
                className="w-full bg-dark-primary border border-dark-tertiary p-3 text-soft-white outline-none"
              />
            </div>

            <div className="flex items-center gap-6 p-4 bg-dark-primary border border-dark-tertiary">
              <div className="w-16 h-16 bg-dark-secondary border border-dark-tertiary flex items-center justify-center overflow-hidden">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Briefcase className="text-gray-700" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-[10px] font-mono text-gray-500 uppercase">
                  Company Logo
                </label>
                <input
                  type="file"
                  name="companyLogo"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files?.[0] &&
                    setLogoPreview(URL.createObjectURL(e.target.files[0]))
                  }
                  className="text-xs text-gray-500"
                />
                <input
                  type="hidden"
                  name="existingLogo"
                  value={currentExp?.companyLogo || ""}
                />
              </div>
            </div>
          </div>

          {/* Section 02: Timing */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest border-b border-dark-tertiary pb-2">
              02. Duration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-500 uppercase">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  defaultValue={
                    currentExp?.startDate
                      ? new Date(currentExp.startDate)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  className="w-full bg-dark-primary border border-dark-tertiary p-3 text-soft-white outline-none"
                  required
                />
              </div>
              <div
                className={`space-y-2 ${isCurrent ? "opacity-20 pointer-events-none" : ""}`}
              >
                <label className="text-[10px] font-mono text-gray-500 uppercase">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  defaultValue={
                    currentExp?.endDate
                      ? new Date(currentExp.endDate).toISOString().split("T")[0]
                      : ""
                  }
                  className="w-full bg-dark-primary border border-dark-tertiary p-3 text-soft-white outline-none"
                  required={!isCurrent}
                />
              </div>
              <label className="flex items-center gap-3 p-3 bg-dark-primary border border-dark-tertiary cursor-pointer h-[50px]">
                <input
                  type="checkbox"
                  name="current"
                  checked={isCurrent}
                  onChange={(e) => setIsCurrent(e.target.checked)}
                  className="accent-primary"
                />
                <span className="text-xs font-bold uppercase text-soft-white">
                  I currently work here
                </span>
              </label>
            </div>
          </div>

          {/* Section 03: Description Bullets */}
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-dark-tertiary pb-2">
              <h3 className="text-sm font-bold text-primary uppercase tracking-widest">
                03. Key Responsibilities
              </h3>
              <button
                type="button"
                onClick={addBullet}
                className="text-primary hover:text-white transition-colors"
              >
                <PlusCircle size={20} />
              </button>
            </div>
            <div className="space-y-3">
              {bullets.map((b, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-3.5 w-1.5 h-1.5 bg-primary rounded-full"></span>
                    <input
                      value={b}
                      onChange={(e) => updateBullet(i, e.target.value)}
                      placeholder="Achieved X by doing Y..."
                      className="w-full bg-dark-primary border border-dark-tertiary p-3 pl-8 text-soft-white text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeBullet(i)}
                    className="text-gray-600 hover:text-red-500"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 04: Skills */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest border-b border-dark-tertiary pb-2">
              04. Skills Utilized
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableSkills.map((skill) => (
                <label
                  key={skill.id}
                  className="flex items-center gap-3 p-3 bg-dark-primary border border-dark-tertiary cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="skills"
                    value={skill.id}
                    defaultChecked={currentExp?.skills?.some(
                      (s: any) => s.skillId === skill.id,
                    )}
                    className="accent-primary"
                  />
                  <span className="text-xs font-mono text-gray-400">
                    {skill.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-black py-5 uppercase tracking-widest shadow-xl shadow-primary/20"
          >
            <Save size={18} className="inline mr-2" /> Commit to Career History
          </button>
        </form>
      ) : (
        /* --- LIST VIEW --- */
        <div className="grid grid-cols-1 gap-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-dark-secondary border border-dark-tertiary p-6 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-primary transition-all"
            >
              <div className="flex items-center gap-6 flex-1 w-full">
                <div className="w-14 h-14 bg-dark-primary flex items-center justify-center shrink-0 border border-dark-tertiary">
                  {exp.companyLogo ? (
                    <img
                      src={exp.companyLogo}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Briefcase className="text-gray-700" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-soft-white truncate">
                      {exp.role}
                    </h3>
                    {exp.current && (
                      <span className="text-[8px] bg-primary/20 text-primary border border-primary/20 px-1 font-black uppercase">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-primary text-sm font-bold">
                    {exp.company}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2 text-[10px] font-mono text-gray-500 uppercase tracking-tight">
                    <span className="flex items-center gap-1">
                      <MapPin size={10} /> {exp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />{" "}
                      {new Date(exp.startDate).getFullYear()} -{" "}
                      {exp.current
                        ? "Present"
                        : new Date(exp.endDate).getFullYear()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto border-t md:border-t-0 md:border-l border-dark-tertiary pt-4 md:pt-0 md:pl-6">
                <button
                  onClick={() => handleEdit(exp)}
                  className="flex-1 md:flex-none p-3 bg-dark-tertiary text-gray-500 hover:text-primary transition-colors"
                >
                  <Edit3 size={18} />
                </button>
                <button
                  onClick={() =>
                    deleteExperience(exp.id).then(() => fetchData())
                  }
                  className="flex-1 md:flex-none p-3 bg-dark-tertiary text-gray-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
