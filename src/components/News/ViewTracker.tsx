"use client";
import * as React from "react";
import { postView } from "@/services/news";


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
  const hasTrackedRef = React.useRef(false);

  React.useEffect(() => {
    if (!articleId || hasTrackedRef.current) return;

    hasTrackedRef.current = true;

    (async () => {
      try {
        const response = await postView(Number(articleId));

        if (response?.view !== undefined) {
          onViewUpdate?.(response.view);
        } else if (response?.data?.view !== undefined) {
          onViewUpdate?.(response.data.view);
        } else {
          onViewUpdate?.(initialViewCount + 1);
        }

      } catch (error) {
        console.error("Error tracking view:", error);
      }
    })();

  }, [articleId, initialViewCount, onViewUpdate]);

  return null;
}

