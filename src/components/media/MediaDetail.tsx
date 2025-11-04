"use client";

import { useMemo, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Play, Image as ImageIcon, ArrowLeft, Eye } from "lucide-react";
import { IGallery } from "@/types/media";
import Lightbox, { LightboxItem } from "./Lightbox";
import Link from "next/link";
import { getStrapiMedia } from "@/utils";
import ShareButtons from "@/components/News/ShareButtons";

function isVideo(url: string) {
  return /\.(mp4|mov|avi|webm|mkv)$/i.test(url);
}

function formatDateYMD(ymd: string) {
  const [y, m, d] = ymd.split("-");
  if (!y || !m || !d) return ymd;
  return `${d}/${m}/${y}`;
}

export default function MediaDetail({ media, pageUrl }: { media: IGallery, pageUrl: string }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const mediaItems: LightboxItem[] = useMemo(
    () => {
      const items = (media.images ?? []).map((url) => ({
        type: isVideo(url) ? "video" as const : "image" as const,
        url,
      }));
      console.log("MediaDetail - processed mediaItems:", items);
      return items;
    },
    [media]
  );

  const openLightboxAt = useCallback((i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Back button */}
          <div className="mb-6">
            <Link href="/media">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Quay lại thư viện
              </Button>
            </Link>
          </div>

          <Card className="overflow-hidden border-2 border-memorial-red/20 shadow-[var(--shadow-memorial)] bg-card/90 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl md:text-3xl mb-4 text-memorial-dark">
                    {media.title}
                  </CardTitle>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDateYMD(media.time)}
                    </div>
                    <ShareButtons 
                      url={pageUrl}
                      title={media.title}
                      layout="horizontal"
                    />
                  </div>
                  {media.description && (
                    <p className="text-muted-foreground leading-relaxed">
                      {media.description}
                    </p>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Media Grid */}
              {mediaItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Không có hình ảnh hoặc video nào được tìm thấy.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mediaItems.map((item, idx) => (
                    <div
                      key={`${item.url}-${idx}`}
                      className="relative group rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => openLightboxAt(idx)}
                    >
                      {item.type === "video" ? (
                        <video
                          src={ getStrapiMedia(item.url) }
                          controls
                          className="w-full h-48 md:h-64 object-cover transition-transform group-hover:scale-105"
                          onError={(e) => console.error("Video load error:", e)}
                        />
                      ) : (
                        <img
                          src={ getStrapiMedia(item.url) }
                          alt=""
                          className="w-full h-48 md:h-64 object-cover transition-transform group-hover:scale-105 rounded-lg"
                          onError={(e) => console.error("Image load error:", e)}
                        />
                      )}

                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        {item.type === "video" ? (
                          <Play className="w-8 h-8 text-white drop-shadow" />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-white drop-shadow" />
                        )}
                      </div>

                      {item.type === "video" && (
                        <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
                          Video
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          items={mediaItems}
          startIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
