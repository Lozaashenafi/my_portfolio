"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  MailOpen,
  Trash2,
  User,
  Calendar,
  ChevronRight,
  Search,
  CheckCircle,
  Trash,
  Info,
  Inbox,
} from "lucide-react";
import {
  getMessages,
  markAsRead,
  deleteMessage,
} from "../../lib/actions/messages";
import { toast } from "sonner";

export default function MessageInbox() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    setLoading(true);
    const data = await getMessages();
    setMessages(data);
    setLoading(false);
  }

  const selectedMessage = messages.find((m) => m.id === selectedId);

  const handleSelect = async (m: any) => {
    setSelectedId(m.id);
    if (!m.isRead) {
      await markAsRead(m.id, true);
      // Update local state to show as read immediately
      setMessages(
        messages.map((msg) =>
          msg.id === m.id ? { ...msg, isRead: true } : msg,
        ),
      );
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Don't trigger the select handler
    if (confirm("Delete this message permanently?")) {
      await deleteMessage(id);
      toast.success("Message deleted");
      if (selectedId === id) setSelectedId(null);
      fetchMessages();
    }
  };

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subject?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-6 h-[calc(100vh-180px)]">
      {/* Header Area */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-soft-white uppercase leading-none">
            Inquiries
          </h2>
          <p className="text-gray-500 text-xs font-mono mt-2 uppercase tracking-widest">
            {unreadCount} UNREAD MESSAGES / {messages.length} TOTAL
          </p>
        </div>
        <div className="relative w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
            size={14}
          />
          <input
            type="text"
            placeholder="FILTER INBOX..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-secondary border border-dark-tertiary p-2 pl-10 text-[10px] font-mono text-soft-white focus:border-primary outline-none uppercase"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full overflow-hidden">
        {/* LEFT COLUMN: MESSAGE LIST */}
        <div className="lg:col-span-5 flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-2">
          {loading ? (
            <div className="py-20 text-center font-mono text-primary animate-pulse">
              Syncing Inbox...
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-dark-tertiary">
              <Inbox className="mx-auto text-gray-700 mb-2" size={32} />
              <p className="text-xs font-mono text-gray-500 uppercase">
                Inbox Empty
              </p>
            </div>
          ) : (
            filteredMessages.map((m) => (
              <div
                key={m.id}
                onClick={() => handleSelect(m)}
                className={`
                  p-4 cursor-pointer border transition-all relative group
                  ${selectedId === m.id ? "bg-primary border-primary" : "bg-dark-secondary border-dark-tertiary hover:border-gray-600"}
                  ${!m.isRead && selectedId !== m.id ? "border-l-4 border-l-primary" : ""}
                `}
              >
                <div className="flex justify-between items-start mb-1">
                  <span
                    className={`text-[10px] font-mono uppercase font-bold ${selectedId === m.id ? "text-white" : "text-primary"}`}
                  >
                    {m.isRead ? "READ" : "NEW MESSAGE"}
                  </span>
                  <span
                    className={`text-[10px] font-mono ${selectedId === m.id ? "text-white/60" : "text-gray-500"}`}
                  >
                    {new Date(m.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h4
                  className={`text-sm font-bold truncate ${selectedId === m.id ? "text-white" : "text-soft-white"}`}
                >
                  {m.name}
                </h4>
                <p
                  className={`text-xs truncate ${selectedId === m.id ? "text-white/80" : "text-gray-500"}`}
                >
                  {m.subject || "No Subject"}
                </p>

                <button
                  onClick={(e) => handleDelete(e, m.id)}
                  className={`absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-red-500 ${selectedId === m.id ? "text-white" : "text-gray-600"}`}
                >
                  <Trash size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* RIGHT COLUMN: READING PANE */}
        <div className="lg:col-span-7 bg-dark-secondary border border-dark-tertiary overflow-hidden flex flex-col">
          {selectedMessage ? (
            <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="p-8 border-b border-dark-tertiary bg-dark-primary/30">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary flex items-center justify-center font-black text-xl text-white">
                      {selectedMessage.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-soft-white leading-none mb-1">
                        {selectedMessage.name}
                      </h3>
                      <p className="text-xs font-mono text-primary">
                        {selectedMessage.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono text-gray-500 uppercase">
                      Received At
                    </p>
                    <p className="text-xs font-bold text-soft-white">
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <h2 className="text-lg font-bold text-soft-white">
                  Sub: {selectedMessage.subject || "No Subject Provided"}
                </h2>
              </div>

              <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                <div className="bg-dark-primary border border-dark-tertiary p-6 text-gray-300 leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="p-6 border-t border-dark-tertiary flex gap-4">
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="flex-1 bg-primary hover:bg-secondary text-white font-bold py-3 text-center transition-all uppercase text-xs tracking-widest"
                >
                  Reply via Email
                </a>
                <button
                  onClick={(e) => handleDelete(e, selectedMessage.id)}
                  className="px-6 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all uppercase text-[10px] font-bold"
                >
                  Delete Thread
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-600 gap-4">
              <div className="w-16 h-16 border-2 border-dashed border-gray-800 rounded-full flex items-center justify-center">
                <Mail size={24} className="opacity-20" />
              </div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] opacity-40">
                Select a message to read
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
