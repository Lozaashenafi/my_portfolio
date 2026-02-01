"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Upload,
  Trash2,
  Download,
  CheckCircle,
  FileWarning,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { getCv, uploadCv, deleteCv } from "../../lib/actions/cv";
import { toast } from "sonner";

export default function CvManagement() {
  const [currentCv, setCurrentCv] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchCv();
  }, []);

  async function fetchCv() {
    setLoading(true);
    const data = await getCv();
    setCurrentCv(data);
    setLoading(false);
  }

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData(e.currentTarget);

    try {
      await uploadCv(formData);
      toast.success("Resume updated successfully");
      fetchCv();
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast.error("Upload failed. Please try a valid PDF.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to remove your current resume?")) {
      await deleteCv(currentCv.id, currentCv.filePath);
      toast.success("Resume removed");
      setCurrentCv(null);
    }
  };

  return (
    <div className="max-w-4xl space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-soft-white uppercase leading-none">
          CV / Resume Manager
        </h2>
        <p className="text-gray-500 text-xs font-mono mt-2 uppercase tracking-widest">
          Upload and manage your professional curriculum vitae
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* UPLOAD CARD */}
        <div className="bg-dark-secondary border border-dark-tertiary p-8 rounded-sm space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Upload className="text-primary" size={20} />
            <h3 className="text-lg font-bold text-soft-white uppercase">
              Upload New CV
            </h3>
          </div>

          <form onSubmit={handleUpload} className="space-y-6">
            <div className="relative group">
              <input
                type="file"
                name="cvFile"
                accept=".pdf"
                required
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-full bg-dark-primary border-2 border-dashed border-dark-tertiary p-10 text-center group-hover:border-primary transition-all">
                <FileText
                  className="mx-auto mb-3 text-gray-600 group-hover:text-primary"
                  size={32}
                />
                <p className="text-xs font-mono text-gray-500 uppercase">
                  Select PDF File
                </p>
                <p className="text-[10px] text-gray-700 mt-1">MAX SIZE: 5MB</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="w-full bg-primary hover:bg-secondary text-white font-black py-4 flex items-center justify-center gap-2 transition-all uppercase text-xs tracking-widest disabled:opacity-50"
            >
              {isUploading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Upload size={18} />
              )}
              {isUploading ? "Uploading..." : "Publish Resume"}
            </button>
          </form>
        </div>

        {/* STATUS CARD */}
        <div className="bg-dark-secondary border border-dark-tertiary p-8 rounded-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`p-2 rounded-full ${currentCv ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}`}
              >
                {currentCv ? (
                  <CheckCircle size={20} />
                ) : (
                  <FileWarning size={20} />
                )}
              </div>
              <h3 className="text-lg font-bold text-soft-white uppercase">
                Current Status
              </h3>
            </div>

            {loading ? (
              <p className="text-xs font-mono text-gray-600 animate-pulse">
                Checking records...
              </p>
            ) : currentCv ? (
              <div className="space-y-4">
                <div className="p-4 bg-dark-primary border border-dark-tertiary rounded-sm">
                  <p className="text-[10px] font-mono text-gray-500 uppercase mb-1">
                    Active File Path
                  </p>
                  <p className="text-xs text-soft-white truncate font-mono">
                    {currentCv.filePath}
                  </p>
                </div>
                <div className="p-4 bg-dark-primary border border-dark-tertiary rounded-sm">
                  <p className="text-[10px] font-mono text-gray-500 uppercase mb-1">
                    Last Updated
                  </p>
                  <p className="text-xs text-soft-white font-mono">
                    {new Date(currentCv.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6 border border-dashed border-dark-tertiary text-center">
                <p className="text-xs font-mono text-gray-600 uppercase">
                  No active CV found
                </p>
              </div>
            )}
          </div>

          {currentCv && (
            <div className="flex gap-3 mt-8">
              <a
                href={currentCv.filePath}
                target="_blank"
                className="flex-1 bg-dark-tertiary hover:bg-dark-primary text-soft-white text-[10px] font-bold py-3 flex items-center justify-center gap-2 uppercase transition-all border border-dark-tertiary"
              >
                <ExternalLink size={14} /> Preview
              </a>
              <button
                onClick={handleDelete}
                className="flex-1 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white text-[10px] font-bold py-3 flex items-center justify-center gap-2 uppercase transition-all"
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
