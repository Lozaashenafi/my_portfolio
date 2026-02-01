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
  Hash,
  Image as ImageIcon,
} from "lucide-react";
import { saveBlogPost } from "../../lib/actions/blog";
import prisma from "../../lib/prisma"; // Note: Use an action to get data if this is client
import { toast } from "sonner";

export default function BlogManagement() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);

  // You would fetch posts here using a getPosts action...

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-soft-white uppercase">
          Blog Articles
        </h2>
        {!isEditing && (
          <button
            onClick={() => {
              setCurrentPost(null);
              setIsEditing(true);
            }}
            className="bg-primary text-white px-6 py-2 font-bold flex items-center gap-2"
          >
            <Plus size={18} /> WRITE POST
          </button>
        )}
      </div>

      {isEditing ? (
        <form
          action={(fd) =>
            saveBlogPost(fd, currentPost?.id).then(() => setIsEditing(false))
          }
          className="bg-dark-secondary border border-dark-tertiary p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="title"
              defaultValue={currentPost?.title}
              placeholder="Article Title"
              className="w-full bg-dark-primary border border-dark-tertiary p-3 text-soft-white outline-none"
              required
            />
            <input
              name="hashtags"
              defaultValue={currentPost?.hashtags}
              placeholder="Hashtags (e.g. #react #nextjs)"
              className="w-full bg-dark-primary border border-dark-tertiary p-3 text-soft-white outline-none"
            />
            <input
              type="file"
              name="coverImage"
              className="text-xs text-gray-500"
            />
            <textarea
              name="excerpt"
              defaultValue={currentPost?.excerpt}
              placeholder="Brief summary for the card view..."
              className="md:col-span-2 w-full bg-dark-primary border border-dark-tertiary p-3 text-soft-white outline-none resize-none"
              rows={2}
              required
            />
            <textarea
              name="content"
              defaultValue={currentPost?.content}
              placeholder="Write your full article content here..."
              className="md:col-span-2 w-full bg-dark-primary border border-dark-tertiary p-3 text-soft-white outline-none min-h-[400px]"
              required
            />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <input
                type="checkbox"
                name="published"
                defaultChecked={currentPost?.published}
                className="accent-primary"
              />{" "}
              Published
            </label>
            <label className="flex items-center gap-2 text-xs font-mono text-gray-500">
              <input
                type="checkbox"
                name="frontPage"
                defaultChecked={currentPost?.frontPage}
                className="accent-primary"
              />{" "}
              Show on Home Page
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-black py-4 uppercase tracking-widest"
          >
            <Save size={18} className="inline mr-2" /> Publish Article
          </button>
        </form>
      ) : (
        /* List of posts with Eye and Star counts visible */
        <div className="grid gap-4">
          {/* Map your posts here showing stars/views... */}
          <p className="text-gray-500 font-mono text-xs">
            Articles will appear here once you fetch them.
          </p>
        </div>
      )}
    </div>
  );
}
