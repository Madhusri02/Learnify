
from transformers import T5Tokenizer, T5ForConditionalGeneration
import torch

class QuestionGenerator:
    def __init__(self):
        self.tokenizer = T5Tokenizer.from_pretrained("t5-base")
        self.model = T5ForConditionalGeneration.from_pretrained("t5-base")

    def generate_questions(self, context):
        input_text = f"generate questions: {context}"
        input_ids = self.tokenizer.encode(input_text, return_tensors="pt")
        
        with torch.no_grad():
            output_ids = self.model.generate(input_ids, max_length=50, num_return_sequences=5)
        
        questions = [self.tokenizer.decode(output_id, skip_special_tokens=True) for output_id in output_ids]
        return questions

def generate_assessment_questions(user_data):
    subject = user_data.get('subject', 'General Knowledge')
    context = f"Provide information about {subject}."  
    question_generator = QuestionGenerator()
    return question_generator.generate_questions(context)
