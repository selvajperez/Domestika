import type { AcquisitionMode } from "./android";

export type DeliveryMethod = "showroom" | "envio_estandar" | "envio_instalacion";

export interface CartItem {
  androidId: string;
  mode: AcquisitionMode;
  quantity: number;
}

export interface FavoriteItem {
  androidId: string;
  addedAt: string;
}

export interface CompareSelection {
  androidIds: string[];
}
