import midnightOudImg from './assets/midnight_oud.png';
import vetiverNoirImg from './assets/vetiver_noir.png';
import midnightIrisImg from './assets/midnight_iris.png';
import oudObscureImg from './assets/oud_obscure.png';
import neroliBlancImg from './assets/neroli_blanc.png';
import vetiverObscuraImg from './assets/vetiver_obscura.png';
import aurumImg from './assets/aurum.png';
import silentMuskImg from './assets/silent_musk.png';

export const products = {
  "midnight-oud": {
    id: "midnight-oud",
    name: "Midnight Oud",
    tagline: "Cambodian Oud & Midnight Jasmine",
    description: "An enigmatic journey into the heart of the desert night. Midnight Oud juxtaposes the raw, animalic intensity of aged agarwood with the delicate, ephemeral whisper of midnight-blooming jasmine. Suspended in a matrix of smoke and amber, it is a fragrance for those who command the shadows.",
    price: { "50ml": 28, "100ml": 42 },
    category: "oriental",
    size: "50 ML",
    image: midnightOudImg,
    notes: {
      top: "Saffron, Black Pepper, Bergamot",
      heart: "Turkish Rose, Midnight Jasmine, Patchouli",
      base: "Cambodian Oud, Ambergris, Smoked Leather"
    }
  },
  "vetiver-noir": {
    id: "vetiver-noir",
    name: "Vetiver Noir",
    tagline: "Smoked Cedar & Haitian Vetiver",
    description: "A dark, woody masterpiece capturing the essence of damp earth and smoldering wood fire. Vetiver Noir is deeply grounding yet complex, starting with high citrus tones and settling into a long-lasting, sophisticated smoke trail.",
    price: { "50ml": 16, "100ml": 24 },
    category: "woody",
    size: "50 ML",
    image: vetiverNoirImg,
    notes: {
      top: "Bergamot, Grapefruit, Pink Pepper",
      heart: "Haitian Vetiver, Nutmeg, Geranium",
      base: "Smoked Cedar, Patchouli, Benzoin"
    }
  },
  "midnight-iris": {
    id: "midnight-iris",
    name: "Midnight Iris",
    tagline: "Powdery Iris & White Musk",
    description: "An elegant editorial creation featuring the contrast between powdery, butter-soft Iris florets and cold, clinical white musk. Ethereal yet persistent, it feels like floating on a cloud of frosted silk.",
    price: { "50ml": 20, "100ml": 30 },
    category: "floral",
    size: "50 ML",
    image: midnightIrisImg,
    notes: {
      top: "Cold Aldehydes, Violet Leaves",
      heart: "Florentine Iris Butter, Orris Root",
      base: "White Musk, Cashmere Wood, Ambrette"
    }
  },
  "oud-obscure": {
    id: "oud-obscure",
    name: "Oud Obscure",
    tagline: "Rich Agarwood & Spiced Amber",
    description: "An opulent fragrance that leaves an unforgettable signature. It draws from heavy, golden resins and sweet spices, wrapping the wearer in a velvet mantle of luxury and deep confidence.",
    price: { "50ml": 24, "100ml": 36 },
    category: "oriental",
    size: "50 ML",
    image: oudObscureImg,
    notes: {
      top: "Saffron, Cinnamon, Cloves",
      heart: "Agarwood (Oud), Rose Absolute",
      base: "Ambergris, Vanilla Pod, Labdanum"
    }
  },
  "neroli-blanc": {
    id: "neroli-blanc",
    name: "Neroli Blanc",
    tagline: "Orange Blossom & Crisp Bergamot",
    description: "A bright, luminous fragrance that captures the sunlit coast of Sicily. Crisp neroli and zesty bergamot melt into a base of clean musk, bringing a light, luxurious sensory breeze.",
    price: { "50ml": 12, "100ml": 18 },
    category: "citrus",
    size: "50 ML",
    image: neroliBlancImg,
    notes: {
      top: "Sicilian Bergamot, Mandarin",
      heart: "Tunisian Neroli, Orange Blossom",
      base: "White Musk, Amber, Cedarwood"
    }
  },
  "vetiver-obscura": {
    id: "vetiver-obscura",
    name: "Vetiver Obscura",
    tagline: "Smoked Earth, Cardamom & Black Iris",
    description: "An asymmetric, complex fragrance that dances between cool earthiness and warm, dry spices. Perfect for those seeking a highly editorial, non-conformist olfactory signature.",
    price: { "50ml": 18, "100ml": 27 },
    category: "woody",
    size: "50 ML",
    image: vetiverObscuraImg,
    notes: {
      top: "Cardamom, Smoked Earth",
      heart: "Black Iris, Violet, Vetiver Root",
      base: "Smoked Birch, Leather, Amber"
    }
  },
  "aurum": {
    id: "aurum",
    name: "Aurum",
    tagline: "Saffron, Liquid Gold & Oud Wood",
    description: "Sensory opulence in liquid form. Swirling flakes of pure gold appear suspended in this premium blend of saffron, oud wood, and smoky spices. A rich fragrance designed for ultimate luxury.",
    price: { "50ml": 30, "100ml": 45 },
    category: "oriental",
    size: "50 ML",
    image: aurumImg,
    notes: {
      top: "Saffron, Bergamot, Pink Pepper",
      heart: "Liquid Gold Accord, Jasmine, Patchouli",
      base: "Cambodian Oud, Amber, Sandalwood"
    }
  },
  "silent-musk": {
    id: "silent-musk",
    name: "Silent Musk",
    tagline: "White Ambrette & Cashmere",
    description: "A serene, skin-close scent that feels like a whisper of cashmere. Utilizing advanced synthetic molecules and high-end natural ambrette seeds, it shifts quietly with your body chemistry.",
    price: { "50ml": 14, "100ml": 21 },
    category: "floral",
    size: "50 ML",
    image: silentMuskImg,
    notes: {
      top: "White Ambrette, Pink Grapefruit",
      heart: "Cashmere Wood, Iso E Super",
      base: "White Musk, Vetiver, Sandalwood"
    }
  }
};
