"use client";
import * as React from "react";
import Image from "next/image";
import { Copy, Check } from "lucide-react";
import Zalo from "@/assets/svg/zalo.svg";

interface ShareButtonsProps {
  url: string;
  title: string;
  layout?: "vertical" | "horizontal";
}

export default function ShareButtons({
  url,
  title,
  layout = "vertical",
}: ShareButtonsProps) {
  const [copied, setCopied] = React.useState<boolean>(false);

  const handleShare = (platform: string) => {
    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}&quote=${encodeURIComponent(title)}`,
          "_blank",
          "noopener,noreferrer"
        );
        break;
      case "zalo":
        window.open(
          `https://zalo.me/share?url=${encodeURIComponent(
            url
          )}&title=${encodeURIComponent(title)}`,
          "_blank",
          "noopener,noreferrer"
        );
        break;
      case "copy":
        if (navigator?.clipboard?.writeText) {
          navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          });
        }
        break;
    }
  };

  const containerClass =
    layout === "vertical"
      ? "flex flex-col items-center space-y-4 p-3 bg-gray-50 rounded-lg"
      : "flex items-center gap-3";

  return (
    <div className={containerClass}>
      {/* Facebook */}
      <button
        onClick={() => handleShare("facebook")}
        className="w-8 h-8 bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white rounded-full flex items-center justify-center transition-colors"
        title="Chia sẻ trên Facebook"
        aria-label="Chia sẻ Facebook"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>

      {/* Zalo */}
      <button
        onClick={() => handleShare("zalo")}
        className="w-8 h-8 bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white rounded-full flex items-center justify-center transition-colors"
        title="Chia sẻ trên Zalo"
        aria-label="Chia sẻ Zalo"
      >
        <Image src={Zalo} alt="Zalo" width={24} height={24} />  
      </button>

      {/* Copy Link */}
      <button
        onClick={() => handleShare("copy")}
        className="w-8 h-8 bg-emerald-600 hover:bg-emerald-700 hover:cursor-pointer text-white rounded-full flex items-center justify-center transition-colors"
        title={copied ? "Đã sao chép!" : "Sao chép liên kết"}
        aria-label="Sao chép liên kết"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}

