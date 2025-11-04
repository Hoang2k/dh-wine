"use client";

import { useMemo, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Play, Image as ImageIcon, Eye } from "lucide-react";
import { IGallery } from "@/types/media";
import Lightbox, { LightboxItem } from "./Lightbox";
import Link from "next/link";

function isVideo(url: string) {
  return /\.(mp4|mov|avi|webm|mkv)$/i.test(url);
}
function formatDateYMD(ymd: string) {
  const [y, m, d] = ymd.split("-");
  if (!y || !m || !d) return ymd;
  return `${d}/${m}/${y}`;
}

export default function MediaCard({ item }: { item: IGallery }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const media: LightboxItem[] = useMemo(
    () =>
      (item.images ?? []).map((url) => ({
        type: isVideo(url) ? "video" : "image",
        url,
      })),
    [item]
  );

  const preview = media.slice(0, 4);

  const openLightboxAt = useCallback((i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  }, []);

  const MediaGrid = ({ all = false }: { all?: boolean }) => {
    const list = all ? media : preview;

    return (
      <div
        className={`grid gap-2 ${
          all ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-2 md:grid-cols-4"
        }`}
      >
        {list.map((m, idx) => {
          const realIdx = all ? idx : idx;
          return (
            <div
              key={`${m.url}-${idx}`}
              className="relative group rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openLightboxAt(realIdx)}
            >
              {m.type === "video" ? (
                <video
                  src={m.url}
                  controls
                  className="w-full h-24 md:h-64 object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <img
                  src={m.url}
                  alt=""
                  className="w-full h-24 md:h-64 object-cover transition-transform group-hover:scale-105 rounded-lg"
                />
              )}

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                {m.type === "video" ? (
                  <Play className="w-6 h-6 text-white drop-shadow" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-white drop-shadow" />
                )}
              </div>

              {m.type === "video" && (
                <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
                  Video
                </Badge>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Card className="overflow-hidden border-2 border-memorial-red/20 shadow-[var(--shadow-memorial)] bg-card/90 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl mb-2 text-memorial-dark">
                {item.title}
              </CardTitle>
              <div className="flex items-center text-muted-foreground text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDateYMD(item.time)}
              </div>
              {item.description ? (
                <p className="mt-1">{item.description}</p>
              ) : null}
            </div>
            <Link href={`/media/${item.id}`}>
              <Button
                variant="outline"
                size="sm"
                className="ml-4 hover:bg-blue-500 hover:text-primary-foreground"
              >
                <Eye className="w-4 h-4 mr-1" />
                Xem chi tiết
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <MediaGrid all={false} />

          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => openLightboxAt(0)} 
              className="hover:bg-blue-500 hover:text-primary-foreground cursor-pointer"
            >
              <Eye className="w-4 h-4 mr-2" />
              Xem thêm ({media.length} ảnh/video)
            </Button>
          </div>
        </CardContent>
      </Card>

      {lightboxOpen && (
        <Lightbox
          items={media}
          startIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
