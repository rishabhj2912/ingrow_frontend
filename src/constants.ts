import { Question } from './types';

export const NAVIGATIONS = [
  { title: 'home', link: '/' },
  { title: 'connections', link: '/connections' },
  { title: 'dashboard', link: '/dashboard' },
  { title: 'pricing', link: '/pricing' },
];

export const Questions: Question[] = [
  {
    title: 'Which of these do you like to add to your AI generated comments? ',
    options: [
      { title: 'Emojis', value: 'includeEmojis' },
      { title: 'Hashtags', value: 'includeHastags' },
    ],
    value: 'addInComments',
    isCheckBox: true,
    minSelect: 0,
  },
  {
    title: 'How do you want your comments to sound like?',
    options: [
      { title: 'Brief', value: 'Brief' },
      { title: 'Detailed', value: 'Detailed' },
      { title: 'Balanced', value: 'Balanced' },
    ],
    value: 'brief',
    isCheckBox: false,
    minSelect: 1,
  },
  {
    title: 'How formal do you want your comments to be?',
    options: [
      { title: 'Formal', value: 'Formal' },
      { title: 'Semi-Formal', value: 'Semi-Formal' },
      { title: 'Casual', value: 'Casual' },
    ],
    value: 'tone',
    isCheckBox: false,
    minSelect: 1,
  },
  {
    title: 'How do you prefer to engage with content on LinkedIn?',
    options: [
      { title: 'Witty', value: 'Witty' },
      { title: 'Affirmative', value: 'Affirmative' },
      { title: 'Congratulatory', value: 'Congratulatory' },
      { title: 'Question', value: 'Question' },
      { title: 'Insightful', value: 'Insightful' },
      { title: 'Data-Driven', value: 'Data-Driven' },
      { title: 'Emotional Narrative', value: 'Emotional Narrative' },
      { title: 'Analogy', value: 'Analogy' },
      { title: 'Disagree', value: 'Disagree' },
    ],
    value: 'characters',
    isCheckBox: false,
    minSelect: 2,
  },
];

export const getPersonaComments = (
  selectedOptions: string[],
  currentQuestion: number
) => {
  switch (true) {
    case selectedOptions.includes('includeEmojis') &&
      !selectedOptions.includes('includeHastags'):
      return "Really impressed with the new dashboard customization feature. It's innovations like these that truly enhance productivity. 🚀💡";

    case selectedOptions.includes('includeHastags') &&
      !selectedOptions.includes('includeEmojis'):
      return "Really impressed with the new dashboard customization feature. It's innovations like these that truly enhance productivity. #UserExperience";

    case selectedOptions.length == 0 && currentQuestion == 0:
      return "Really impressed with the new dashboard customization feature. It's innovations like these that truly enhance productivity.";

    case selectedOptions.includes('includeEmojis') &&
      selectedOptions.includes('includeHastags'):
      return "Really impressed with the new dashboard customization feature 🌟. It's innovations like these that truly enhance productivity 💼. #Innovation #ProductivityBoost 🚀";

    case selectedOptions.includes('Brief'):
      return 'Loving the new dashboard customisation! 🌟 Boosts productivity like a charm! 💼';

    case selectedOptions.includes('Detailed'):
      return "I'm thoroughly impressed with the recent launch of the dashboard customization feature. It's innovations like these, focused on enhancing the user experience and catering to individual workflow needs, that truly elevate productivity and overall satisfaction. A well-thought-out addition!";

    case selectedOptions.includes('Balanced'):
      return "Really impressed with the dashboard customization feature. It's such innovations that tailor to our workflows and significantly boost productivity.";

    case selectedOptions.includes('Formal'):
      return 'I am genuinely impressed with the introduction of the dashboard customization feature. It is innovations of this nature that contribute significantly to enhancing productivity.';

    case selectedOptions.includes('Semi-Formal'):
      return "Really impressed with the new dashboard customization feature. It's these kinds of innovations that make a real difference in productivity.";

    case selectedOptions.includes('Casual'):
      return "Loving the new dashboard customization! It's stuff like this that really pumps up productivity.";

    case selectedOptions.includes('Witty'):
      return "Soundbox: turning the 'ka-ching' into music for merchants' ears, but for Paytm, it's more of a complex symphony than a cash cow.";

    case selectedOptions.includes('Affirmative'):
      return 'Absolutely, the Soundbox is a game-changer for merchants, ensuring trust in transactions with each audible alert.';

    case selectedOptions.includes('Congratulatory'):
      return "Kudos to Paytm for innovating with Soundbox, a simple yet powerful tool that's music to merchants' ears!";

    case selectedOptions.includes('Question'):
      return 'While Soundbox is innovative, does its current business model hold the tune for long-term profitability?';

    case selectedOptions.includes('Insightful'):
      return "The Soundbox is a testament to fintech innovation, yet it's the harmony of product and profit that composes a sustainable business.";

    case selectedOptions.includes('Data-Driven'):
      return "Despite the 7M units deployed, Paytm's Soundbox faces the music with high operational costs, questioning the sustainability of free models.";

    case selectedOptions.includes('Emotional Narrative'):
      return "For every merchant relieved by a payment confirmation chime, there's a fintech exec grappling with the economics of free hardware.";

    case selectedOptions.includes('Analogy'):
      return "Like a printer sold without ink, the Soundbox's free distribution sets the stage, but the recurring revenue is the real performance.";

    case selectedOptions.includes('Disagree'):
      return "While the Soundbox is innovative, I'd argue it's premature to dismiss it as a poor business model; it's a long-term play on customer loyalty.";

    default:
      return "Really impressed with the new dashboard customization feature. It's innovations like these that truly enhance productivity.";
  }
};
