import {
  HeartPulse,
  Sparkles,
  Leaf,
  ShieldCheck,
  Smile,
  Gamepad2,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import type { AndroidCategory } from "@/types/android";

export const CATEGORY_ICONS: Record<AndroidCategory, LucideIcon> = {
  cuidados: HeartPulse,
  limpieza: Sparkles,
  jardineria: Leaf,
  seguridad: ShieldCheck,
  compania: Smile,
  entretenimiento: Gamepad2,
  asistencia: Wrench,
};
