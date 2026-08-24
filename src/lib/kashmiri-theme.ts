// Kashmiri color scheme inspired by mountains, valleys, and traditional crafts
export const kashmiriTheme = {
  // Mountain and valley inspired colors
  primary: "#2C5F7F", // Mountain blue
  accent: "#8B6F47", // Earthy brown (traditional craft colors)
  secondary: "#A8D5E2", // Sky blue / glacier melt
  success: "#6B8E23", // Olive green (valley vegetation)

  // Background and surfaces
  background: "#F5F0E8", // Cream (traditional paper)
  paper: "#FFFAF5", // Off-white
  card: "#E8DCC8", // Light beige

  // Text colors
  text: "#2C2C2C", // Dark brown
  textMuted: "#6B6B6B", // Muted brown

  // Gradients
  gradient: "from-blue-800 via-blue-600 to-teal-500", // Mountain gradient

  // Border/Shadow
  border: "#A8A8A8", // Stone gray
};

// Kashmiri mascot: Woman in traditional Feran
export const kashmiriMascot = {
  description: "A Kashmiri woman wearing a traditional Feran (long robe) and ornaments",
  colors: {
    feran: "#8B4513", // Brown robe
    embroidery: "#FFD700", // Gold embroidery
    skin: "#D4A574", // Warm skin tone
    hair: "#3E2723", // Dark brown
  },
  elements: {
    hasHeadscarf: true,
    hasEmbroidery: true,
    hasBracelet: true,
    hasNecklace: true,
  }
};

// CSS classes for Kashmiri theme
export const kashmiriStyles = `
  .kashmiri-mode {
    --primary: #2C5F7F;
    --accent: #8B6F47;
    --secondary: #A8D5E2;
    --success: #6B8E23;
    --background: #F5F0E8;
    --paper: #FFFAF5;
    --card: #E8DCC8;
  }

  .kashmiri-hero {
    background: linear-gradient(135deg, #2C5F7F 0%, #6B8E23 50%, #A8D5E2 100%);
    position: relative;
  }

  .kashmiri-hero::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120px;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"><path d="M0,60 Q300,30 600,60 T1200,60 L1200,120 L0,120 Z" fill="%238B6F47" opacity="0.3"/></svg>') repeat-x;
    background-size: 300px 100%;
  }

  .kashmiri-mascot {
    filter: drop-shadow(0 4px 15px rgba(44, 95, 127, 0.3));
  }

  .kashmiri-card {
    background: linear-gradient(135deg, #E8DCC8 0%, #F5F0E8 100%);
    border: 2px solid #8B6F47;
  }

  .kashmiri-button {
    background: linear-gradient(135deg, #2C5F7F 0%, #6B8E23 100%);
    color: white;
  }

  .kashmiri-button:hover {
    background: linear-gradient(135deg, #1F3F54 0%, #4F6415 100%);
  }
`;
