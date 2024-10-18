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

export const DEFAULT_ANIMALS: Animal[] = [
  {
    id: "Whiskerwisp",
    staticAvatarUrl: StaticAnimal1,
    gifAvatarUrl: Animal1,
    name: "Whiskerwisp",
    description:
      "A soft, pastel-colored cat with swirling patterns of blue, pink, and lavender. Whiskerwisp's fur seems to shift slightly like mist, and their movements are almost too quiet to notice.",
    vote: 0,
  },
  {
    id: "Flickerdoodle",
    staticAvatarUrl: StaticAnimal2,
    gifAvatarUrl: Animal2,
    name: "Flickerdoodle",
    description:
      "A vibrant, orange-and-yellow striped cat with a coat that seems to flicker like a candle flame. They're always moving, darting around like a streak of sunlight.",
    vote: 0,
  },
  {
    id: "MystiPurr",
    staticAvatarUrl: StaticAnimal3,
    gifAvatarUrl: Animal3,
    name: "MystiPurr",
    description:
      "A rich, deep purple cat with flecks of silver and green like a midnight sky filled with shooting stars. Their eyes glow a soft, mysterious blue.",
    vote: 0,
  },
  {
    id: "DandyPounce",
    staticAvatarUrl: StaticAnimal4,
    gifAvatarUrl: Animal4,
    name: "DandyPounce",
    description:
      "A small, round, and fluffy cat with bright bursts of color—reds, yellows, and greens—like a bouquet of flowers. Their energy is boundless, and they seem to hop more than walk.",
    vote: 0,
  },
  {
    id: "Puzzlebounce",
    staticAvatarUrl: StaticAnimal5,
    gifAvatarUrl: Animal5,
    name: "Puzzlebounce",
    description:
      "A patchwork of colors—green, orange, blue, and pink—with each patch seemingly sewn together like a quilt. Puzzlebounce has mismatched eyes and an air of curiosity about everything.",
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
