"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { reactToPost } from "@/services/news";

const USER_ID_KEY = "user:v1:id";
const LIKES_PREFIX = "likes:v1:";
const STORAGE_EVENT = "like-storage-sync";

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
    // Broadcast event cho các tabs khác
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { userId, bag } }));
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
  
  // Ref để track pending request và tránh race condition
  const abortControllerRef = React.useRef<AbortController | null>(null);
  const isMountedRef = React.useRef(true);

  // Initialize like state - Ưu tiên server state
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const userId = getOrCreateUserId();
      
      // Ưu tiên server state nếu có, fallback to localStorage
      if (initialHasReacted !== undefined) {
        setIsLiked(initialHasReacted === true);
      } else {
        const localLiked = userId ? loadUserLikes(userId)[articleId] === true : false;
        setIsLiked(localLiked);
      }
      
      setLikeCount(initialLikeCount);
    } catch {}
  }, [articleId, initialLikeCount, initialHasReacted]);

  // Sync state giữa các tabs
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorageSync = (e: Event) => {
      const customEvent = e as CustomEvent;
      const userId = getOrCreateUserId();
      if (!userId) return;

      const { userId: eventUserId, bag } = customEvent.detail;
      if (eventUserId === userId) {
        const newLiked = bag[articleId] === true;
        setIsLiked(newLiked);
      }
    };

    window.addEventListener(STORAGE_EVENT, handleStorageSync);
    return () => window.removeEventListener(STORAGE_EVENT, handleStorageSync);
  }, [articleId]);

  // Cleanup on unmount
  React.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      abortControllerRef.current?.abort();
    };
  }, []);

  const handleLike = async () => {
    // Ngăn multiple clicks
    if (loading) return;

    // Cancel pending request nếu có
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setLoading(true);

    const prevLiked = isLiked;
    const prevCount = likeCount;
    const userId = getOrCreateUserId();
    const nextIsLiked = !prevLiked;
    
    // Optimistic update UI
    setIsLiked(nextIsLiked);
    setLikeCount((p) => (nextIsLiked ? p + 1 : Math.max(0, p - 1)));

    // Update localStorage ngay lập tức
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
      
      // Sync count từ server để đảm bảo accuracy
      if (!isMountedRef.current) return;
      
      if (typeof res?.totalLike === "number") {
        setLikeCount(res.totalLike);
      } else {
        // Nếu server không trả về totalLike, throw error để rollback
        throw new Error("Invalid response from server");
      }
    } catch (e) {
      // Chỉ rollback nếu component vẫn mounted và không phải abort
      if (!isMountedRef.current) return;
      if ((e as Error).name === 'AbortError') return;

      console.error("Error reacting to post:", e);
      
      // Rollback UI state
      setIsLiked(prevLiked);
      setLikeCount(prevCount);
      
      // Rollback localStorage
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
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  return (
    <Button
      onClick={handleLike}
      variant={isLiked ? "default" : "outline"}
      size="sm"
      className="flex items-center gap-2 hover:cursor-pointer transition-all"
      disabled={loading}
      aria-label={isLiked ? "Bỏ thích bài viết" : "Thích bài viết"}
    >
      <span>{isLiked ? "Đã thích" : "Thích"}</span>
      <span className="font-semibold">({likeCount})</span>
    </Button>
  );
}

