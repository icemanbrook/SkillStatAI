// src/components/FileUploader.jsx
import React, { useState, useRef } from "react";
import { UploadCloud, FileText, Loader2, AlertCircle } from "lucide-react";
import { validateUploadFile } from "../services/uploadService";

export default function FileUploader({ onFileSelect, status = "idle", progressText = "", errorMessage = "" }) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    const { valid, error } = validateUploadFile(file);
    if (!valid) {
      if (onFileSelect) onFileSelect(null, error);
      return;
    }
    setSelectedFile(file);
    if (onFileSelect) onFileSelect(file, null);
  };

  const warmBrown = "#8C7355";

  return (
    <div className="w-full">
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full p-8 md:p-10 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? "border-[#8C7355] bg-[#F5EFE6] scale-[1.01]"
            : "border-[#EAE3DA] hover:border-[#8C7355] bg-white hover:bg-[#FAF6F0]"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.ppt,.pptx,.doc,.docx"
          onChange={handleFileInput}
          className="hidden"
        />

        {status === "processing" ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="animate-spin text-[#8C7355]" size={42} />
            <p className="text-base font-medium text-[#36302B]">{progressText || "Processing file..."}</p>
            <p className="text-xs text-[#786558]">Analyzing learning material & extracting concepts</p>
          </div>
        ) : selectedFile ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[#F5EFE6] flex items-center justify-center text-[#8C7355]">
              <FileText size={28} />
            </div>
            <div>
              <p className="text-base font-semibold text-[#36302B]">{selectedFile.name}</p>
              <p className="text-xs text-[#786558] mt-0.5">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for AI extraction
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
                if (onFileSelect) onFileSelect(null, null);
              }}
              className="mt-1 text-xs text-[#8C7B6B] hover:text-[#36302B] underline"
            >
              Choose a different file
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[#F5EFE6] flex items-center justify-center text-[#8C7355]">
              <UploadCloud size={28} />
            </div>
            <div>
              <p className="text-base font-medium text-[#36302B]">
                Drag and drop your learning material here
              </p>
              <p className="text-xs text-[#786558] mt-1">
                Supported formats: <span className="font-semibold text-[#36302B]">PDF • PPT • DOCX</span> (Max 25MB)
              </p>
            </div>
            <button
              type="button"
              className="mt-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-colors"
              style={{ background: warmBrown }}
            >
              Browse Files
            </button>
          </div>
        )}
      </div>

      {/* Error display */}
      {errorMessage && (
        <div className="mt-3 p-3.5 rounded-2xl bg-[#FAF0F0] border border-[#E5A9A9] flex items-center gap-2.5 text-sm text-[#902A2A]">
          <AlertCircle size={18} className="shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
