import type { Android } from "@/types/android";
import type { DeliveryMethod } from "@/types/commerce";

// Regla centralizada de envío (spec sección 9.4): retiro en showroom,
// envío estándar o envío con instalación especializada. Determinados
// androides pueden requerir obligatoriamente instalación especializada,
// y esa regla vive acá — no dispersa por componentes.
export const DELIVERY_METHOD_OPTIONS: {
  value: DeliveryMethod;
  label: string;
  description: string;
}[] = [
  {
    value: "showroom",
    label: "Retiro en showroom",
    description: "Retirás el androide en nuestro showroom sin costo adicional.",
  },
  {
    value: "envio_estandar",
    label: "Envío estándar",
    description: "Entrega a domicilio en todo el país.",
  },
  {
    value: "envio_instalacion",
    label: "Envío e instalación especializada",
    description: "Entrega e instalación a cargo de un técnico Súper Sónicos.",
  },
];

export function androidsRequireSpecializedInstall(androids: Android[]): boolean {
  return androids.some((android) => android.requiresSpecializedInstall);
}

export function getAllowedDeliveryMethods(androids: Android[]): DeliveryMethod[] {
  if (androidsRequireSpecializedInstall(androids)) {
    return ["envio_instalacion"];
  }
  return ["showroom", "envio_estandar", "envio_instalacion"];
}

export function getDefaultDeliveryMethod(androids: Android[]): DeliveryMethod {
  return getAllowedDeliveryMethods(androids)[0];
}

export function getDeliveryLabel(method: DeliveryMethod | null): string {
  return DELIVERY_METHOD_OPTIONS.find((option) => option.value === method)?.label ?? "";
}
