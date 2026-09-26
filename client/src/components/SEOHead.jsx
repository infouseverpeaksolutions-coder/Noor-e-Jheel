import { useEffect } from 'react';

export default function SEOHead({
  title = "Noor-e-Jheel Tour & Travel | Kashmir, Ladakh, Vaishno Devi & Umrah Packages",
  description = "Explore Kashmir with Noor-e-Jheel Tour & Travel. Best customized holiday packages for Kashmir, Ladakh, Vaishno Devi, Amarnath Yatra & Umrah with 100% Local Kashmiri Hospitality.",
  image = "/logo.png",
  url = window.location.href,
  schema = null
}) {
  useEffect(() => {
    document.title = title;

    const updateMeta = (name, content, attr = 'name') => {
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('og:title', title, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:image', image, 'property');
    updateMeta('og:url', url, 'property');
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

    let scriptTag = document.getElementById('jsonld-schema');
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'jsonld-schema';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, image, url, schema]);

  return null;
}
