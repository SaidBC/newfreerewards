import Script from "next/script";

export default function MonetageVignette() {
  return (
    <Script async={true} data-cfasync="false">
      {`
      (function(s)
      {
        ((s.dataset.zone = "10594069"),
        (s.src = "https://n6wxm.com/vignette.min.js"))
      }
      )([document.documentElement,
      document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
    </Script>
  );
}
