import { Animal, ButtonStatus } from "./types";
import Animal1 from "/images/video1.gif";
import Animal2 from "/images/video2.gif";
import Animal3 from "/images/video3.gif";
import Animal4 from "/images/video4.gif";
import Animal5 from "/images/video5.gif";
import StaticAnimal1 from "/images/animal1.jpg";
import StaticAnimal2 from "/images/animal2.jpg";
import StaticAnimal3 from "/images/animal3.jpg";
import StaticAnimal4 from "/images/animal4.jpg";
import StaticAnimal5 from "/images/animal5.jpg";
import Audio1 from "/audio/1.mp3";
import Audio2 from "/audio/2.mp3";

export const DEFAULT_ANIMALS: Animal[] = [
  {
    id: "Whiskerwisp",
    staticAvatarUrl: StaticAnimal1,
    gifAvatarUrl: Animal1,
    name: "Whiskerwisp",
    description:
      "Whiskerwisp, the ethereal feline, is a creature of pure enchantment. Its fur is a mesmerizing tapestry of pastel hues—soft blues, pinks, and lavenders—that seem to dance and swirl like a living mist. This mystical cat moves with an elegance that defies the laws of nature, its steps so silent that it appears to glide through the air. Whiskerwisp's presence is like a gentle whisper in the wind, a fleeting glimpse of magic that leaves you breathless and yearning for more.",
    vote: 0,
  },
  {
    id: "Flickerdoodle",
    staticAvatarUrl: StaticAnimal2,
    gifAvatarUrl: Animal2,
    name: "Flickerdoodle",
    description:
      "Flickerdoodle is a vibrant spectacle of energy and light, a cat whose very essence seems to be woven from the sun's own rays. Its coat is a dazzling display of orange and yellow stripes, flickering and shimmering like a living flame. This fiery spirit is never still, darting and leaping with the speed and grace of a shooting star. Flickerdoodle's presence is a burst of warmth and vitality, a living embodiment of the sun's joyous dance across the sky.",
    vote: 0,
  },
  {
    id: "MystiPurr",
    staticAvatarUrl: StaticAnimal3,
    gifAvatarUrl: Animal3,
    name: "MystiPurr",
    description:
      "MystiPurr is a guardian of the cosmos, a cat whose deep purple fur is speckled with silver and green, reminiscent of a midnight sky filled with celestial wonders. Its eyes glow with a mysterious blue light, holding the secrets of the universe within their depths. MystiPurr moves with a serene grace, as if it is in tune with the very rhythm of the stars. This enigmatic feline is a keeper of dreams and mysteries, a silent companion on the journey through the infinite night.",
    vote: 0,
  },
  {
    id: "DandyPounce",
    staticAvatarUrl: StaticAnimal4,
    gifAvatarUrl: Animal4,
    name: "DandyPounce",
    description:
      "DandyPounce is a delightful explosion of color and joy, a small, round, and fluffy cat that embodies the spirit of spring. Its fur is a vibrant bouquet of reds, yellows, and greens, each hue as bright and lively as a field of wildflowers. With boundless energy, DandyPounce hops and bounces with a playful exuberance that is utterly infectious. This cheerful creature is a living celebration of life, a reminder of the beauty and wonder that surrounds us every day.",
    vote: 0,
  },
  {
    id: "Puzzlebounce",
    staticAvatarUrl: StaticAnimal5,
    gifAvatarUrl: Animal5,
    name: "Puzzlebounce",
    description:
      "Puzzlebounce is a whimsical tapestry of colors and curiosity, a cat whose patchwork fur is a kaleidoscope of green, orange, blue, and pink. Each patch is like a piece of a grand puzzle, sewn together with the threads of imagination and wonder. With mismatched eyes that twinkle with mischief, Puzzlebounce explores the world with an insatiable curiosity, uncovering the hidden magic in every corner. This enchanting feline is a playful wanderer, a guide to the endless adventures that await those who dare to dream.",
    vote: 0,
  },
];

export const PAD_BUTTONS: ButtonStatus[] = [
  {
    id: "1",
    value: 1,
    timeInterval: 10,
  },
  {
    id: "2",
    value: 10,
    timeInterval: 90,
  },
  {
    id: "3",
    value: 100,
    timeInterval: 800,
  },
];

export const MAX_COUNT_OF_ACTIVE_TICKETS = 5;
export const TICKET_PRICE = 20;

export const DEFAULT_AUDIOS = [Audio1, Audio2];
