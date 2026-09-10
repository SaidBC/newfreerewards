import Script from "next/script";

export default function MonetageInPagePush() {
  return (
    <Script async={true} data-cfasync="false">
      {`
       (function(s)
  {((s.dataset.zone = "10594118"), (s.src = "https://nap5k.com/tag.min.js"))}
  )([document.documentElement,
  document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
    </Script>
  );
}
