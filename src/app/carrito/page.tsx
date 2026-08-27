import { getAllAndroids } from "@/lib/data/androids";
import { CartView } from "@/components/cart/cart-view";

export const metadata = {
  title: "Carrito — DOMÉSTIKA",
};

export default async function CarritoPage() {
  const androids = await getAllAndroids();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="font-display text-3xl font-black uppercase tracking-tight">Tu carrito</h1>
        <p className="text-neutral-500">
          Revisá tus androides, elegí la modalidad de adquisición y finalizá tu compra.
        </p>
      </div>

      <CartView androids={androids} />
    </div>
  );
}
