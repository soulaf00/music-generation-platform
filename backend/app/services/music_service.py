import os
import scipy.io.wavfile

from transformers import AutoProcessor, MusicgenForConditionalGeneration


print("Loading MusicGen model...")

processor = AutoProcessor.from_pretrained("facebook/musicgen-small")

model = MusicgenForConditionalGeneration.from_pretrained(
    "facebook/musicgen-small"
)

print("MusicGen model loaded successfully!")


def generate_music(prompt: str):
    inputs = processor(
        text=[prompt],
        padding=True,
        return_tensors="pt"
    )

    print("Inputs created")

    audio_values = model.generate(
        **inputs,
        max_new_tokens=32
    )

    print("Music generated")

    sampling_rate = model.config.audio_encoder.sampling_rate

    output_folder = "generated_audio"
    os.makedirs(output_folder, exist_ok=True)

    filename = "generated_music.wav"
    filepath = os.path.join(output_folder, filename)

    scipy.io.wavfile.write(
        filepath,
        rate=sampling_rate,
        data=audio_values[0, 0].cpu().numpy()
    )

    print("Audio saved")

    return {
        "success": True,
        "filename": filename
    }