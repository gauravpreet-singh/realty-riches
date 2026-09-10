"use client";

type WhatsAppFloatingProps = {
  phoneNumber: string;
  message: string;
};

export default function WhatsAppFloating({
  phoneNumber,
  message,
}: WhatsAppFloatingProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Realty Riches on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-black/40 transition-all duration-200 hover:scale-110 hover:shadow-[#25D366]/20"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-7 w-7 fill-current"
      >
        <path d="M20.52 3.48A11.82 11.82 0 0 0 12.05 0C5.52 0 .2 5.31.2 11.85c0 2.09.55 4.13 1.59 5.93L.1 24l6.38-1.67a11.85 11.85 0 0 0 5.57 1.41h.01c6.53 0 11.85-5.31 11.85-11.85 0-3.17-1.23-6.15-3.39-8.41ZM12.06 21.7h-.01a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.78.99 1.01-3.68-.23-.38a9.83 9.83 0 1 1 8.38 4.65Zm5.4-7.37c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.63-.93-2.23-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.53.08-.81.38-.28.3-1.06 1.04-1.06 2.54s1.09 2.95 1.24 3.15c.15.2 2.14 3.27 5.19 4.58.73.31 1.3.49 1.75.63.74.24 1.41.2 1.94.12.59-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z" />
      </svg>
    </a>
  );
}