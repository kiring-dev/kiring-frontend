import Script from 'next/script'

export function BeusableScript() {
  return (
    <Script
      id="beusable-rum"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w, d, a){
              w.__beusablerumclient__ = {
                  load : function(src){
                      var b = d.createElement("script");
                      b.src = src; b.async=true; b.type = "text/javascript";
                      d.getElementsByTagName("head")[0].appendChild(b);
                  }
              };
              w.__beusablerumclient__.load(a + "?url=" + encodeURIComponent(d.URL));
          })(window, document, "//rum.beusable.net/load/b250627e011204u990");
        `,
      }}
    />
  )
}
