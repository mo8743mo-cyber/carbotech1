const STORAGE_PREFIX = "carbotech.local.";
const USER_KEY = `${STORAGE_PREFIX}user`;
const PENDING_KEY = `${STORAGE_PREFIX}pending-registration`;
const TOKEN_KEY = `${STORAGE_PREFIX}token`;

const seed = {
  Spoiler: [
    {
      id: "spoiler-911-gt", name: "911 GT3 Touring Rear Wing", vehicle_make: "Porsche",
      vehicle_model: "911 GT3", vehicle_year_from: 2022, spoiler_type: "gt-wing",
      availability: "made-to-order", price: 6940, material: "2x2 twill carbon",
      description: "Autoclave-cured rear wing with OEM mounting points and UV-stable clear coat.",
      images: ["/assets/spoiler-gt-wing.png"], featured: true, published: true,
    },
    {
      id: "spoiler-m3-lip", name: "M3 Competition Front Lip", vehicle_make: "BMW",
      vehicle_model: "M3", vehicle_year_from: 2021, vehicle_year_to: 2024, spoiler_type: "lip-spoiler",
      availability: "in-stock", price: 2590, material: "Pre-preg twill carbon",
      description: "Lightweight front lip designed for direct fitment and a clean aggressive profile.",
      images: ["/assets/spoiler-front-lip.png"], featured: true, published: true,
    },
    {
      id: "spoiler-amg-ducktail", name: "AMG GT Ducktail", vehicle_make: "Mercedes-Benz",
      vehicle_model: "AMG GT", vehicle_year_from: 2020, spoiler_type: "ducktail",
      availability: "low-stock", price: 4650, material: "Forged carbon",
      description: "Hand-finished ducktail spoiler with balanced downforce and a deep gloss finish.",
      images: ["/assets/spoiler-rear-wing.png"], featured: false, published: true,
    },
  ],
  PortfolioProject: [
    {
      id: "portfolio-aero", title: "Track Aero Package", category: "automotive",
      description: "A complete carbon aero package developed for repeatable track performance.",
      materials: "Pre-preg carbon fiber", process: "Autoclave cure and CNC trimming",
      completion_date: "2024-06-01", images: ["/assets/autoclave-carbon-layup.jpg"], published: true,
    },
    {
      id: "portfolio-drone", title: "Long-Range UAV Shell", category: "drone",
      description: "A lightweight protective shell balancing stiffness, serviceability, and range.",
      materials: "Carbon/Kevlar hybrid", process: "Vacuum infusion and bonded assembly",
      completion_date: "2024-02-15", images: ["/assets/drone-carbon-frame.jpg"], published: true,
    },
  ],
  CustomInquiry: [],
  QuoteRequest: [],
  MediaAsset: [],
};

function read(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
}

function collection(name) {
  const key = `${STORAGE_PREFIX}${name}`;
  const current = read(key, null);
  if (current) {
    if (name === "PortfolioProject") {
      const migrated = current.map((item) => {
        if (item.id === "portfolio-aero" && item.images?.[0] === "/assets/hero-aero.svg") {
          return { ...item, images: ["/assets/autoclave-carbon-layup.jpg"] };
        }
        if (item.id === "portfolio-drone" && item.images?.[0] === "/assets/drone-shell.svg") {
          return { ...item, images: ["/assets/drone-carbon-frame.jpg"] };
        }
        return item;
      });
      if (migrated.some((item, index) => item !== current[index])) write(key, migrated);
      return migrated;
    }
    return current;
  }
  return write(key, seed[name] || []);
}

function sortItems(items, sort = "-created_date") {
  const descending = sort.startsWith("-");
  const field = descending ? sort.slice(1) : sort;
  return [...items].sort((a, b) => {
    const left = a[field] ?? "";
    const right = b[field] ?? "";
    return (left < right ? -1 : left > right ? 1 : 0) * (descending ? -1 : 1);
  });
}

function entityApi(name) {
  return {
    async list(sort = "-created_date", limit = 100) {
      return sortItems(collection(name), sort).slice(0, limit);
    },
    async filter(filters = {}, sort = "-created_date", limit = 100) {
      const items = collection(name).filter((item) =>
        Object.entries(filters).every(([key, value]) => item[key] === value)
      );
      return sortItems(items, sort).slice(0, limit);
    },
    async create(data) {
      const items = collection(name);
      const item = { ...data, id: data.id || `${name.toLowerCase()}-${Date.now()}`, created_date: new Date().toISOString() };
      write(`${STORAGE_PREFIX}${name}`, [item, ...items]);
      return item;
    },
    async update(id, data) {
      const items = collection(name);
      const updated = items.map((item) => item.id === id ? { ...item, ...data, updated_date: new Date().toISOString() } : item);
      write(`${STORAGE_PREFIX}${name}`, updated);
      return updated.find((item) => item.id === id);
    },
    async delete(id) {
      write(`${STORAGE_PREFIX}${name}`, collection(name).filter((item) => item.id !== id));
    },
  };
}

const auth = {
  async me() {
    const user = read(USER_KEY, null);
    if (!user) throw new Error("Not authenticated");
    return user;
  },
  async loginViaEmailPassword(email, password) {
    if (!email || !password) throw new Error("Email and password are required");
    const user = { id: `user-${email}`, email, role: email.toLowerCase() === "admin@carbotech.local" ? "admin" : "user" };
    write(USER_KEY, user);
    write(TOKEN_KEY, "local-token");
    return user;
  },
  async register({ email, password }) {
    if (!email || !password) throw new Error("Email and password are required");
    write(PENDING_KEY, { email, password });
    return { ok: true };
  },
  async verifyOtp({ email, otpCode: _otpCode }) {
    const pending = read(PENDING_KEY, null);
    if (!pending || pending.email !== email) throw new Error("Registration session expired");
    const user = { id: `user-${email}`, email, role: "user" };
    write(USER_KEY, user);
    write(TOKEN_KEY, "local-token");
    localStorage.removeItem(PENDING_KEY);
    return { access_token: "local-token", user };
  },
  async resendOtp(_email) { return { ok: true }; },
  async resetPasswordRequest(email) {
    if (!email) throw new Error("Email is required");
    return { ok: true };
  },
  async resetPassword(_data) { return { ok: true }; },
  setToken(token) { write(TOKEN_KEY, token); },
  loginWithProvider(_provider, _returnTo) {
    const user = { id: "user-local", email: "local.user@carbotech.local", role: "user" };
    write(USER_KEY, user);
    write(TOKEN_KEY, "local-token");
    window.location.href = "/";
  },
  logout() {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  },
  redirectToLogin() { window.location.href = "/login"; },
};

export const base44 = {
  auth,
  app: { async getPublicSettings() { return { id: "carbotech-local", public_settings: {} }; } },
  entities: Object.fromEntries(Object.keys(seed).map((name) => [name, entityApi(name)])),
  integrations: {
    Core: {
      async UploadFile({ file }) {
        return new Promise((resolve, reject) => {
          if (!file) return reject(new Error("No file selected"));
          const reader = new FileReader();
          reader.onload = () => resolve({ file_url: reader.result });
          reader.onerror = () => reject(reader.error || new Error("Could not read file"));
          reader.readAsDataURL(file);
        });
      },
    },
  },
  functions: { async invoke(_name, _data) { return { ok: true }; } },
};

export default base44;
