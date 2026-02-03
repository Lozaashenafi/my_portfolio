"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  ArrowLeft,
  Eye,
  Star,
  Clock,
  Calendar,
  Search,
  Hash, // Replaced LinkIcon with Hash
} from "lucide-react";
import {
  saveBlogPost,
  getBlogPosts,
  deleteBlogPost,
} from "../../lib/actions/blog";
import { toast } from "sonner";

const RichTextEditor = dynamic(() => import("../ui/RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-[450px] w-full bg-dark-secondary animate-pulse border border-dark-tertiary" />
  ),
});

export default function BlogManagement() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Form Specific States
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    try {
      const data = await getBlogPosts();
      setPosts(data);
    } catch (err) {
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (post: any) => {
    setCurrentPost(post);
    setEditorContent(post.content || "");
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

    toast.loading("Committing to database...", { id: "blog-save" });

    try {
      await saveBlogPost(formData, currentPost?.id);
      toast.success("Article live!", { id: "blog-save" });
      setIsEditing(false);
      fetchPosts();
    } catch (err) {
      toast.error("Save failed. Check console.", { id: "blog-save" });
    }
  };

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading)
    return (
      <div className="py-20 text-center font-mono animate-pulse text-gray-500">
        INITIALIZING BLOG_DATABASE...
      </div>
    );

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black text-soft-white uppercase tracking-tighter">
            {isEditing ? "Content Creator" : "Article Library"}
          </h2>
          <p className="text-gray-500 font-mono text-xs uppercase mt-1">
            {isEditing ? "Drafting Mode" : `Total Posts: ${posts.length}`}
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => {
              setCurrentPost(null);
              setEditorContent("");
              setPreviewUrl(null);
              setIsEditing(true);
            }}
            className="bg-primary hover:bg-white hover:text-black transition-all text-white px-8 py-4 font-bold flex items-center gap-2 shadow-xl shadow-primary/10"
          >
            <Plus size={20} /> CREATE NEW ENTRY
          </button>
        )}
      </div>

      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="bg-dark-secondary border border-dark-tertiary p-6 md:p-10 space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          {/* Back Action */}
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="group text-gray-500 hover:text-primary flex items-center gap-2 text-xs font-mono transition-colors"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            RETURN TO LIBRARY
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Title Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                Article Title
              </label>
              <input
                name="title"
                defaultValue={currentPost?.title}
                placeholder="Enter title..."
                className="w-full bg-dark-primary border border-dark-tertiary p-4 text-soft-white outline-none focus:border-primary transition-colors text-lg font-bold"
                required
              />
            </div>

            {/* Hashtags Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                Hashtags <Hash size={12} className="text-primary" />
              </label>
              <input
                name="hashtags"
                defaultValue={currentPost?.hashtags}
                placeholder="#nextjs #coding #webdev"
                className="w-full bg-dark-primary border border-dark-tertiary p-4 text-soft-white font-mono text-sm outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Rich Text Editor */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                Body Content
              </label>
              <input type="hidden" name="content" value={editorContent} />
              <RichTextEditor
                content={editorContent}
                onChange={setEditorContent}
              />
            </div>

            {/* Read Time */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                Read Estimated Time
              </label>
              <input
                name="readMin"
                defaultValue={currentPost?.readMin}
                placeholder="e.g. 8 min read"
                className="w-full bg-dark-primary border border-dark-tertiary p-4 text-soft-white outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                Hero Image
              </label>
              <input
                type="file"
                name="coverImage"
                accept="image/*"
                onChange={(e) =>
                  e.target.files?.[0] &&
                  setPreviewUrl(URL.createObjectURL(e.target.files[0]))
                }
                className="w-full bg-dark-primary border border-dark-tertiary p-3 text-xs text-gray-500 cursor-pointer file:bg-dark-tertiary file:text-white file:border-none file:px-4 file:py-1 file:mr-4"
              />
              <input
                type="hidden"
                name="existingImage"
                value={currentPost?.coverImage || ""}
              />
            </div>

            {/* Image Preview */}
            {previewUrl && (
              <div className="md:col-span-2 aspect-[21/9] w-full border border-dark-tertiary overflow-hidden bg-black/20">
                <img
                  src={previewUrl}
                  className="w-full h-full object-cover"
                  alt="Preview"
                />
              </div>
            )}

            {/* Excerpt */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                Excerpt (Meta Description)
              </label>
              <textarea
                name="excerpt"
                defaultValue={currentPost?.excerpt}
                rows={2}
                placeholder="A short summary for SEO..."
                className="w-full bg-dark-primary border border-dark-tertiary p-4 text-soft-white outline-none resize-none focus:border-primary transition-colors"
                required
              />
            </div>
          </div>

          {/* Visibility Controls */}
          <div className="flex gap-8 border-y border-dark-tertiary/50 py-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="published"
                defaultChecked={currentPost ? currentPost.published : true}
                className="accent-primary w-5 h-5 transition-transform group-hover:scale-110"
              />
              <span className="text-xs font-mono text-gray-400 group-hover:text-soft-white uppercase">
                Publish to Public
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="frontPage"
                defaultChecked={currentPost?.frontPage}
                className="accent-primary w-5 h-5 transition-transform group-hover:scale-110"
              />
              <span className="text-xs font-mono text-gray-400 group-hover:text-soft-white uppercase">
                Feature on Homepage
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary text-white font-black py-6 uppercase tracking-[0.2em] transition-all transform active:scale-[0.99]"
          >
            <Save size={20} className="inline mr-3" /> Save & Push Production
          </button>
        </form>
      ) : (
        /* --- LIST VIEW --- */
        <div className="space-y-6">
          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="SEARCH DATABASE BY TITLE..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark-secondary border border-dark-tertiary p-5 pl-14 text-soft-white text-xs font-mono focus:border-primary outline-none transition-all"
            />
          </div>

          <div className="grid gap-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-dark-secondary border border-dark-tertiary p-6 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-primary/40 transition-all"
                >
                  <div className="flex items-center gap-6 flex-1 w-full">
                    <div className="w-24 h-16 bg-dark-primary border border-dark-tertiary shrink-0 overflow-hidden hidden sm:block">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-dark-tertiary font-mono text-[8px]">
                          NO_IMG
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {!post.published && (
                          <span className="text-[8px] bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-0.5 font-mono">
                            DRAFT
                          </span>
                        )}
                        <h3 className="font-bold text-soft-white group-hover:text-primary transition-colors truncate">
                          {post.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-4 mt-2 text-[9px] font-mono text-gray-500 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-gray-600" />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} className="text-gray-600" />
                          {post.readMin || "N/A"}
                        </span>
                        <span className="flex items-center gap-1.5 text-primary/80">
                          <Eye size={12} /> {post.views}
                        </span>
                        <span className="flex items-center gap-1.5 text-yellow-500/80">
                          <Star size={12} /> {post.stars}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 w-full md:w-auto">
                    <button
                      onClick={() => handleEdit(post)}
                      className="flex-1 md:flex-none p-3 bg-dark-tertiary/50 text-gray-400 hover:text-primary hover:bg-dark-tertiary transition-all"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="flex-1 md:flex-none p-3 bg-dark-tertiary/50 text-gray-400 hover:text-red-500 hover:bg-dark-tertiary transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center border border-dashed border-dark-tertiary text-gray-600 font-mono text-sm uppercase">
                No matching records found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
