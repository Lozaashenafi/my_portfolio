"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  Globe,
  Github,
  ArrowLeft,
  Save,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Search,
  Star,
  Code,
} from "lucide-react";
import {
  deleteProject,
  saveProject,
  getProjects,
  getAllSkills,
} from "../../lib/actions/projects";
import { toast } from "sonner";

export default function ProjectManagement() {
  // State
  const [projects, setProjects] = useState<any[]>([]);
  const [availableSkills, setAvailableSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);

  // Form State
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Initial Data Fetch
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [p, s] = await Promise.all([getProjects(), getAllSkills()]);
      setProjects(p);
      setAvailableSkills(s);
    } catch (error) {
      toast.error("Failed to load data from database");
    } finally {
      setLoading(false);
    }
  }

  // Handlers
  const handleEdit = (project: any) => {
    setCurrentProject(project);
    setImageUrl(project.coverImage || null);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to permanently delete this project?")) {
      try {
        toast.loading("Deleting project...", { id: "delete-project" });
        await deleteProject(id);
        toast.success("Project removed successfully", { id: "delete-project" });
        fetchData();
      } catch (error) {
        toast.error("Error deleting project", { id: "delete-project" });
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      toast.loading("Uploading assets and saving project...", {
        id: "save-project",
      });
      await saveProject(formData, currentProject?.id);
      toast.success(
        currentProject
          ? "Project updated successfully"
          : "New project created successfully",
        { id: "save-project" },
      );
      setIsEditing(false);
      setCurrentProject(null);
      setImageUrl(null);
      fetchData();
    } catch (error) {
      toast.error("Failed to save project. Check server logs.", {
        id: "save-project",
      });
    }
  };

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
          Syncing with database...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-soft-white uppercase leading-none">
            {isEditing ? "Project / Editor" : "Project / Library"}
          </h2>
          <p className="text-gray-500 text-xs font-mono mt-2 uppercase tracking-widest">
            {isEditing
              ? "Modify project metadata and technical assets"
              : "Manage your digital work and showcased items"}
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => {
              setCurrentProject(null);
              setImageUrl(null);
              setIsEditing(true);
            }}
            className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
          >
            <Plus size={18} /> NEW PROJECT
          </button>
        )}
      </div>

      {isEditing ? (
        /* --- FORM VIEW --- */
        <form
          onSubmit={handleFormSubmit}
          className="bg-dark-secondary border border-dark-tertiary p-8 rounded-sm space-y-10 animate-in fade-in slide-in-from-bottom-4"
        >
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="text-gray-500 hover:text-primary flex items-center gap-2 text-xs font-mono transition-colors"
          >
            <ArrowLeft size={14} /> DISCARD CHANGES
          </button>

          {/* Section 01: Basic Info */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest border-b border-dark-tertiary pb-2">
              01. Basic Information
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-500 uppercase">
                  Project Title
                </label>
                <input
                  name="title"
                  defaultValue={currentProject?.title}
                  className="w-full bg-dark-primary border border-dark-tertiary p-3 text-soft-white focus:border-primary outline-none transition-all"
                  placeholder="e.g. Modern Portfolio"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-500 uppercase">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={currentProject?.description}
                  rows={4}
                  className="w-full bg-dark-primary border border-dark-tertiary p-3 text-soft-white focus:border-primary outline-none resize-none"
                  placeholder="Summarize the project goals and features..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 02: Visuals & Links */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest border-b border-dark-tertiary pb-2">
              02. Assets & Media
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {/* File Upload Field */}
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">
                    Upload Cover Image (Real File)
                  </label>
                  <div className="relative group h-32">
                    <input
                      type="file"
                      name="coverImage"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setImageUrl(URL.createObjectURL(file));
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="absolute inset-0 border-2 border-dashed border-dark-tertiary group-hover:border-primary transition-all flex flex-col items-center justify-center bg-dark-primary gap-2 pointer-events-none">
                      <ImageIcon size={20} className="text-gray-500" />
                      <span className="text-[10px] font-mono text-gray-500 uppercase">
                        Select image file
                      </span>
                    </div>
                  </div>
                  {/* Keep old path if no new file selected */}
                  <input
                    type="hidden"
                    name="existingImageUrl"
                    value={currentProject?.coverImage || ""}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-gray-500 uppercase">
                      GitHub Repository
                    </label>
                    <input
                      name="githubUrl"
                      defaultValue={currentProject?.githubUrl}
                      className="w-full bg-dark-primary border border-dark-tertiary p-3 text-soft-white text-xs focus:border-primary outline-none"
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-gray-500 uppercase">
                      Live Demo Link
                    </label>
                    <input
                      name="liveUrl"
                      defaultValue={currentProject?.liveUrl}
                      className="w-full bg-dark-primary border border-dark-tertiary p-3 text-soft-white text-xs focus:border-primary outline-none"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              {/* Preview Box */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-500 uppercase">
                  Image Preview
                </label>
                <div className="aspect-video bg-dark-primary border border-dark-tertiary rounded-sm overflow-hidden flex items-center justify-center relative">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-700 gap-2">
                      <Code size={48} className="opacity-10" />
                      <span className="text-[10px] font-mono uppercase opacity-40">
                        No Assets Selected
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 03: Tech Stack */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest border-b border-dark-tertiary pb-2">
              03. Technology Stack
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {availableSkills.map((skill) => {
                const isChecked = currentProject?.skills?.some(
                  (s: any) => s.skillId === skill.id,
                );
                return (
                  <label
                    key={skill.id}
                    className="flex items-center gap-3 p-4 bg-dark-primary border border-dark-tertiary hover:border-primary/50 cursor-pointer transition-all group"
                  >
                    <input
                      type="checkbox"
                      name="skills"
                      value={skill.id}
                      defaultChecked={isChecked}
                      className="accent-primary w-4 h-4"
                    />
                    <span className="text-xs font-mono text-gray-400 group-hover:text-soft-white">
                      {skill.name}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Section 04: Configuration */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-primary uppercase tracking-widest border-b border-dark-tertiary pb-2">
              04. Display Configuration
            </h3>
            <div className="flex flex-wrap gap-10">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="featured"
                  defaultChecked={currentProject?.featured}
                  className="accent-primary w-5 h-5"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-soft-white">
                    Featured Project
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase font-mono tracking-tighter">
                    Large home display
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="highlighted"
                  defaultChecked={currentProject?.highlighted}
                  className="accent-primary w-5 h-5"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-soft-white">
                    Highlighted
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase font-mono tracking-tighter">
                    Mark with special badge
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="published"
                  defaultChecked={currentProject?.published ?? true}
                  className="accent-primary w-5 h-5"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-soft-white">
                    Live Status
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase font-mono tracking-tighter">
                    Visible to visitors
                  </span>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-white font-black py-5 flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/10 uppercase tracking-widest"
          >
            <Save size={20} /> Commit Project Data
          </button>
        </form>
      ) : (
        /* --- LIST VIEW --- */
        <div className="space-y-6">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Filter by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark-secondary border border-dark-tertiary p-4 pl-12 text-soft-white text-xs font-mono focus:border-primary outline-none transition-all uppercase"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredProjects.length === 0 && (
              <div className="text-center py-20 border border-dashed border-dark-tertiary bg-dark-secondary/20 rounded-sm">
                <AlertCircle className="text-gray-600 mx-auto mb-4" size={40} />
                <p className="text-gray-500 font-mono text-xs uppercase">
                  No matching entries
                </p>
              </div>
            )}

            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-dark-secondary border border-dark-tertiary p-6 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="hidden sm:block w-24 h-16 bg-dark-primary border border-dark-tertiary rounded-sm overflow-hidden shrink-0">
                    {project.coverImage ? (
                      <img
                        src={project.coverImage}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                        alt=""
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-800">
                        <Code size={20} />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-soft-white group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex gap-1">
                        {project.featured && (
                          <span className="text-[8px] font-mono bg-primary/20 text-primary border border-primary/20 px-1 py-0.5 font-bold">
                            FEAT
                          </span>
                        )}
                        {project.highlighted && (
                          <span className="text-[8px] font-mono bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-1 py-0.5 font-bold">
                            HIGH
                          </span>
                        )}
                        {!project.published && (
                          <span className="text-[8px] font-mono bg-gray-500/10 text-gray-400 border border-gray-500/20 px-1 py-0.5 font-bold">
                            DRAFT
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-x-4">
                      <p className="text-[10px] font-mono text-gray-500 uppercase">
                        <CheckCircle2
                          className="inline mr-1 text-green-500"
                          size={10}
                        />
                        {project.skills?.length || 0} Technologies
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-3 text-gray-400 hover:text-primary bg-dark-tertiary hover:bg-dark-primary transition-all rounded-sm"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-3 text-gray-400 hover:text-red-500 bg-dark-tertiary hover:bg-dark-primary transition-all rounded-sm"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
