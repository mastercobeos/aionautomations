"use client";

type Props = { title: string; id?: string };

export function ReliefPlaceholderSection({ title, id }: Props) {
  return (
    <section id={id} className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-gray-900">{title}</h2>
        <div className="mt-10 rounded-xl border border-gray-200 border-dashed bg-gray-50/50 p-12 text-center">
          <p className="text-gray-400">Contenido listo para agregar.</p>
        </div>
      </div>
    </section>
  );
}
