import mongoose from 'mongoose';

const heroContentSchema = new mongoose.Schema({
  mainTitle: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  buttonText: { type: String, required: true },
  buttonLink: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const HeroContent = mongoose.model('HeroContent', heroContentSchema);

export default HeroContent;
