import Entity from "../types/Entity"

const projects: Entity[] = [
  {
    title: "Smart Agriculture System",
    authors: ["Alice Johnson", "Bob Smith"],
    tutors: ["Dr. Emily White"],
    relatedProducts: [
      {
        type: "Article",
        title: "Advancing Precision Farming Through IoT",
        url: "https://example.com/precision-farming",
      },
    ],
    investment: 50000,
    startDate: "2023-01-15",
    endDate: "2024-06-30",
    keywords: ["IoT", "Agriculture", "Sustainability"],
    currentState: "In Progress",
  },
  {
    title: "AI-Powered Educational Tools",
    authors: ["Catherine Blake", "Derek Lee"],
    tutors: ["Dr. Henry Adams", "Dr. Rachel Ford"],
    relatedProducts: [
      {
        type: "Paper",
        title: "Adaptive Learning Systems Using Machine Learning",
        url: "https://example.com/adaptive-learning",
      },
    ],
    investment: 75000,
    startDate: "2022-05-01",
    endDate: "2023-12-31",
    keywords: ["AI", "Education", "Adaptive Learning"],
    currentState: "Finished",
  },
  {
    title:
      "Renewable Energy Optimization Renewable Energy Optimization Renewable Energy Optimization Renewable Energy Optimization Renewable Energy Optimization",
    authors: ["Sarah Green", "Tom Davis"],
    tutors: ["Dr. Oliver Black"],
    relatedProducts: [
      {
        type: "Article",
        title: "Maximizing Solar Panel Efficiency with AI",
        url: "https://example.com/solar-efficiency",
      },
    ],
    investment: 120000,
    startDate: "2023-03-01",
    endDate: "2024-09-15",
    keywords: ["Renewable Energy", "Optimization", "AI"],
    currentState: "In Progress",
  },
  {
    title:
      "Urban Mobility Solutions Urban Mobility Solutions Urban Mobility Solutions Urban Mobility Solutions",
    authors: ["Nina Brown", "James Wilson"],
    tutors: ["Dr. Clara Evans"],
    relatedProducts: [
      {
        type: "Paper",
        title: "Adaptive Learning Systems Using Machine Learning",
        url: "https://example.com/adaptive-learning",
      },
    ],
    investment: 95000,
    startDate: "2021-07-01",
    endDate: "2022-12-31",
    keywords: ["Urban Planning", "Mobility", "Sustainability"],
    currentState: "Finished",
  },
  {
    title: "Blockchain for Healthcare",
    authors: ["Olivia Taylor", "Liam Johnson"],
    tutors: ["Dr. Samuel Edwards"],
    relatedProducts: [
      {
        type: "Paper",
        title: "Enhancing Patient Data Security with Blockchain",
        url: "https://example.com/blockchain-healthcare",
      },
    ],
    investment: 80000,
    startDate: "2022-09-01",
    endDate: "2023-08-31",
    keywords: ["Blockchain", "Healthcare", "Security"],
    currentState: "Cancelled",
  },
  {
    title: "Autonomous Drone Delivery",
    authors: ["Sophia Harris", "Noah Martinez"],
    tutors: ["Dr. Martin Hughes"],
    relatedProducts: [
      {
        type: "Paper",
        title: "Adaptive Learning Systems Using Machine Learning",
        url: "https://example.com/adaptive-learning",
      },
    ],
    investment: 105000,
    startDate: "2023-04-01",
    endDate: "2024-12-31",
    keywords: ["Drones", "Autonomous Systems", "Logistics"],
    currentState: "In Progress",
  },
  {
    title: "Water Purification with Nanotechnology",
    authors: ["Isabella Moore", "Ethan Walker"],
    tutors: ["Dr. Fiona Turner"],
    relatedProducts: [
      {
        type: "Article",
        title: "Revolutionizing Water Treatment with Nanotech",
        url: "https://example.com/nanotech-water",
      },
    ],
    investment: 65000,
    startDate: "2022-01-01",
    endDate: "2023-06-30",
    keywords: ["Nanotechnology", "CIDETIU", "Environment"],
    currentState: "Inactive",
  },
]

export default projects
