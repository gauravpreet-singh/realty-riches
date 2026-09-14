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
      "Buying a property is rarely just about finding a home that looks good. A strong decision comes from evaluating the property, its surroundings, the complete financial commitment and the risks you are comfortable taking. This guide gives buyers a practical framework for moving from an attractive listing to a well-considered decision.",

    sections: [
      {
        heading: "Start with the location",
        paragraphs: [
          "Begin with the places that shape your everyday life: work, schools, healthcare, family, shopping and the roads you use regularly. A property can have excellent specifications and still be inconvenient if routine travel is consistently difficult.",
          "Visit the neighbourhood rather than judging it only from a brochure or map. Look at the approach roads, surrounding construction, access to essentials and how the area feels at the times you are most likely to use it.",

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
          "The headline configuration tells only part of the story. Look closely at usable space, room proportions, natural light, ventilation, orientation, floor, parking and the features actually included in the offering.",
          "For a larger project, evaluate the project as well as the individual unit. Common areas, maintenance arrangements, amenities, access and the overall development can affect your experience long after the booking.",

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
          "The purchase price is only one part of the financial decision. Consider the down payment, expected loan, EMI and other applicable costs associated with purchasing and maintaining the property.",
          "A lender’s maximum eligibility is not the same as a comfortable budget. Leave room for savings, existing commitments, emergencies and future financial goals.",

        ],
      },

      {
        heading: "Compare before deciding",
        paragraphs: [
          "Create a shortlist and compare properties using the same criteria. Record price, area, configuration, location, possession, parking, amenities and any concerns so that an attractive feature does not overshadow an important drawback.",
          "Comparison makes trade-offs visible. It helps you understand what you are paying extra for and which compromises you are genuinely comfortable making.",

        ],
      },

      {
        heading: "Verify before committing",
        paragraphs: [
          "Before paying a booking amount or signing an agreement, review the relevant property and project documentation. Important claims should be supported by appropriate documents or official sources.",
          "The exact checks depend on the property and transaction. Where legal, financial or regulatory questions are significant, independent professional advice can help you make the decision with greater confidence.",

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
      "New Chandigarh is an evolving residential destination in the wider Chandigarh–Mohali region. For buyers, the important question is not simply whether the area sounds promising, but whether a specific property fits their commute, lifestyle, budget and long-term plans. The best approach is to combine the broader development context with what you can actually experience around the project.",

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
      "The most expensive home a lender is willing to finance is not automatically the home you should buy. A comfortable budget leaves room for savings, existing commitments, emergencies and future goals. The aim is to understand the complete financial commitment before allowing a property price to determine your finances.",

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
      "A booking is the point where a property search starts becoming a financial commitment. Before you pay, ask questions that remove uncertainty about the property, project, costs, possession and documentation. If an important answer is unclear, treat that as a reason to investigate further rather than a reason to rush.",

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
      "Apartment and villa are not simply two price categories; they represent different ways of living. An apartment can offer efficient space, shared amenities and a managed community, while a villa can offer greater private space, independence and control. The right choice depends on the lifestyle you want and the trade-offs you are willing to make.",

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
      "A home is more than its walls. The roads you use, services around you, neighbourhood environment and time required to reach important destinations all become part of the ownership experience. That is why location should be evaluated as carefully as the property itself.",

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
      "Due diligence is the process of replacing assumptions with evidence before you commit to a property. It is not about making every buyer a legal expert; it is about knowing which questions need answers and when independent verification is appropriate.",

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
      "Buying your first home is exciting, but the number of decisions can quickly become overwhelming. The simplest way to stay in control is to follow a sequence: define what you need, understand what you can afford, shortlist intelligently, visit and compare, then verify everything that matters before committing.",

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

