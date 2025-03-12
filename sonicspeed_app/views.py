from django.shortcuts import render
from django.http import JsonResponse
import librosa
import torch
from transformers import Wav2Vec2Processor, Wav2Vec2ForCTC

# Load Wav2Vec2 Model & Processor
processor = Wav2Vec2Processor.from_pretrained("facebook/wav2vec2-large-960h")
model = Wav2Vec2ForCTC.from_pretrained("facebook/wav2vec2-large-960h")

def transcribe_audio(request):
    if request.method == "POST" and request.FILES.get("audio"):
        audio_file = request.FILES["audio"]

        # Load audio file
        y, sr = librosa.load(audio_file, sr=16000)
        input_values = processor(y, return_tensors="pt", sampling_rate=sr).input_values

        # Predict transcription
        with torch.no_grad():
            logits = model(input_values).logits

        predicted_ids = torch.argmax(logits, dim=-1)
        transcription = processor.batch_decode(predicted_ids)[0]

        return render(request, "index.html", {"transcription": transcription})

    return render(request, "index.html")
