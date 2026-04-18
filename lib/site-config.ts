/**
 * Configuración de redes sociales y mapa.
 * Para producción, define estas variables en .env.local:
 *
 * NEXT_PUBLIC_WHATSAPP_NUMBER=5215512345678  (código país + número, sin +; wa.me abre app en móvil y Web en desktop)
 * NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/tu_usuario
 * NEXT_PUBLIC_FACEBOOK_PAGE_URL=https://www.facebook.com/tu_pagina
 * NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL=https://www.google.com/maps/embed?pb=...
 */

export const siteConfig = {
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "523411687566",
    defaultMessage: "Hola, me interesa conocer más sobre sus servicios. ¿Me pueden dar más información?",
    /** Official wa.me deep link: opens WhatsApp app on mobile, WhatsApp Web on desktop. */
    get link() {
      if (!this.number) return "https://wa.me/";
      const num = this.number.replace(/\D/g, "");
      return `https://wa.me/${num}?text=${encodeURIComponent(this.defaultMessage)}`;
    },
  },
  instagram: {
    url: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com",
  },
  facebook: {
    pageUrl: process.env.NEXT_PUBLIC_FACEBOOK_PAGE_URL || "https://www.facebook.com",
    get embedSrc() {
      try {
        const url = new URL(this.pageUrl);
        return `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(this.pageUrl)}&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;
      } catch {
        return "";
      }
    },
  },
  googleMaps: {
    embedSrc: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || "",
    /** URL para abrir el lugar en Google Maps (ej. enlace "Ver en Maps"). Opcional. */
    placeUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_PLACE_URL || "https://www.google.com/maps",
  },
} as const;
