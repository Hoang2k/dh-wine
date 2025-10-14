"use client";
import * as React from "react";
import { postView } from "@/services/news";

const USER_ID_KEY = "user:v1:id";
const VIEWS_PREFIX = "views:v1:";
const VIEW_EXPIRY_HOURS = 24;

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

function loadUserViews(userId: string): Record<string, number> {
  try {
    const raw = localStorage.getItem(VIEWS_PREFIX + userId);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveUserViews(userId: string, views: Record<string, number>) {
  try {
    localStorage.setItem(VIEWS_PREFIX + userId, JSON.stringify(views));
  } catch {}
}

function hasViewedRecently(userId: string, articleId: string): boolean {
  try {
    const views = loadUserViews(userId);
    const viewTime = views[articleId];
    if (!viewTime) return false;
    const now = Date.now();
    const hoursSinceView = (now - viewTime) / (1000 * 60 * 60);
    return hoursSinceView < VIEW_EXPIRY_HOURS;
  } catch {
    return false;
  }
}

function markAsViewed(userId: string, articleId: string) {
  try {
    const views = loadUserViews(userId);
    views[articleId] = Date.now();
    saveUserViews(userId, views);
  } catch {}
}

interface ViewTrackerProps {
  articleId: string;
  initialViewCount: number;
  onViewUpdate?: (count: number) => void;
}

export default function ViewTracker({
  articleId,
  initialViewCount,
  onViewUpdate,
}: ViewTrackerProps) {
  const apiCallMadeRef = React.useRef<Set<string>>(new Set());

  React.useEffect(() => {
    if (!articleId) return;
    if (typeof window === "undefined") return;

    // Prevent duplicate API calls for the same article
    if (apiCallMadeRef.current.has(articleId)) {
      return;
    }

    const abort = new AbortController();
    const userId = getOrCreateUserId();
    if (!userId) return;

    (async () => {
      try {
        // Mark API call as made
        apiCallMadeRef.current.add(articleId);

        const response = await postView(Number(articleId));
        if (abort.signal.aborted) return;

        if (response?.view !== undefined) {
          onViewUpdate?.(response.view);
        } else if (response?.data?.view !== undefined) {
          onViewUpdate?.(response.data.view);
        } else {
          onViewUpdate?.(initialViewCount + 1);
        }

        markAsViewed(userId, articleId);
      } catch (error) {
        if (!abort.signal.aborted) {
          console.error("Error tracking view:", error);
          // Remove from set if API call failed
          apiCallMadeRef.current.delete(articleId);
        }
      }
    })();

    return () => abort.abort();
  }, [articleId, initialViewCount, onViewUpdate]);

  return null;
}

