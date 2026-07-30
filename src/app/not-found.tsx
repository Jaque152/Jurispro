import { Action } from "@/components/ui/action";

export default function NotFound() {
  return (
    <section className="grain relative overflow-hidden bg-wine text-paper">
      <div className="relative mx-auto flex min-h-[70vh] max-w-[1680px] flex-col justify-center px-5 py-24 md:px-10">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-blush">
          Error 404
        </p>
        <h1 className="display-lg mt-6 max-w-[16ch] text-paper">
          Esta página no está en el expediente.
        </h1>
        <p className="mt-7 max-w-[46ch] text-[15px] leading-relaxed text-paper/60">
          El documento que buscas fue archivado o la dirección es incorrecta.
          Vuelve al inicio o consulta el catálogo de servicios.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Action href="/" variant="claret" size="lg">
            Volver al inicio
          </Action>
          <Action href="/tienda" variant="ghost" size="lg">
            Ver la tienda
          </Action>
        </div>
      </div>
    </section>
  );
}
