"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { SITE_CONFIG as DEFAULT_SITE_CONFIG } from "@/config/site";
import { CONTENT as DEFAULT_CONTENT } from "@/config/content";

export default function AdminPage() {
  const { siteConfig, updateSiteConfig, content, updateContent, customMemories, setCustomMemories } = useAppStore();
  
  const [passcode, setPasscode] = useState(siteConfig.passcode);
  const [senderName, setSenderName] = useState(siteConfig.names.sender);
  const [recipientName, setRecipientName] = useState(siteConfig.names.recipient);
  const [letterText, setLetterText] = useState(content.letterText);

  const handleSave = () => {
    updateSiteConfig({
      ...siteConfig,
      passcode,
      names: { sender: senderName, recipient: recipientName }
    });
    updateContent({
      ...content,
      letterText
    });
    alert("Saved successfully! Open the main page to see changes.");
  };

  const handleReset = () => {
    updateSiteConfig(DEFAULT_SITE_CONFIG);
    updateContent(DEFAULT_CONTENT);
    setCustomMemories([]);
    alert("Reset to defaults!");
    window.location.reload();
  };
  
  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        try {
          setCustomMemories([...customMemories, base64String]);
        } catch (error) {
          alert("Storage limit reached! Please use smaller images or fewer images.");
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = (index: number) => {
    setCustomMemories(customMemories.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <a href="/" className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 rounded hover:bg-zinc-300 dark:hover:bg-zinc-700 transition">View Site</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">General Settings</h2>
            
            <div>
              <label className="block text-sm font-medium mb-1">Passcode</label>
              <input 
                type="text" 
                value={passcode} 
                onChange={e => setPasscode(e.target.value)}
                className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Sender Name (Your Name)</label>
              <input 
                type="text" 
                value={senderName} 
                onChange={e => setSenderName(e.target.value)}
                className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Recipient Name</label>
              <input 
                type="text" 
                value={recipientName} 
                onChange={e => setRecipientName(e.target.value)}
                className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
              />
            </div>
          </div>
          
          <div className="space-y-4">
             <h2 className="text-xl font-semibold">Content Settings</h2>
             <div>
              <label className="block text-sm font-medium mb-1">Letter Text</label>
              <textarea 
                rows={10}
                value={letterText} 
                onChange={e => setLetterText(e.target.value)}
                className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
              />
              <p className="text-xs text-zinc-500 mt-1">Use [Your Name] to automatically insert the sender name.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Custom Memories (Photos)</h2>
          <p className="text-sm text-zinc-500">
            Note: These photos are stored in your browser's localStorage. For a permanent site, add photos directly to <code>public/memories/</code> before deploying to Vercel.
          </p>
          
          <div className="flex flex-wrap gap-4">
            {customMemories.map((url, idx) => (
              <div key={idx} className="relative w-32 h-32 rounded overflow-hidden border">
                <img src={url} className="w-full h-full object-cover" />
                <button 
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  X
                </button>
              </div>
            ))}
            
            <div className="w-32 h-32 border-2 border-dashed flex items-center justify-center relative cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
              <span className="text-3xl">+</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleAddImage}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-8">
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition"
          >
            Save Changes
          </button>
          <button 
            onClick={handleReset}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium transition"
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
