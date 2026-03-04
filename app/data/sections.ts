export interface Section {
  id: string;
  title: string;
  category: "situation" | "practical";
}

export const EMERGENCY_CONTACTS = {
  uae: [
    { label: "Police",        number: "999" },
    { label: "Ambulance",     number: "998" },
    { label: "Civil Defense", number: "997" },
    { label: "NCEMA Hotline", number: "800-62362" },
    { label: "Coast Guard",   number: "996" },
  ],
  embassies: [
    { country: "India",       phone: "+971-2-4492700" },
    { country: "USA",         phone: "+971-2-414-2200" },
    { country: "UK",          phone: "+971-2-610-1100" },
    { country: "Philippines", phone: "+971-2-634-4789" },
    { country: "Pakistan",    phone: "+971-2-444-7800" },
    { country: "Bangladesh",  phone: "+971-2-634-4812" },
    { country: "Sri Lanka",   phone: "+971-2-634-8766" },
    { country: "Nepal",       phone: "+971-2-634-8385" },
    { country: "Canada",      phone: "+971-2-694-0300" },
    { country: "Australia",   phone: "+971-2-401-7500" },
    { country: "France",      phone: "+971-2-443-5100" },
    { country: "Germany",     phone: "+971-2-644-6693" },
  ],
};

export const SECTIONS_META = [
  { id: "overview",      title: "Overview",           category: "situation" as const, shortTitle: "Overview"    },
  { id: "attacks",       title: "Recent Attacks",      category: "situation" as const, shortTitle: "Attacks"     },
  { id: "iran-position", title: "Iran's Position",     category: "situation" as const, shortTitle: "Iran"        },
  { id: "uae-response",  title: "UAE Response",        category: "situation" as const, shortTitle: "UAE"         },
  { id: "casualties",    title: "Casualties & Damage", category: "situation" as const, shortTitle: "Casualties"  },
  { id: "history",       title: "Background",          category: "situation" as const, shortTitle: "History"     },
  { id: "flights",       title: "Flights & Airspace",  category: "practical" as const, shortTitle: "Flights"     },
  { id: "markets",       title: "Markets & Economy",   category: "practical" as const, shortTitle: "Markets"     },
  { id: "emergency",     title: "Emergency Contacts",  category: "practical" as const, shortTitle: "Emergency"   },
  { id: "shelter",       title: "During an Alert",     category: "practical" as const, shortTitle: "Shelter"     },
  { id: "supplies",      title: "Supplies Checklist",  category: "practical" as const, shortTitle: "Supplies"    },
  { id: "exit",          title: "Exit Options",        category: "practical" as const, shortTitle: "Exit"        },
  { id: "informed",      title: "Stay Informed",       category: "practical" as const, shortTitle: "Info"        },
];
