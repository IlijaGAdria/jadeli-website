export function SiteFooter({ className = '' }: { className?: string }) {
  return (
    <footer className={`max-w-[1220px] mx-auto mt-[72px] pt-12 border-t border-[rgba(31,23,34,0.10)] pb-[48px] ${className}`}>
      <div className="grid grid-cols-3 gap-6 max-[640px]:grid-cols-1 text-center">
        <div>
          <h4 className="text-[0.78rem] uppercase tracking-[0.14em] mt-0 mb-[10px]">JADELI</h4>
          <p className="m-0 text-muted text-[0.95rem] leading-[1.6]">Luxury in the details.</p>
        </div>
        <div>
          <h4 className="text-[0.78rem] uppercase tracking-[0.14em] mt-0 mb-[10px]">Contact</h4>
          <p className="m-0 text-muted text-[0.95rem] leading-[1.6]">info@jadeli.com</p>
        </div>
        <div>
          <h4 className="text-[0.78rem] uppercase tracking-[0.14em] mt-0 mb-[10px]">Follow us</h4>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted text-[0.95rem] no-underline">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
