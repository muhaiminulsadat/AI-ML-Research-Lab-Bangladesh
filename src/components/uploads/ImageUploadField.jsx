"use client";

import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {upload} from "@imagekit/next";
import {Camera, Loader2, Upload, UploadCloud} from "lucide-react";
import {toast} from "sonner";

import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Progress} from "@/components/ui/progress";

export default function ImageUploadField({
  label = "Profile Image",
  description = "Select an image and upload it to ImageKit.",
  buttonText = "Choose Image",
  initialPreviewUrl = "",
  folder = "/",
  fileName,
  useUniqueFileName = true,
  disabled = false,
  onFileChange,
  onUploaded,
}) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(initialPreviewUrl);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPreviewUrl(initialPreviewUrl);
  }, [initialPreviewUrl]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setProgress(0);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl((currentPreviewUrl) => {
      if (currentPreviewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(currentPreviewUrl);
      }
      return objectUrl;
    });

    onFileChange?.(selectedFile, objectUrl);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const authResponse = await fetch("/api/upload-auth");
      const authData = await authResponse.json();

      if (!authResponse.ok) {
        throw new Error(authData.message || "Failed to authenticate");
      }

      const response = await upload({
        file,
        fileName: fileName || file.name,
        useUniqueFileName,
        token: authData.token,
        signature: authData.signature,
        expire: authData.expire,
        folder,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
        onProgress: (event) => {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(percent);
        },
      });

      const uploadedUrl = response?.url ? `${response.url}?t=${Date.now()}` : "";
      if (response?.url) response.url = uploadedUrl;
      
      setFile(null);
      setPreviewUrl(uploadedUrl);
      setProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
      onUploaded?.(response);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3 rounded-2xl border bg-muted/20 p-4">
      <div className="flex items-center justify-between gap-3">
        <Label className="flex items-center gap-1.5">
          <Camera className="h-3.5 w-3.5" /> {label}
        </Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={handleChooseImage}
          disabled={disabled || uploading}
        >
          <Upload className="h-3.5 w-3.5" />
          {buttonText}
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled || uploading}
      />

      <div className="flex items-center gap-3 rounded-xl border bg-background p-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border bg-muted">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Selected image preview"
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              <UploadCloud className="h-5 w-5" />
            </div>
          )}
        </div>
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-medium">Preview</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>

      {uploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Uploading...</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-1" />
        </div>
      )}

      <Button
        type="button"
        onClick={handleUpload}
        disabled={!file || uploading || disabled}
        className="w-full"
      >
        {uploading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Please Wait
          </>
        ) : (
          "Upload Image"
        )}
      </Button>
    </div>
  );
}
