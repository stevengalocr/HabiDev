// Date helper functions for HabiDev

export const formatDate = (date: Date | string): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatShortDate = (date: Date | string): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
  });
};

export const getToday = (): string => {
  return new Date().toISOString().split("T")[0];
};

export const getDaysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split("T")[0];
};

export const getDaysDifference = (date1: string, date2: string): number => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isToday = (date: string): boolean => {
  return date === getToday();
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Buenos días";
  if (hour < 18) return "Buenas tardes";
  return "Buenas noches";
};

export const getDayName = (date: Date | string): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("es-ES", { weekday: "long" });
};

export const getLast7Days = (): string[] => {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    days.push(getDaysAgo(i));
  }
  return days;
};

export const getCalendarDates = (month: number, year: number): Date[] => {
  const dates: Date[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Add dates from previous month to fill first week
  const firstDayOfWeek = firstDay.getDay();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month, -i);
    dates.push(date);
  }

  // Add all dates of current month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    dates.push(new Date(year, month, day));
  }

  // Add dates from next month to fill last week
  const lastDayOfWeek = lastDay.getDay();
  for (let i = 1; i < 7 - lastDayOfWeek; i++) {
    dates.push(new Date(year, month + 1, i));
  }

  return dates;
};
