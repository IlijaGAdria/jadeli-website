export function ModelPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center min-h-[38px] px-[14px] rounded-full bg-[#fff1f8] border border-[rgba(31,23,34,0.12)] text-[0.92rem]">
      {label}
    </span>
  );
}
