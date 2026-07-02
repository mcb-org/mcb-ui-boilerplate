import type { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

const ProductsDetails: FC = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <section className="glass-card rounded-[30px] p-5 shadow-[0_16px_44px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-400/80">Pattern detail</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Starter route detail example</h1>
            <p className="mt-2 text-sm text-slate-500">Use this page structure when you need a detail screen for any future entity or module-specific record.</p>
          </div>
          <Link to="/products" className="inline-flex items-center gap-2 rounded-2xl border border-violet-200 px-4 py-3 text-sm font-semibold text-violet-700 transition hover:border-violet-300 hover:text-violet-800">
            <ArrowLeft size={16} /> Back to UI kit
          </Link>
        </div>
      </section>

      <section className="panel-surface p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Route parameter example</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Current demo item ID: <span className="font-semibold text-slate-800">{id}</span>. Replace this content with your future detail page layout, summary cards, tabs, or audit history.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsDetails;
