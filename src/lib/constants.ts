import { Animal, ButtonStatus } from "./types";
import Animal1 from "/videos/video1.mp4";
import Animal2 from "/videos/video2.mp4";
import Animal3 from "/videos/video3.mp4";
import Animal4 from "/videos/video4.mp4";
import Animal5 from "/videos/video5.mp4";

export const ANIMALS: Animal[] = [
  {
    avatar: Animal1,
    name: "Whiskerwisp",
    description:
      "A soft, pastel-colored cat with swirling patterns of blue, pink, and lavender. Whiskerwisp's fur seems to shift slightly like mist, and their movements are almost too quiet to notice.",
  },
  {
    avatar: Animal2,
    name: "Flickerdoodle",
    description:
      "A vibrant, orange-and-yellow striped cat with a coat that seems to flicker like a candle flame. They're always moving, darting around like a streak of sunlight.",
  },
  {
    avatar: Animal3,
    name: "MystiPurr",
    description:
      "A rich, deep purple cat with flecks of silver and green like a midnight sky filled with shooting stars. Their eyes glow a soft, mysterious blue.",
  },
  {
    avatar: Animal4,
    name: "DandyPounce",
    description:
      "A small, round, and fluffy cat with bright bursts of color—reds, yellows, and greens—like a bouquet of flowers. Their energy is boundless, and they seem to hop more than walk.",
  },
  {
    avatar: Animal5,
    name: "Puzzlebounce",
    description:
      "A patchwork of colors—green, orange, blue, and pink—with each patch seemingly sewn together like a quilt. Puzzlebounce has mismatched eyes and an air of curiosity about everything.",
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
