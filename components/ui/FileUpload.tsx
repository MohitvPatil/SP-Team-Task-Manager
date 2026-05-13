"use client";

import {
  useState,
} from "react";

import toast from "react-hot-toast";

import { Upload } from "lucide-react";

import { uploadFile } from "@/services/uploadService";

export default function FileUpload() {
  const [loading, setLoading] =
    useState(false);

  const handleUpload =
    async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file =
        e.target.files?.[0];

      if (!file) return;

      try {
        setLoading(true);

        await uploadFile(file);

        toast.success(
          "File uploaded successfully"
        );
      } catch {
        toast.error(
          "Upload failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border bg-white px-6 py-4 shadow">
      <Upload size={18} />

      <span>
        {loading
          ? "Uploading..."
          : "Upload File"}
      </span>

      <input
        type="file"
        hidden
        onChange={handleUpload}
      />
    </label>
  );
}