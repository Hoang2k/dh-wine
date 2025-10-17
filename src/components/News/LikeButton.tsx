"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { reactToPost, getPostLikeStatus } from "@/services/news";

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
  
  const abortControllerRef = React.useRef<AbortController | null>(null);
  const isMountedRef = React.useRef(true);

  // Initialize like state - Ưu tiên server state
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const userId = getOrCreateUserId();
      
      if (initialHasReacted !== undefined) {
        setIsLiked(initialHasReacted === true);
      } else {
        const localLiked = userId ? loadUserLikes(userId)[articleId] === true : false;
        setIsLiked(localLiked);
      }
      
      setLikeCount(initialLikeCount);
    } catch {}
  }, [articleId, initialLikeCount, initialHasReacted]);

  // Fetch fresh like count from API on mount (hasReacted from localStorage)
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    
    const fetchLikeStatus = async () => {
      try {
        // Fetch total like count from API
        const response = await getPostLikeStatus(Number(articleId));
        if (!isMountedRef.current) return;
        
        setLikeCount(response.totalLike);
        
        // Get hasReacted from localStorage
        const userId = getOrCreateUserId();
        if (userId) {
          const localLiked = loadUserLikes(userId)[articleId] === true;
          setIsLiked(localLiked);
        }
      } catch (error) {
        console.error("Error fetching like count:", error);
        const userId = getOrCreateUserId();
        if (userId) {
          const localLiked = loadUserLikes(userId)[articleId] === true;
          setIsLiked(localLiked);
        }
      }
    };

    fetchLikeStatus();
  }, [articleId]);

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
    if (loading) return;

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    setLoading(true);

    const prevLiked = isLiked;
    const prevCount = likeCount;
    const userId = getOrCreateUserId();
    const nextIsLiked = !prevLiked;
    
    setIsLiked(nextIsLiked);
    setLikeCount((p) => (nextIsLiked ? p + 1 : Math.max(0, p - 1)));

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
      
      if (!isMountedRef.current) return;
      
      if (res?.totalLike !== undefined) {
        setLikeCount(res.totalLike);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (e) {
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

