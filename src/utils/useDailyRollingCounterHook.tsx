import { useEffect, useMemo, useRef, useState } from "react";

type RollingState = {
  dateKey: string;                
  total: number;                  
  history: Record<number, number>;
  lastUpdateISO?: string;        
};

const STORAGE_KEY = "visitorCounter";

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}
function dateKeyOf(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function startOfTodayAt(hour = 7) {
  const d = new Date();
  d.setHours(hour, 0, 0, 0);
  return d;
}
function msToNextHour(now = new Date()) {
  const ms =
    (60 - now.getMinutes()) * 60 * 1000 -
    now.getSeconds() * 1000 -
    now.getMilliseconds();
  return ms <= 0 ? 60 * 60 * 1000 : ms;
}
function rand20to50() {
  return Math.floor(Math.random() * 31) + 20; // 20..50
}

export function useDailyRollingCounter() {
  const [total, setTotal] = useState(0);
  const [lastUpdateISO, setLastUpdateISO] = useState<string | undefined>();
  const stateRef = useRef<RollingState | null>(null);

  useEffect(() => {
    const now = new Date();
    const today = dateKeyOf(now);
    const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    let st: RollingState | null = null;
    if (raw) {
      try {
        st = JSON.parse(raw) as RollingState;
      } catch {
        st = null;
      }
    }

    
    if (!st || st.dateKey !== today) {
      st = { dateKey: today, total: 0, history: {}, lastUpdateISO: undefined };
    }

    if (now.getHours() < 7) {
      st.total = 0;
      st.history = {};
      st.lastUpdateISO = undefined;
    } else {
      const start7 = startOfTodayAt(7);
      const hoursPassed = Math.max(0, Math.floor((now.getTime() - start7.getTime()) / (3600_000)));
      for (let h = 7; h <= 7 + hoursPassed; h++) {
        if (h >= 24) break;
        if (st.history[h] == null) {
          const inc = rand20to50();
          st.history[h] = inc;
          st.total += inc;
          st.lastUpdateISO = now.toISOString();
        }
      }
    }

    stateRef.current = st;
    setTotal(st.total);
    setLastUpdateISO(st.lastUpdateISO);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(st));
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const todayKey = dateKeyOf(now);
      let st = stateRef.current;

      if (!st || st.dateKey !== todayKey) {
        st = { dateKey: todayKey, total: 0, history: {}, lastUpdateISO: undefined };
      }

      if (now.getHours() < 7) {
        st.total = 0;
        st.history = {};
        st.lastUpdateISO = undefined;
      } else {
        const hour = now.getHours();
        if (st.history[hour] == null) {
          const inc = rand20to50();
          st.history[hour] = inc;
          st.total += inc;
          st.lastUpdateISO = now.toISOString();
        }
      }

      stateRef.current = st;
      setTotal(st.total);
      setLastUpdateISO(st.lastUpdateISO);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(st));
    };

    const t0 = setTimeout(() => {
      tick(); 
      const iv = setInterval(tick, 3600_000); 
      // cleanup
      (tick as any)._iv = iv;
    }, msToNextHour());

    return () => {
      clearTimeout(t0);
      if ((tick as any)._iv) clearInterval((tick as any)._iv);
    };
  }, []);

  const lastUpdate = useMemo(
    () => (lastUpdateISO ? new Date(lastUpdateISO) : undefined),
    [lastUpdateISO]
  );

  return { count: total, lastUpdate };
}
