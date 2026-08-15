/**
 * The six services are the backbone of the site. They are defined here once
 * and consumed by the home grid, the /services directory, the detail pages,
 * the footer, and the sitemap — so none of those can drift apart.
 *
 * `tagline` is the single short description used on every card.
 *
 * MA/Medicaid deliberately does not appear here. It belongs only on the
 * /services hero badge, the footer, and /referrals.
 */

export type TileColor =
  | "sun"
  | "sky"
  | "coral"
  | "leaf"
  | "lilac"
  | "rose"
  | "cream-deep";

export type Service = {
  slug: string;
  number: string;
  title: string;
  /** One line. Used on every card across the site. */
  tagline: string;
  /** Metadata line, e.g. "Ages 2–7 · In-center & home". */
  tag: string;
  benefits: { title: string; body: string }[];
  looksLike: string;
  whoItsFor: string;
  faq: { q: string; a: string }[];
  color: TileColor;
  /** public/images/services/<file> — renders a color tile if absent. */
  image: string;
  alt: string;
  /** Short label for the footer column. */
  footerLabel: string;
};

export const services: Service[] = [
  {
    slug: "early-intensive-aba",
    number: "01",
    title: "Early Intensive ABA Therapy",
    tagline:
      "One-on-one, foundational therapy for children newly diagnosed with ASD.",
    tag: "Ages 2–7 · In-center & home",
    benefits: [
      {
        title: "Built for the early years",
        body: "The younger a child starts, the more skills can be shaped before habits set in. Early sessions target communication, behavior, and learning fundamentals while the brain is most adaptable to change.",
      },
      {
        title: "BCBA-supervised from day one",
        body: "Every session runs under an active treatment plan designed and reviewed by a Board Certified Behavior Analyst, not a generic curriculum.",
      },
      {
        title: "Measured, not guessed",
        body: "Progress is tracked session by session, so the plan adjusts as your child grows instead of staying fixed for months at a time.",
      },
    ],
    looksLike:
      "Sessions are one-on-one and highly structured, but they don't feel clinical — a therapist might spend twenty minutes working on requesting a toy, then shift into a play-based activity that targets following simple directions. Your BCBA reviews the data from every session and tweaks the plan in small, ongoing steps rather than waiting months to notice something isn't working.",
    whoItsFor:
      "Best suited for children ages 2–7, especially those who are newly diagnosed and haven't started structured therapy yet. Also a good fit for children transitioning from an assessment straight into their first treatment plan.",
    faq: [
      {
        q: "How many sessions per week does this involve?",
        a: "It depends on your child's needs and your family's schedule — your BCBA will recommend a starting frequency and adjust it as goals are met.",
      },
      {
        q: "Will my child work with the same therapist every time?",
        a: "We aim for consistency in staffing so your child builds trust with familiar faces, though your BCBA oversees the plan across all sessions.",
      },
    ],
    color: "sun",
    image: "/images/services/early-intensive-aba.jpg",
    alt: "An adult and a young boy sharing a high five across a worktable mid-session.",
    footerLabel: "Early intensive ABA",
  },
  {
    slug: "communication-social-skills",
    number: "02",
    title: "Communication & Social Skills",
    tagline:
      "Helping children find their voice and connect with the people around them.",
    tag: "All ages · Group & individual",
    benefits: [
      {
        title: "Real communication, not just words",
        body: "Whether a child is nonverbal, using AAC, or working on conversation skills, therapy targets functional communication your child can actually use in daily life.",
      },
      {
        title: "Practice with real peers",
        body: "Social skills are taught in natural group settings, not just worksheets, so children build relationships they can carry into school and home.",
      },
      {
        title: "Grows with your child",
        body: "This service isn't a phase — it scales from first words to friendship-building as your child's needs change over time.",
      },
    ],
    looksLike:
      "A younger child might practice pointing to a picture card to ask for a snack, while an older child might work through a role-play of joining a group game at recess. Sessions often pair one-on-one coaching with small peer groups, so a child can practice a skill and then use it in the moment with another kid, not just with a therapist.",
    whoItsFor:
      "This service fits a wide range — from a young child building first words or gestures, to an older child or teen who talks easily but struggles to read social cues, take turns, or manage conversations with peers.",
    faq: [
      {
        q: "What if my child is nonverbal — can this still help?",
        a: "Yes. Communication doesn't have to mean spoken words — this includes AAC devices, picture systems, and gestures, whatever fits your child's needs.",
      },
      {
        q: "Do you work on friendships, not just talking?",
        a: "Yes — social sessions specifically target things like sharing, taking turns, and reading social cues, not just vocabulary.",
      },
    ],
    color: "sky",
    image: "/images/services/communication-social-skills.jpg",
    alt: "A therapist kneeling on the floor beside a boy, picture cards spread between them.",
    footerLabel: "Communication skills",
  },
  {
    slug: "home-in-clinic-support",
    number: "03",
    title: "Home & In-Clinic Support",
    tagline: "Flexible therapy delivered where it works best for your family.",
    tag: "In-home & in-center · All ages",
    benefits: [
      {
        title: "Comfort of home",
        body: "Sessions in your own home let therapists work with the routines, siblings, and environment your child already knows — nothing has to be relearned in a new setting.",
      },
      {
        title: "Focus of the clinic",
        body: "Time in-center offers a structured, distraction-light space built specifically for therapy, which can help some children lock in on goals faster.",
      },
      {
        title: "You choose the mix",
        body: "Families aren't locked into one format. Your BCBA can recommend a blend of home and in-clinic sessions based on what's actually working for your child.",
      },
    ],
    looksLike:
      "A therapist working in your home might use mealtime or bedtime routines as real opportunities to practice a goal, right where it actually happens. On days at the center, the same child works in a quieter, more controlled room designed to reduce distractions — useful for goals that need more focus to stick before they're practiced back at home.",
    whoItsFor:
      "Families who want therapy to reflect real daily life (home), families whose child benefits from a more structured, distraction-light space (in-center), or families who want both depending on the goal being worked on that month.",
    faq: [
      {
        q: "Can we switch between home and in-clinic sessions?",
        a: "Yes — your BCBA can adjust the mix as your child's needs change, it isn't locked in at intake.",
      },
      {
        q: "Do I need to prepare anything for an in-home session?",
        a: "No special setup is required — your therapist works within your existing home and routine.",
      },
    ],
    color: "coral",
    image: "/images/services/home-in-clinic-support.jpg",
    alt: "An adult sitting on the floor at a child's level while she works on a wooden puzzle.",
    footerLabel: "Home & in-clinic support",
  },
  {
    slug: "parent-caregiver-support",
    number: "04",
    title: "Parent & Caregiver Support",
    tagline: "You're not just kept updated — you're part of the team.",
    tag: "Family-focused · Child centered",
    benefits: [
      {
        title: "No guesswork at home",
        body: "You'll learn the same strategies your child's therapist uses, so progress doesn't stop when the session ends.",
      },
      {
        title: "Built in, not billed extra",
        body: "Caregiver support isn't an add-on service you have to request — it's included in every single treatment plan from the start.",
      },
      {
        title: "A place to ask anything",
        body: "Whether it's a tough bedtime routine or a public meltdown, your team is a resource for the whole family, not just clinic hours.",
      },
    ],
    looksLike:
      "Your BCBA will regularly walk you through what your child is working on and show you exactly how to reinforce it at home — for example, how to respond calmly and consistently when your child asks for something instead of having a meltdown. These aren't one-time trainings; they're an ongoing part of every check-in as your child's goals change.",
    whoItsFor:
      "Every family enrolled in ABA therapy at Autism Bright Start — this isn't a separate service you opt into, it's woven into every child's plan regardless of age or which other services they're receiving.",
    faq: [
      {
        q: "Do I have to attend every session to get this support?",
        a: "No — your BCBA schedules dedicated check-ins with you separately from your child's therapy sessions.",
      },
      {
        q: "What if siblings are affected too?",
        a: "We're happy to talk through strategies for the whole household, not just the child in therapy.",
      },
    ],
    color: "leaf",
    image: "/images/services/parent-caregiver-support.jpg",
    alt: "A mother sitting with her daughter, arms around her, as she plays with blocks.",
    footerLabel: "Parent & caregiver support",
  },
  {
    slug: "occupational-therapy",
    number: "05",
    title: "Occupational Therapy",
    tagline:
      "Building the everyday skills that let your child play, learn, and do things on their own.",
    tag: "OTR/L-led · Sensory & motor skills · All ages",
    benefits: [
      {
        title: "Sensory regulation that sticks",
        body: "Sound, light, texture, and movement can overwhelm a child's system and derail the rest of the day. OT uses sensory integration work — swings, weighted input, gradual exposure in a space that feels safe — to help your child recognize and manage those responses.",
      },
      {
        title: "Motor skills for real tasks",
        body: "Fine motor work with playdough, tweezers, and drawing builds the hand strength behind handwriting and using a fork. Gross motor work through obstacle courses and ball games builds balance, coordination, and body awareness.",
      },
      {
        title: "Independence in the everyday",
        body: "Dressing, grooming, eating, and getting through a morning routine are the skills families feel most. Therapy targets them directly, using visual schedules and hands-on practice so the skill transfers home.",
      },
    ],
    looksLike:
      "A session might start on a swing or with weighted input to help your child's system settle, then move into focused hand work — pressing playdough, using tweezers, practicing a pencil grip. Another day might center on a real routine, like working through the steps of putting on a jacket or trying an unfamiliar food texture. Your occupational therapist coordinates with your child's ABA team, so what's practiced in OT reinforces the goals they're already working toward.",
    whoItsFor:
      "Children who struggle with sensory sensitivities, handwriting or hand strength, coordination and balance, feeding and food textures, or everyday self-care like dressing and grooming. OT often runs alongside ABA therapy, and your team will recommend whether it fits your child's plan.",
    faq: [
      {
        q: "How is occupational therapy different from ABA?",
        a: "ABA focuses on behavior, communication, and learning. Occupational therapy focuses on the physical and sensory skills underneath daily activities — motor coordination, sensory regulation, and self-care. Many children benefit from both, and the two teams coordinate on shared goals.",
      },
      {
        q: "Who will be working with my child?",
        a: "Occupational therapy is delivered by licensed occupational therapists (OTR/L), working in coordination with your child's ABA team.",
      },
    ],
    color: "lilac",
    image: "/images/services/occupational-therapy.jpg",
    alt: "A young boy turning the latches and dials on a wall-mounted sensory board.",
    footerLabel: "Occupational therapy",
  },
  {
    slug: "school-iep-collaboration",
    number: "06",
    title: "School & IEP Collaboration",
    tagline:
      "Making sure progress at therapy shows up in the classroom too.",
    tag: "School-linked · IEP aligned · All ages",
    benefits: [
      {
        title: "One team, not two",
        body: "Your child's BCBA communicates directly with their school team, so ABA goals and IEP objectives reinforce each other instead of running in parallel.",
      },
      {
        title: "Consistency across environments",
        body: "The strategies that work in therapy get carried into the classroom, so your child isn't relearning behavior expectations in every new setting.",
      },
      {
        title: "You're looped in either way",
        body: "Families stay informed on both sides — what's happening at school and what's happening in therapy — without having to be the go-between.",
      },
    ],
    looksLike:
      "Your BCBA might join an IEP meeting or connect directly with your child's teacher to share what strategies are working in therapy — for example, how your child responds best to a visual schedule — so the classroom can use the same approach. This isn't a one-time introduction; it's an ongoing line of communication as goals shift throughout the school year.",
    whoItsFor:
      "School-aged children with an existing IEP or 504 plan, or families who want their child's therapy team actively coordinating with school staff rather than working in isolation.",
    faq: [
      {
        q: "Will my child's BCBA actually attend school meetings?",
        a: "Where possible, yes — or they'll provide written input and strategies for the school team to use directly.",
      },
      {
        q: "Does this cost anything extra?",
        a: "No — school collaboration is part of your child's existing treatment plan, not a separate billable service.",
      },
    ],
    color: "rose",
    image: "/images/services/school-iep-collaboration.jpg",
    alt: "An adult and a child working through counting beads on a wooden abacus.",
    footerLabel: "School & IEP collaboration",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function otherServices(slug: string) {
  return services.filter((service) => service.slug !== slug);
}
