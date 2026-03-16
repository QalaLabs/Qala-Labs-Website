"use client";

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { 
  Upload, Search, Grid, List, Trash2, 
  Copy, ExternalLink, Filter, MoreVertical,
  FileText, Image as ImageIcon, FileVideo, Loader2,
  RefreshCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { showSuccess, showError } from '@/utils/toast';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { getOptimizedImageUrl, formatBytes } from '@/utils/media';
import { useAuth } from '@/context/AuthContext';

const MediaManager = () => {
  const { user } = useAuth();
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState("");

  const fetchFiles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('media_library')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) showError("Failed to fetch media library");
    else setFiles(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    try {
      // 1. Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      // 3. Save to Database
      const { error: dbError } = await supabase.from('media_library').insert({
        user_id: user.id,
        file_name: file.name,
        url: publicUrl,
        storage_path: filePath,
        file_size: file.size,
        mime_type: file.type
      });

      if (dbError) throw dbError;

      showSuccess("Media uploaded successfully");
      fetchFiles();
    } catch (error: any) {
      showError(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (file: any) => {
    if (!confirm("Delete this file permanently?")) return;

    try {
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([file.storage_path]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('media_library')
        .delete()
        .eq('id', file.id);

      if (dbError) throw dbError;

      showSuccess("File deleted");
      fetchFiles();
    } catch (error: any) {
      showError(error.message || "Delete failed");
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showSuccess("URL copied to clipboard");
  };

  const filteredFiles = files.filter(f => f.file_name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />
      
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Media Library</h1>
            <p className="text-slate-500">Manage your images, videos, and documents.</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={fetchFiles} variant="outline" className="rounded-xl h-12">
              <RefreshCcw className={cn("w-4 h-4", loading && "animate-spin")} />
            </Button>
            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-black flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20">
              {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
              Upload Media
              <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
          </div>
        </header>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  placeholder="Search media..." 
                  className="pl-12 h-12 rounded-xl border-slate-100"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => setViewMode('grid')}
                className={cn("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-white shadow-sm text-blue-600" : "text-slate-400")}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={cn("p-2 rounded-lg transition-all", viewMode === 'list' ? "bg-white shadow-sm text-blue-600" : "text-slate-400")}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-8">
            {loading ? (
              <div className="py-20 flex justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredFiles.map((file) => (
                  <Card key={file.id} className="group border-none shadow-sm hover:shadow-xl transition-all overflow-hidden rounded-2xl bg-slate-50">
                    <div className="aspect-square relative bg-slate-200 flex items-center justify-center overflow-hidden">
                      {file.mime_type?.startsWith('image/') ? (
                        <img 
                          src={getOptimizedImageUrl(file.storage_path, { width: 400, height: 400 })} 
                          alt={file.file_name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      ) : file.mime_type?.startsWith('video/') ? (
                        <FileVideo className="w-12 h-12 text-slate-400" />
                      ) : (
                        <FileText className="w-12 h-12 text-slate-400" />
                      )}
                      
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button size="icon" variant="secondary" className="rounded-full" onClick={() => copyUrl(file.url)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="destructive" className="rounded-full" onClick={() => deleteFile(file)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-xs font-bold text-slate-900 truncate mb-1">{file.file_name}</p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{formatBytes(file.file_size)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <tr>
                      <th className="pb-4">File</th>
                      <th className="pb-4">Type</th>
                      <th className="pb-4">Size</th>
                      <th className="pb-4">Date</th>
                      <th className="pb-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredFiles.map((file) => (
                      <tr key={file.id} className="group hover:bg-slate-50 transition-colors">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 overflow-hidden">
                              {file.mime_type?.startsWith('image/') ? (
                                <img src={getOptimizedImageUrl(file.storage_path, { width: 80, height: 80 })} className="w-full h-full object-cover" />
                              ) : <FileText className="w-5 h-5" />}
                            </div>
                            <span className="text-sm font-bold text-slate-900">{file.file_name}</span>
                          </div>
                        </td>
                        <td className="py-4 text-xs text-slate-500">{file.mime_type}</td>
                        <td className="py-4 text-xs text-slate-500">{formatBytes(file.file_size)}</td>
                        <td className="py-4 text-xs text-slate-500">{format(new Date(file.created_at), 'MMM dd, yyyy')}</td>
                        <td className="py-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" onClick={() => copyUrl(file.url)}><Copy className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-red-500" onClick={() => deleteFile(file)}><Trash2 className="w-4 h-4" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MediaManager;