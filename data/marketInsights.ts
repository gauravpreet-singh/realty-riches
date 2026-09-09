export type MarketInsightSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type MarketInsight = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  image: string;
  featured?: boolean;

  introduction: string;
  sections: MarketInsightSection[];
  keyTakeaway: string;
  checklist: string[];
};

export const marketInsights: MarketInsight[] = [
  {
    slug: "how-to-evaluate-a-property",
    title: "How to evaluate a property before you buy",
    category: "Buying Guide",
    excerpt:
      "A practical framework for evaluating price, location, configuration, condition and long-term suitability before making a property decision.",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=85",
    featured: true,

    introduction:
      "Buying a property is rarely just about finding a home that looks good. A strong buying decision requires you to evaluate the property, the surrounding location, the financial commitment and how well the property fits your needs.",

    sections: [
      {
        heading: "Start with the location",
        paragraphs: [
          "A property should be evaluated in the context of its surroundings. Consider your regular commute, access to major roads, schools, healthcare, shopping and other destinations that matter to your household.",
          "Two properties with similar specifications can provide very different experiences because of their locations. Look beyond the project itself and understand what everyday life around the property will look like.",
        ],
        bullets: [
          "Daily commute and connectivity",
          "Schools and healthcare",
          "Shopping and everyday conveniences",
          "Current and surrounding development",
        ],
      },

      {
        heading: "Understand what you are actually buying",
        paragraphs: [
          "Look beyond the headline configuration. Understand the usable space, layout, orientation, floor, parking arrangements, amenities and other features that affect how the property will work for you.",
          "If the property is part of a larger project, evaluate the project as a whole rather than focusing only on the individual unit.",
        ],
        bullets: [
          "Configuration and usable space",
          "Parking",
          "Amenities",
          "Property condition",
          "Project infrastructure",
        ],
      },

      {
        heading: "Evaluate the financial commitment",
        paragraphs: [
          "The purchase price is only one part of the financial decision. Buyers should understand the down payment, expected loan amount, EMI and other costs associated with purchasing and maintaining the property.",
          "Avoid choosing a property solely because a lender may approve the loan. Your comfortable monthly budget should also account for savings, existing commitments and future financial needs.",
        ],
      },

      {
        heading: "Compare before deciding",
        paragraphs: [
          "Shortlisting several properties can make a decision much easier. Compare properties using consistent criteria instead of judging each one independently.",
          "Price, area, configuration, location, possession and practical suitability should all be considered together.",
        ],
      },

      {
        heading: "Verify before committing",
        paragraphs: [
          "Before making a booking or purchase decision, review the relevant property and project documentation and seek appropriate professional advice where necessary.",
          "The exact checks required will depend on the property type, project and transaction, so buyers should not rely solely on a general checklist.",
        ],
      },
    ],

    keyTakeaway:
      "A good property decision balances the property itself, the location, affordability and the risks you are comfortable taking. Don't let a single attractive feature determine the entire decision.",

    checklist: [
      "Have I evaluated the surrounding location?",
      "Does the property fit my actual space requirements?",
      "Can I comfortably afford the overall financial commitment?",
      "Have I compared it with other shortlisted properties?",
      "Have I reviewed the relevant documents and project information?",
    ],
  },

  {
    slug: "new-chandigarh-location-guide",
    title: "Understanding New Chandigarh as a residential destination",
    category: "Location Guide",
    excerpt:
      "Explore the factors buyers should consider when evaluating residential opportunities in New Chandigarh.",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",

    introduction:
      "New Chandigarh is an evolving residential destination within the wider Chandigarh–Mohali region. Buyers considering the area should evaluate not only individual projects but also connectivity, surrounding development and their own long-term requirements.",

    sections: [
      {
        heading: "Understand the development context",
        paragraphs: [
          "Newer residential destinations can offer buyers a different environment from established urban neighbourhoods. The surrounding development, available infrastructure and future changes to the area can all influence the buying experience.",
        ],
      },

      {
        heading: "Think about your daily commute",
        paragraphs: [
          "Connectivity should be evaluated based on your actual routine. A location that works well for one buyer may be less convenient for another depending on where they work, study or regularly travel.",
        ],
        bullets: [
          "Workplace accessibility",
          "Access to Chandigarh",
          "Road connectivity",
          "Access to everyday services",
        ],
      },

      {
        heading: "Compare projects carefully",
        paragraphs: [
          "Properties within the same broad location can differ significantly in design, amenities, possession status, surrounding development and overall suitability.",
          "Compare the individual project rather than assuming every property in the area offers the same experience.",
        ],
      },
    ],

    keyTakeaway:
      "When evaluating New Chandigarh, look beyond the project brochure. Compare the specific property's connectivity, surroundings, development context and suitability for your daily life.",

    checklist: [
      "Does the location fit my daily commute?",
      "What is available around the specific project?",
      "How developed is the immediate surrounding area?",
      "Have I compared multiple projects?",
      "Does the property suit my long-term requirements?",
    ],
  },

  {
    slug: "how-much-home-can-you-afford",
    title: "How much home can you comfortably afford?",
    category: "Finance",
    excerpt:
      "Understand the relationship between your income, down payment, loan amount, EMI and overall home-buying budget.",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=85",

    introduction:
      "A lender's maximum loan eligibility and your comfortable home-buying budget are not necessarily the same thing. A responsible budget should account for your income, existing commitments, savings and the long-term financial impact of the purchase.",

    sections: [
      {
        heading: "Start with your overall budget",
        paragraphs: [
          "Begin by understanding how much money you can realistically allocate toward the purchase without putting unnecessary pressure on your finances.",
          "Consider your available savings, expected down payment and other purchase-related costs in addition to the headline property price.",
        ],
      },

      {
        heading: "Understand the EMI",
        paragraphs: [
          "The EMI depends on factors such as the loan amount, interest rate and tenure. A longer tenure can reduce the monthly payment while increasing the total interest paid over the life of the loan.",
        ],
      },

      {
        heading: "Don't forget the additional costs",
        paragraphs: [
          "The purchase price should not be treated as the only cost. Buyers should understand the applicable transaction, financing, registration, maintenance and other expenses relevant to their purchase.",
        ],
      },

      {
        heading: "Use scenarios rather than one number",
        paragraphs: [
          "Instead of planning around a single EMI, consider several scenarios. Compare different down payments and loan tenures to understand how they affect both monthly affordability and total repayment.",
        ],
      },
    ],

    keyTakeaway:
      "Choose a property based on a sustainable financial commitment, not simply the maximum amount you can borrow.",

    checklist: [
      "How much can I comfortably use as a down payment?",
      "What monthly EMI fits my budget?",
      "Have I considered existing financial commitments?",
      "Have I considered additional purchase costs?",
      "Have I compared different loan scenarios?",
    ],
  },

  {
    slug: "questions-to-ask-before-booking",
    title: "Questions to ask before booking a property",
    category: "Buyer Guide",
    excerpt:
      "From possession and documentation to amenities and project details, know what to ask before committing to a property.",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1600&q=85",

    introduction:
      "A property booking is a significant commitment. Asking the right questions before making that commitment can help you understand exactly what you are buying and identify areas that require further verification.",

    sections: [
      {
        heading: "Ask about the property",
        paragraphs: [
          "Understand the configuration, usable area, orientation, floor, parking and features included with the property.",
        ],
        bullets: [
          "What exactly is included?",
          "What is the usable area?",
          "What parking is allocated?",
          "Which amenities are currently available?",
        ],
      },

      {
        heading: "Ask about possession",
        paragraphs: [
          "For projects that are not ready for possession, understand the stated possession timeline and what stage of development the project is currently at.",
        ],
      },

      {
        heading: "Ask about costs",
        paragraphs: [
          "Request clarity on the complete cost structure rather than evaluating only the advertised base price.",
        ],
      },

      {
        heading: "Ask for documentation",
        paragraphs: [
          "Request the relevant project and property documentation and verify information through appropriate professional or official channels where necessary.",
        ],
      },
    ],

    keyTakeaway:
      "If an important part of the purchase is unclear, pause and ask for clarification before making a commitment.",

    checklist: [
      "Do I understand the complete cost?",
      "Do I understand possession status?",
      "Do I know exactly what is included?",
      "Have I reviewed the relevant documentation?",
      "Have I compared the property with alternatives?",
    ],
  },

  {
    slug: "apartment-vs-villa",
    title: "Apartment vs villa: which is right for you?",
    category: "Buying Guide",
    excerpt:
      "Compare the practical differences between apartments and villas across space, maintenance, privacy and lifestyle.",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",

    introduction:
      "Apartments and villas can both be excellent choices, but they solve different lifestyle and space requirements. The right choice depends on how you intend to use the property and what trade-offs matter most to you.",

    sections: [
      {
        heading: "Space and privacy",
        paragraphs: [
          "Villas generally provide more private space and may offer outdoor areas, while apartments can provide efficient layouts within a managed community environment.",
        ],
      },

      {
        heading: "Maintenance and amenities",
        paragraphs: [
          "Apartment communities often centralize maintenance and provide shared amenities. Villa ownership can provide more control over the property but may also involve greater responsibility for maintenance.",
        ],
      },

      {
        heading: "Location and budget",
        paragraphs: [
          "The choice should also be evaluated against your budget and preferred location. A buyer may have to trade off between property size, location and community features.",
        ],
      },
    ],

    keyTakeaway:
      "Choose between an apartment and villa based on how you want to live, not simply on which property type appears more premium.",

    checklist: [
      "How much private space do I need?",
      "Do I want shared community amenities?",
      "How much maintenance responsibility am I comfortable with?",
      "Which locations fit my budget?",
      "Have I compared total ownership costs?",
    ],
  },

  {
    slug: "understanding-property-location",
    title: "Why location matters more than the property itself",
    category: "Location Guide",
    excerpt:
      "Learn how connectivity, everyday conveniences, neighbourhood development and accessibility influence a property decision.",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1600&q=85",

    introduction:
      "A property does not exist in isolation. The roads you use, places you visit and services around your home can have a major effect on your everyday experience.",

    sections: [
      {
        heading: "Evaluate everyday connectivity",
        paragraphs: [
          "Think about the destinations that matter to your household and evaluate how practical the property is for regular travel.",
        ],
      },

      {
        heading: "Look at the immediate surroundings",
        paragraphs: [
          "A location can look attractive at a city level while the immediate surroundings of a property may tell a different story. Visit the area and understand the environment around the project.",
        ],
      },

      {
        heading: "Consider your long-term needs",
        paragraphs: [
          "Your location requirements may change over time. Consider schools, healthcare, work, family needs and other factors that could influence the suitability of the location.",
        ],
      },
    ],

    keyTakeaway:
      "Evaluate the property and its surroundings together. The best property on paper may not be the best property for your everyday life.",

    checklist: [
      "How practical is the daily commute?",
      "What services are nearby?",
      "What is the immediate surrounding environment like?",
      "Does the location suit my long-term needs?",
      "Have I visited the location personally?",
    ],
  },

  {
    slug: "property-due-diligence",
    title: "Property due diligence: what buyers should check",
    category: "Due Diligence",
    excerpt:
      "A buyer-focused introduction to the documents, approvals, project details and practical checks worth reviewing.",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=85",

    introduction:
      "Due diligence is one of the most important parts of a property purchase. The exact checks depend on the property and transaction, but buyers should understand the importance of reviewing documentation and verifying key claims.",

    sections: [
      {
        heading: "Understand the property documentation",
        paragraphs: [
          "Ask for the relevant documents relating to the property and ownership. Where necessary, have them reviewed by an appropriately qualified professional.",
        ],
      },

      {
        heading: "Review project information",
        paragraphs: [
          "For a project purchase, understand the project's approvals, development status, possession information and other relevant details.",
        ],
      },

      {
        heading: "Verify important claims",
        paragraphs: [
          "Don't rely solely on marketing material for important purchase decisions. Verify material claims through appropriate documentation or official sources.",
        ],
      },

      {
        heading: "Get professional advice when necessary",
        paragraphs: [
          "Property transactions can involve legal, financial and regulatory considerations. Professional advice can be valuable when the transaction or documentation is complex.",
        ],
      },
    ],

    keyTakeaway:
      "Due diligence should reduce uncertainty before you commit. If an important issue cannot be verified, treat it as something that needs further investigation.",

    checklist: [
      "Have I reviewed the relevant property documents?",
      "Have I checked project information?",
      "Have important claims been verified?",
      "Do I need legal or financial advice?",
      "Are there unresolved questions before booking?",
    ],
  },

  {
    slug: "first-time-home-buyer-guide",
    title: "A first-time buyer's guide to purchasing a home",
    category: "Buyer Guide",
    excerpt:
      "A simple roadmap covering discovery, budgeting, property evaluation, comparison and the steps before purchase.",
    readTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",

    introduction:
      "Buying your first home can feel overwhelming because there are many decisions to make at once. A structured process can make the journey easier to understand and help you avoid rushing into a decision.",

    sections: [
      {
        heading: "1. Define your requirements",
        paragraphs: [
          "Start with the fundamentals: location, property type, size, configuration, lifestyle requirements and approximate budget.",
        ],
      },

      {
        heading: "2. Understand affordability",
        paragraphs: [
          "Review your savings, down payment capacity, potential loan requirements and comfortable monthly budget before seriously shortlisting properties.",
        ],
      },

      {
        heading: "3. Explore and shortlist",
        paragraphs: [
          "Use property listings and location information to create a shortlist. Avoid trying to evaluate every available property.",
        ],
      },

      {
        heading: "4. Visit and compare",
        paragraphs: [
          "Visit shortlisted properties and compare them using consistent criteria. Look at the property as well as its surroundings.",
        ],
      },

      {
        heading: "5. Verify before committing",
        paragraphs: [
          "Before booking or purchasing, review the relevant documentation, costs and project information and seek professional advice where appropriate.",
        ],
      },
    ],

    keyTakeaway:
      "The first property you like does not have to be the property you buy. Give yourself enough time to understand, compare and verify.",

    checklist: [
      "Have I defined my requirements?",
      "Do I understand my comfortable budget?",
      "Have I shortlisted multiple properties?",
      "Have I visited the properties?",
      "Have I completed the necessary checks before committing?",
    ],
  },
];

