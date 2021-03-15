import dynamic from 'next/dynamic';

// Leaflet makes direct calls to the DOM when it is loaded, therefore React Leaflet is not compatible with server-side rendering. 
// Next.js dynamic import must be used (with ssr disabled).
const Map = dynamic(
    () => import("./Map"),
    { ssr: false } // This line is important. It's what prevents server-side render
  )

export default Map;