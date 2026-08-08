import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// US counties TopoJSON — fetched once and cached by the browser
const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

// Florida state FIPS prefix
const FL_PREFIX = "12";

// Service counties: FIPS → display info
const SERVICE_COUNTIES: Record<string, { name: string; cities: string[] }> = {
  "12017": { name: "Citrus County",  cities: ["Inverness", "Crystal River", "Homosassa Springs", "Beverly Hills", "Floral City"] },
  "12053": { name: "Hernando County", cities: ["Brooksville", "Spring Hill", "Weeki Wachee", "Ridge Manor"] },
  "12069": { name: "Lake County",    cities: ["Lady Lake", "Leesburg", "Mount Dora", "Clermont", "Eustis", "Tavares", "Groveland"] },
  "12083": { name: "Marion County",  cities: ["Ocala", "Belleview", "Dunnellon", "Silver Springs Shores", "Weirsdale"] },
  "12095": { name: "Orange County (West)", cities: ["Apopka", "Winter Garden", "Ocoee", "Windermere"] },
  "12119": { name: "Sumter County — The Villages", cities: ["Wildwood", "Oxford", "Lady Lake", "Coleman", "Bushnell"] },
};

// Colors
const COLOR_SERVICE         = "#5c3317";   // rich dark oak — primary brand color
const COLOR_SERVICE_HOVER   = "#7a4522";   // lighter oak on hover
const COLOR_OTHER           = "#d9cfc6";   // warm greige — distinguishable but soft
const COLOR_STROKE_SERVICE  = "#f5efe9";   // near-white stroke between service counties
const COLOR_STROKE_OTHER    = "#c8bdb4";   // subtle stroke on non-service counties

interface Tip { x: number; y: number; name: string; cities: string[] }

export function FloridaMap() {
  const [tip, setTip] = useState<Tip | null>(null);

  return (
    <div className="relative w-full select-none">
      {/* Warm card background so the map feels grounded */}
      <div className="rounded-sm overflow-hidden bg-[#f0e9e2] p-2 shadow-inner">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 3100, center: [-81.6, 28.3] }}
          viewBox="0 0 800 600"
          style={{ width: "100%", height: "auto" }}
        >
          {/* Drop-shadow filter for service counties */}
          <defs>
            <filter id="county-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#5c3317" floodOpacity="0.45" />
            </filter>
          </defs>

          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies
                .filter(geo => String(geo.id).padStart(5, "0").startsWith(FL_PREFIX))
                .map(geo => {
                  const fips = String(geo.id).padStart(5, "0");
                  const svc = SERVICE_COUNTIES[fips];
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill:        svc ? COLOR_SERVICE : COLOR_OTHER,
                          stroke:      svc ? COLOR_STROKE_SERVICE : COLOR_STROKE_OTHER,
                          strokeWidth: svc ? 1.0 : 0.5,
                          outline:     "none",
                          cursor:      svc ? "pointer" : "default",
                          transition:  "fill 0.18s ease",
                          filter:      svc ? "url(#county-glow)" : "none",
                        },
                        hover: {
                          fill:        svc ? COLOR_SERVICE_HOVER : COLOR_OTHER,
                          stroke:      svc ? COLOR_STROKE_SERVICE : COLOR_STROKE_OTHER,
                          strokeWidth: svc ? 1.0 : 0.5,
                          outline:     "none",
                          filter:      svc ? "url(#county-glow)" : "none",
                        },
                        pressed: { outline: "none" },
                      }}
                      onMouseEnter={(e: React.MouseEvent) => {
                        if (svc) setTip({ x: e.clientX, y: e.clientY, name: svc.name, cities: svc.cities });
                      }}
                      onMouseMove={(e: React.MouseEvent) => {
                        if (svc) setTip(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);
                      }}
                      onMouseLeave={() => setTip(null)}
                    />
                  );
                })
            }
          </Geographies>
        </ComposableMap>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 justify-center text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLOR_SERVICE }} />
          Service area
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: COLOR_OTHER }} />
          Other counties
        </span>
      </div>

      {/* Tooltip */}
      {tip && (
        <div
          className="fixed z-50 pointer-events-none bg-foreground text-primary-foreground px-3 py-2 rounded-sm shadow-xl text-sm"
          style={{ left: tip.x + 14, top: tip.y - 48 }}
        >
          <p className="font-semibold font-serif">{tip.name}</p>
          <p className="text-white/60 text-xs mt-0.5">{tip.cities.join(" · ")}</p>
        </div>
      )}
    </div>
  );
}
