import { getPublishedCollection } from "astro-course-university/content";
import { withBase } from "astro-theme-university/url";
import { formatCourseDate } from "./dates";

const DAY = 86_400_000;
const WEEK = 7 * DAY;

export type WeekState = "past" | "current" | "upcoming";

export interface SemesterWeek {
  week: number;
  href: string;
  title: string;
  isoDate: string;
  dateLabel: string;
  state: WeekState;
  start: number;
}

/**
 * Build-time snapshot of where the semester is, shared by every widget that
 * needs to say "week N of 12" — the rail's compact tracker and the
 * homepage's detailed one both read from here so the two never drift out of
 * sync on what "current" means.
 */
export async function getSemesterWeeks(): Promise<{ weeks: SemesterWeek[]; today: number }> {
  const sessions = (await getPublishedCollection("sessions")).sort(
    (a, b) => a.data.week - b.data.week,
  );

  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

  const stateFor = (start: number): WeekState =>
    today >= start + WEEK ? "past" : today >= start ? "current" : "upcoming";

  const weeks = sessions.map((session) => {
    const start = session.data.date.getTime();
    return {
      week: session.data.week,
      href: withBase(`/sessions/${session.id}/`),
      title: session.data.title,
      isoDate: session.data.date.toISOString().slice(0, 10),
      dateLabel: formatCourseDate(session.data.date),
      state: stateFor(start),
      start,
    };
  });

  return { weeks, today };
}
