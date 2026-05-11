export const siteConfig = {
  name: "Sushmita Girls Hostel",
  defaultTitle: "Girls Hostel in Patna | Sushmita Girls Hostel",
  defaultDescription:
    "Sushmita Girls Hostel offers safe, owner-managed girls hostel accommodation in Patna with hygienic meals, CCTV security, and branches at Boring Road and Rajapur.",
  locale: "en_IN",
  founderNames: ["Sushmita Sinha", "Rakesh Sinha"],
  establishedYear: "2010",
  city: "Patna",
  region: "Bihar",
  country: "IN",
  image: "/gallery/building-exterior.png",
  contact: {
    primaryPhone: "+91 94316 25833",
    secondaryPhone: "+91 93414 53366",
    whatsappPhone: "917903304001",
    email: "sushmitagirlshostelpatna@gmail.com",
  },
  hours: {
    display: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: 10:00 AM - 4:00 PM"],
    structured: [
      {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        days: ["Sunday"],
        opens: "10:00",
        closes: "16:00",
      },
    ],
  },
} as const;

export const branches = [
  {
    slug: "girls-hostel-boring-road-patna",
    path: "/girls-hostel-boring-road-patna",
    shortName: "Boring Road",
    name: "Sushmita Girls Hostel - Boring Road Branch",
    locality: "Boring Road",
    addressLine1: "House No. 14, Montessori School Lane",
    address: "House No. 14, Montessori School Lane, Boring Road, Patna 800001",
    addressPoints: [
      "House No. 60B, Montessori School Lane, Boring Road, Patna 800001",
      "House No. 14, Montessori School Lane, Boring Road, Patna 800001",
    ],
    postalCode: "800001",
    image: "/gallery/building-exterior.png",
    mapQuery: "House+No+14+Montessori+School+Lane+Boring+Road+Patna+800001",
    title: "Girls Hostel in Boring Road, Patna | Sushmita Girls Hostel",
    description:
      "Find a safe girls hostel in Boring Road, Patna with owner-managed care, CCTV security, hygienic meals, and quick access to colleges and coaching institutes.",
    intro:
      "Our Boring Road branch serves students at both House No. 14 and House No. 60B, Montessori School Lane, with the same owner-managed support in a calm, study-friendly setting close to Patna's academic hubs.",
    subLocations: [
      {
        label: "House No. 14",
        address: "House No. 14, Montessori School Lane, Boring Road, Patna 800001",
      },
      {
        label: "House No. 60B",
        address: "House No. 60B, Montessori School Lane, Boring Road, Patna 800001",
      },
    ],
    sixtyBPhotos: [
      {
        src: "/gallery/boring-road-60b-exterior.png",
        alt: "Boring Road 60B branch building exterior",
      },
      {
        src: "/gallery/boring-road-60b-room.png",
        alt: "Boring Road 60B branch furnished room",
      },
      {
        src: "/gallery/boring-road-60b-bathroom.png",
        alt: "Boring Road 60B branch bathroom",
      },
      {
        src: "/gallery/boring-road-60b-terrace.png",
        alt: "Boring Road 60B branch terrace area",
      },
    ],
    nearby: [
      "Walking distance to Allen Coaching, Physics Wallah, and Mentors Eduserv",
      "Close to major colleges and student areas",
      "Quiet residential lane for focused study",
    ],
    features: [
      "Owner-managed hostel environment",
      "24/7 CCTV surveillance",
      "Female warden on site",
      "Hygienic home-style meals",
      "RO water cooler",
      "Peaceful study-friendly atmosphere",
    ],
  },
  {
    slug: "girls-hostel-rajapur-patna",
    path: "/girls-hostel-rajapur-patna",
    shortName: "Rajapur",
    name: "Sushmita Girls Hostel - Rajapur Branch",
    locality: "Rajapur",
    addressLine1: "4th Floor, Awaas Apt., Rajapur Pul, Beside Reliance Digital",
    address: "4th Floor, Awaas Apt., Rajapur Pul, Beside Reliance Digital, Patna 800001",
    postalCode: "800001",
    image: "/gallery/double-room.png",
    mapQuery: "4th+Floor,+Awaas+Apt.,+Rajapur+Pul,+Beside+Reliance+Digital,+Patna+800001",
    title: "Girls Hostel in Rajapur, Patna | Sushmita Girls Hostel",
    description:
      "Choose our Rajapur girls hostel in Patna for secure accommodation, modern facilities, owner-managed support, and convenient access to main student routes.",
    intro:
      "The Rajapur branch offers modern infrastructure and practical connectivity for students looking for safe, comfortable accommodation in central Patna.",
    nearby: [
      "Next to Aakash Institute and Unacademy",
      "Close to daily essentials and local markets",
      "Well-connected for coaching and college commutes",
    ],
    features: [
      "Modern infrastructure",
      "Secure entry and CCTV coverage",
      "Clean washrooms and common areas",
      "Power backup",
      "Washing machine",
      "High-speed Wi-Fi",
      "Supportive owner-managed care",
    ],
  },
] as const;

export const publicRoutes = ["/", ...branches.map((branch) => branch.path)];

export const getBranchBySlug = (slug: string) => branches.find((branch) => branch.slug === slug);
