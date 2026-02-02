"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  ArrowLeft,
  Eye,
  Star,
  Image as ImageIcon,
  Clock,
  Calendar,
  Search,
} from "lucide-react";
import {
  saveBlogPost,
  getBlogPosts,
  deleteBlogPost,
} from "../../lib/actions/blog";
import { toast } from "sonner";

export default function BlogManagement() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const data = await getBlogPosts();
    setPosts(data);
    setLoading(false);
  }

  const handleEdit = (post: any) => {
    setCurrentPost(post);
    setPreviewUrl(post.coverImage || null);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Permanently delete this article?")) {
      await deleteBlogPost(id);
      toast.success("Post deleted");
      fetchPosts();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    toast.loading("Publishing article...", { id: "blog-save" });

    try {
      await saveBlogPost(formData, currentPost?.id);
      toast.success("Article saved!", { id: "blog-save" });
      setIsEditing(false);
      fetchPosts();
    } catch (err) {
      toast.error("Failed to save article", { id: "blog-save" });
    }
  };

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading)
    return (
      <div className="py-20 text-center font-mono animate-pulse">
        Syncing Blog Database...
      </div>
    );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-soft-white uppercase">
          {isEditing ? "Article Editor" : "Blog Library"}
        </h2>
        {!isEditing && (
          <button
            onClick={() => {
              setCurrentPost(null);
              setPreviewUrl(null);
              setIsEditing(true);
            }}
            className="bg-primary text-white px-8 py-3 font-bold flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            <Plus size={18} /> WRITE NEW POST
          </button>
        )}
      </div>

      {isEditing ? (
        /* --- EDITOR FORM --- */
        <form
          onSubmit={handleSubmit}
          className="bg-dark-secondary border border-dark-tertiary p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4"
        >
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="text-gray-500 hover:text-primary flex items-center gap-2 text-xs font-mono"
          >
            <ArrowLeft size={14} /> DISCARD CHANGES
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-gray-500 uppercase">
                Article Title
              </label>
              <input
                name="title"
                defaultValue={currentPost?.title}
                className="w-full bg-dark-primary border border-dark-tertiary p-3 text-soft-white outline-none focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-gray-500 uppercase">
                Read Time (e.g. 5 min read)
              </label>
              <input
                name="readMin"
                defaultValue={currentPost?.readMin}
                placeholder="5 min read"
                className="w-full bg-dark-primary border border-dark-tertiary p-3 text-soft-white outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-gray-500 uppercase">
                Hashtags
              </label>
              <input
                name="hashtags"
                defaultValue={currentPost?.hashtags}
                placeholder="#tech #coding"
                className="w-full bg-dark-primary border border-dark-tertiary p-3 text-soft-white outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-gray-500 uppercase">
                Cover Image
              </label>
              <input
                type="file"
                name="coverImage"
                accept="image/*"
                onChange={(e) =>
                  e.target.files?.[0] &&
                  setPreviewUrl(URL.createObjectURL(e.target.files[0]))
                }
                className="w-full bg-dark-primary border border-dark-tertiary p-2 text-xs text-gray-500"
              />
              <input
                type="hidden"
                name="existingImage"
                value={currentPost?.coverImage || ""}
              />
            </div>

            {previewUrl && (
              <div className="md:col-span-2 aspect-[21/9] w-full border border-dark-tertiary overflow-hidden">
                <img
                  src={previewUrl}
                  className="w-full h-full object-cover"
                  alt="Preview"
                />
              </div>
            )}

            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-mono text-gray-500 uppercase">
                Excerpt (SEO Summary)
              </label>
              <textarea
                name="excerpt"
                defaultValue={currentPost?.excerpt}
                rows={2}
                className="w-full bg-dark-primary border border-dark-tertiary p-3 text-soft-white outline-none resize-none"
                required
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-mono text-gray-500 uppercase">
                Article Content (Markdown/Text)
              </label>
              <textarea
                name="content"
                defaultValue={currentPost?.content}
                className="w-full bg-dark-primary border border-dark-tertiary p-4 text-soft-white outline-none min-h-[400px] font-sans leading-relaxed"
                required
              />
            </div>
          </div>

          <div className="flex gap-8 border-t border-dark-tertiary pt-6">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                name="published"
                defaultChecked={currentPost?.published}
                className="accent-primary w-4 h-4"
              />
              <span className="text-xs font-mono text-gray-400 group-hover:text-soft-white uppercase">
                Visible to Public
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                name="frontPage"
                defaultChecked={currentPost?.frontPage}
                className="accent-primary w-4 h-4"
              />
              <span className="text-xs font-mono text-gray-400 group-hover:text-soft-white uppercase">
                Feature on Home
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-white font-black py-5 uppercase tracking-widest transition-all"
          >
            <Save size={18} className="inline mr-2" /> Commit to Production
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
              placeholder="FILTER BY TITLE..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark-secondary border border-dark-tertiary p-4 pl-12 text-soft-white text-xs font-mono focus:border-primary outline-none"
            />
          </div>

          <div className="grid gap-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-dark-secondary border border-dark-tertiary p-6 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="w-20 h-12 bg-dark-primary border border-dark-tertiary shrink-0 overflow-hidden">
                    {post.coverImage && (
                      <img
                        src={post.coverImage}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-soft-white group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex gap-4 mt-1 text-[10px] font-mono text-gray-500 uppercase">
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />{" "}
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} /> {post.readMin || "N/A"}
                      </span>
                      <span className="flex items-center gap-1 text-primary">
                        <Eye size={10} /> {post.views}
                      </span>
                      <span className="flex items-center gap-1 text-yellow-500">
                        <Star size={10} /> {post.stars}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-3 bg-dark-tertiary text-gray-400 hover:text-primary transition-colors"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-3 bg-dark-tertiary text-gray-400 hover:text-red-500 transition-colors"
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
