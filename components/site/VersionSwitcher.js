// Sélecteur de version : la V3 est ce site, les V1 et V2 sont les anciens portfolios (/v1, /v2).
export default function VersionSwitcher({ className = "" }) {
  return (
    <div className={`inline-flex items-center gap-1 rounded-full border border-or/50 p-1 text-xs ${className}`}>
      <a href="/v1" className="rounded-full px-2.5 py-1 opacity-75 transition-opacity hover:opacity-100">
        V1
      </a>
      <a href="/v2" className="rounded-full px-2.5 py-1 opacity-75 transition-opacity hover:opacity-100">
        V2
      </a>
      <span aria-current="true" className="rounded-full bg-or px-2.5 py-1 font-semibold text-brun">
        V3
      </span>
    </div>
  );
}
