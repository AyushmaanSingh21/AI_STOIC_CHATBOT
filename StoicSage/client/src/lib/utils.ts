import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get bot response based on user message
export function getBotResponse(message: string): string {
  // Sample responses for common questions
  const responses: Record<string, string> = {
    'how to deal with anger': "When anger arises, remember what Marcus Aurelius taught: \"How much more grievous are the consequences of anger than the causes of it.\"\n\nFirst, recognize that anger comes from your judgment about a situation, not the situation itself. Take a step back and ask if this is worth disrupting your tranquility.\n\nPractice what Seneca called the 'delay technique' - pause before reacting. During this pause, examine whether your anger serves any purpose besides disturbing your peace.",
    'what is virtue': "In Stoicism, virtue (aretē) is the sole good and the only thing necessary for happiness (eudaimonia).\n\nVirtue comprises four cardinal aspects:\n- Wisdom (knowing what is good, bad, and neither)\n- Courage (doing what's right despite fear)\n- Justice (treating others fairly)\n- Temperance (moderation and self-discipline)\n\nAs Epictetus said, \"Make the best use of what is in your power, and take the rest as it happens.\" Virtue is entirely within your control, unlike external circumstances.",
    'how to find purpose': "The Stoics would suggest that your purpose is to live according to nature – both universal nature and your own nature as a rational being.\n\nAs Marcus Aurelius wrote: \"At dawn, when you have trouble getting out of bed, tell yourself: 'I have to go to work — as a human being. What do I have to complain of, if I'm going to do what I was born for?'\"\n\nYour purpose is to develop virtue and contribute to the common good. Reflect on your unique talents and how they can be used in service to humanity.",
    'overcoming fear': "Epictetus teaches that fear comes from placing value on things outside your control. \"Make the best use of what is in your power, and take the rest as it happens.\"\n\nTo overcome fear:\n1. Practice negative visualization (premeditatio malorum) - imagine what you fear to reduce its power\n2. Focus on what you can control - your judgments and actions\n3. Remember that external events are indifferent to your happiness\n\nAs Seneca said, \"We suffer more often in imagination than in reality.\""
  };
  
  // Search for keywords in the user message
  const lowercaseMessage = message.toLowerCase();
  for (const [key, response] of Object.entries(responses)) {
    if (lowercaseMessage.includes(key)) {
      return response;
    }
  }
  
  // Default response if no keyword matches
  return "The Stoics teach us that wisdom comes from contemplation and applying reason to all aspects of life. Could you elaborate on your question, so I can provide more specific guidance from Stoic philosophy?";
}
