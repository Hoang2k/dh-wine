"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { reactToPost } from "@/services/news";

const USER_ID_KEY = "user:v1:id";
const LIKES_PREFIX = "likes:v1:";

function getOrCreateUserId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const existing = localStorage.getItem(USER_ID_KEY);
    if (existing) return existing;

    const gen =
      (globalThis as any).crypto?.randomUUID?.() ??
      `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    localStorage.setItem(USER_ID_KEY, gen);
    return gen;
  } catch {
    return null;
  }
}

function loadUserLikes(userId: string): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(LIKES_PREFIX + userId);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveUserLikes(userId: string, bag: Record<string, boolean>) {
  try {
    localStorage.setItem(LIKES_PREFIX + userId, JSON.stringify(bag));
  } catch {}
}

interface LikeButtonProps {
  articleId: string;
  initialLikeCount: number;
  initialHasReacted?: boolean;
}

export default function LikeButton({
  articleId,
  initialLikeCount,
  initialHasReacted,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [likeCount, setLikeCount] = React.useState<number>(initialLikeCount);
  const [loading, setLoading] = React.useState<boolean>(false);

  // Initialize like state
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const userId = getOrCreateUserId();
      const localLiked =
        userId ? loadUserLikes(userId)[articleId] === true : false;
      const serverLiked = initialHasReacted === true;

      setIsLiked(serverLiked || localLiked);
      setLikeCount(initialLikeCount);
    } catch {}
  }, [articleId, initialLikeCount, initialHasReacted]);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);

    const prevLiked = isLiked;
    const prevCount = likeCount;
    const userId = getOrCreateUserId();

    const nextIsLiked = !prevLiked;
    
    // Optimistic update
    setIsLiked(nextIsLiked);
    setLikeCount((p) => (nextIsLiked ? p + 1 : Math.max(0, p - 1)));

    // Update localStorage
    if (userId) {
      const bag = loadUserLikes(userId);
      if (nextIsLiked) {
        bag[articleId] = true;
      } else {
        delete bag[articleId];
      }
      saveUserLikes(userId, bag);
    }

    try {
      const res = await reactToPost(Number(articleId), nextIsLiked);
      // Don't update count from server - keep frontend count
      if (typeof res?.totalLike !== "number") {
        throw new Error("Invalid response");
      }
    } catch (e) {
      // Rollback on error
      setIsLiked(prevLiked);
      setLikeCount(prevCount);
      if (userId) {
        const bag = loadUserLikes(userId);
        if (prevLiked) {
          bag[articleId] = true;
        } else {
          delete bag[articleId];
        }
        saveUserLikes(userId, bag);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLike}
      variant={isLiked ? "default" : "outline"}
      size="sm"
      className="flex items-center gap-2 hover:cursor-pointer"
      disabled={loading}
    >
      <span>{isLiked ? "Đã thích" : "Thích"}</span>
      <span>({likeCount})</span>
    </Button>
  );
}

