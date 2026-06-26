import React, { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalUrl = window.location.href,
  ogImage = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1200"
}) => {
  useEffect(() => {
    // Dynamically set title and meta tags
    document.title = `${title} | Shree Veda Authentic Organic Spices`;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Set schema markup
    const schemaId = "shree-veda-schema";
    let schemaScript = document.getElementById(schemaId);
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.setAttribute("type", "application/ld+json");
      schemaScript.setAttribute("id", schemaId);
      document.head.appendChild(schemaScript);
    }

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "Shree Veda",
      "image": ogImage,
      "description": description,
      "url": canonicalUrl,
      "telephone": "+91 80 4321 0987",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "108, Veda Nilayam",
        "addressLocality": "Mysuru",
        "addressRegion": "KA",
        "postalCode": "570001",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "12.2958",
        "longitude": "76.6394"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "19:00"
      },
      "sameAs": [
        "https://instagram.com/shreeveda.spices",
        "https://facebook.com/shreeveda.spices"
      ]
    };

    schemaScript.innerHTML = JSON.stringify(organizationSchema, null, 2);

    return () => {
      // Cleanup schema scripts on unmount if navigating elsewhere
    };
  }, [title, description, canonicalUrl, ogImage]);

  return null;
};
