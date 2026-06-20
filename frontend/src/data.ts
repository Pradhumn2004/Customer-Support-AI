import { Industry, KeyFeature, Step, Integration, Testimonial } from './types';

export const INDUSTRIES: Industry[] = [
  {
    id: 'saas',
    name: 'SaaS',
    description: 'Connect your customer data and customer communication pipelines seamlessly.',
    demoPrompt: 'How do I configure custom webhook payloads for Billing API triggers?',
    demoOutput: 'Integrations > Webhooks. I found your endpoints and constructed a secure webhook payload schema matching your TypeScript interface:',
    suggestions: [
      'How do I reset my API key?',
      'Can I integrate with Salesforce?',
      'What are your uptime SLAs?'
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion',
    description: 'Complete visual catalog tagging, seasonal style matching and shopping advice.',
    demoPrompt: 'Suggest coordinate accessories for a mid-century velvet dress.',
    demoOutput: 'Analyzing visual silhouette database. Recommended accessory set: Brushed Gold Drop Earrings, Suede Heels (Amber #E48F2), and a Minimalist Ivory clutch.',
    suggestions: [
      'What shoes go with a navy suit?',
      'Show me summer dress trends',
      'Do you have size guide for tops?'
    ]
  },
  {
    id: 'fintech',
    name: 'Fintech',
    description: 'Secure financial transaction analysis, automated reconciliation and fraud alerts.',
    demoPrompt: 'Verify billing anomaly on reference wire settlement ID-92842.',
    demoOutput: 'Transaction verified. Found a $4.80 discrepancy resulting from exchange-rate delta at 14:02 UTC. Compliance flag: Zero-risk anomaly.',
    suggestions: [
      'Flag a suspicious transaction',
      'How do I reconcile my ledger?',
      'Explain PCI-DSS compliance'
    ]
  },
  {
    id: 'telemedicine',
    name: 'Telemedicine',
    description: 'HIPAA-compliant medical symptoms triage, records parsing, and scheduling.',
    demoPrompt: 'Suggest slot schedule availability with specialized pediatric care.',
    demoOutput: 'Checking provider database. Dr. Aris (Pediatric Allergy) is open for video consultation today at 13:40 or 16:15 UTC. Encryption: Verified HIPAA compliant.',
    suggestions: [
      'Book a pediatric appointment',
      'What are my symptoms?',
      'Is my data HIPAA compliant?'
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Automated order resolutions, real-time logistics lookup, and product assistance.',
    demoPrompt: 'Track and draft response for customer delayed package #TRK-8819.',
    demoOutput: 'Order status: Delayed due to weather at Memphis hub. Expected delivery revised to Jun 21. Prepared customer draft advising of express waiver refund.',
    suggestions: [
      'Where is my order?',
      'I want a refund',
      'Track package TRK-8819'
    ]
  },
  {
    id: 'elearning',
    name: 'E-learning',
    description: 'Automate lesson scheduling, syllabus drafting, and interactive grading tips.',
    demoPrompt: 'Draft a three-week conceptual curriculum on Neural Transformers.',
    demoOutput: '1. Attention Mechanism Foundations (Self & Cross Attention), 2. Query/Key/Value Matrix operations, 3. Positional encoding & Multi-head layers.',
    suggestions: [
      'Help me with my math homework',
      'Suggest a course on Python',
      'How do I track student progress?'
    ]
  }
];

export const KEY_FEATURES: KeyFeature[] = [
  {
    id: 'nlp',
    name: 'Natural Language Processing',
    description: 'Sophisticated semantic model parsing, conversational context recall, and emotion-aware support loops.',
    gradient: 'from-purple-600 to-indigo-600',
    icon: 'Brain'
  },
  {
    id: 'ticketing',
    name: 'Automated Ticketing',
    description: 'Algorithmic tier sorting, metadata enrichment, sentiment categorizer, and direct database webhooks routing.',
    gradient: 'from-slate-700 to-slate-900',
    icon: 'Ticket'
  },
  {
    id: 'insights',
    name: 'Predictive Insights',
    description: 'Trend analysis forecasts, churn detection vectors, and user friction diagnostic flow charts.',
    gradient: 'from-indigo-600 to-blue-600',
    icon: 'TrendingUp'
  },
  {
    id: 'analytics',
    name: 'Real-time Analytics',
    description: 'Live performance metrics, conversation volume graphs, latency tracking, and throughput visualization dashboard.',
    gradient: 'from-blue-600 to-cyan-500',
    icon: 'BarChart3'
  }
];

export const STEPS: Step[] = [
  {
    number: 1,
    title: 'Connect Your Data',
    description: 'Connect and synchronize customer databases, catalogs, API docs or past support interaction history.',
    iconName: 'Link'
  },
  {
    number: 2,
    title: 'Train the AI',
    description: 'The secure AI automatically processes and constructs custom intent models matching your company brand.',
    iconName: 'Sparkles'
  },
  {
    number: 3,
    title: 'Automate Support',
    description: 'Deploy instant answering widgets, multi-channel webhook dispatch, and automated routing parameters.',
    iconName: 'Zap'
  }
];

export const INTEGRATIONS: Integration[] = [
  { name: 'Slack', category: 'Chat & Teams', logo: 'SlackIcon' },
  { name: 'Discord', category: 'Community Support', logo: 'DiscordIcon' },
  { name: 'Salesforce', category: 'CRM & Accounts', logo: 'SalesforceIcon' },
  { name: 'Zendesk', category: 'Ticketing Platform', logo: 'ZendeskIcon' },
  { name: 'GDPR Direct', category: 'Privacy Standard', logo: 'ShieldCheck' },
  { name: 'HubSpot', category: 'CRM & Marketing', logo: 'HubspotIcon' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    text: "Accidentally set our average response time to 1.2 seconds. Our customers literally think our executive engineering team is on stand-by 24/7. An absolute game changer for our operations.",
    author: "Marc Lemaire",
    handle: "@marclem_dev",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    verified: true,
    size: 'large'
  },
  {
    text: "Integrates with Slack, Salesforce and our internal databases in under ten minutes. The LLM zero-shot accuracy when answering complex technical documentation inquiries is outstanding.",
    author: "Elena Rostov",
    handle: "@elenar_tech",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    verified: true,
    size: 'medium'
  },
  {
    text: "Privacy parameters are extremely granular. We successfully masked all customer PII while maintaining state-of-the-art context recall. Compliance standard audit passed on the first attempt.",
    author: "Devon Carter",
    handle: "@dcarter_sec",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    verified: true,
    size: 'medium'
  },
  {
    text: "We scaled our concurrent live user chat support from 400 to 20,000 requests overnight without increasing our overhead by a single dollar. Unbelievably robust tech.",
    author: "Aitana Ortega",
    handle: "@aitana_design",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    verified: true,
    size: 'large'
  }
];
