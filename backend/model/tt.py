import torch
from transformers import pipeline

model_id = "meta-llama/Llama-3.2-1B"

pipe = pipeline(
    "text-generation", 
    model=model_id, 
    torch_dtype=torch.bfloat16, 
    device_map="auto"  
)

# to generate learning content based on user data
def generate_learning_content(user_data):
    prompt = (
        f"Generate a comprehensive learning module for a student with "
        f"{user_data['skills']} skills. They scored {user_data['score']} in their last assessment and have shown "
        f"the following performance: {user_data['performance']}. They need to learn about {user_data['topics_to_learn']}."
    )
    generated_content = pipe(prompt, max_length=500, num_return_sequences=1)
    return generated_content[0]['generated_text']


sample_user_data = {
    "skills": "intermediate Python and data analysis",
    "score": 75,
    "performance": {
        "scores": [
            {"score1": 30, "score2": 26}
        ]
    },
    "topics_to_learn": "machine learning"
}


generated_content = generate_learning_content(sample_user_data)
print(generated_content)
