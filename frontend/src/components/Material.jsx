import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Material = () => {
  const location = useLocation();
  const { topic } = location.state || { 'about machine learning ': 'about' };
  const [generatedContent, setGeneratedContent] = useState('');

  useEffect(() => {
    const fetchGeneratedContent = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/generate', {
          skills: "intermediate Python and data analysis",
          score: 75,
          performance: {
            scores: [
              { score1: 30, score2: 26 }
            ]
          },
          topics_to_learn: topic
        });

        if (response.data && response.data.content) {
          setGeneratedContent(response.data.content); // Set generated content from response
        } else {
          setGeneratedContent('No content generated.');
        }
      } catch (error) {
        console.error('Error fetching generated content:', error);
        setGeneratedContent('Error generating content.');
      }
    };

    if (topic) {
      fetchGeneratedContent();
    }
  }, [topic]); // Dependency array with topic

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Reading Material</h1>
      <p className="mb-4">Topic: about machine learning basics</p>
      <div className="mt-4">
        <h2 className="text-xl">Generated Content</h2>
        <p>{generatedContent || 'Generating content...'}</p>
      </div>

      {/* Learning Module Box */}
      <div className="border rounded-lg shadow-lg p-6 mt-6 bg-white">
        <h2 className="text-lg font-bold mt-4">Learning Module: Introduction to Machine Learning</h2>
        <p className="mt-2">
          <strong>Overview:</strong> This learning module is designed for students with intermediate skills in Python and data analysis. Given your recent assessment score of 75, along with your performance metrics, this module will enhance your understanding of machine learning concepts.
        </p>
        <h3 className="font-bold mt-4">Objectives:</h3>
        <ul className="list-disc ml-5">
          Understand the foundational concepts of machine learning, including supervised and unsupervised learning.Explore various machine learning algorithms, such as linear regression, decision trees, and clustering techniques.
          Develop practical skills in implementing machine learning models using Python libraries like Scikit-learn and TensorFlow.
        </ul>
        <h3 className="font-bold mt-4">Content Outline:</h3>
        <h4 className="mt-2">Introduction to Machine Learning</h4>
        <p>
          <strong>Definition:</strong> Machine learning is a branch of artificial intelligence that focuses on building systems that can learn from and make decisions based on data. Unlike traditional programming, where explicit instructions are coded, machine learning algorithms identify patterns and insights from datasets.
        </p>
        <p>
          <strong>Importance:</strong> Machine learning is widely used in various applications, including recommendation systems (like Netflix and Amazon), fraud detection in finance, and autonomous vehicles.
        </p>
        <h4 className="mt-2">Supervised vs. Unsupervised Learning</h4>
        <p>
          <strong>Supervised Learning:</strong>
          <br />
          <strong>Definition:</strong> A type of machine learning where the model is trained on labeled data, meaning that each training example is paired with an output label. The goal is to learn a mapping from inputs to outputs, so the model can make predictions on new, unseen data.
          <br />
          <strong>Use Cases:</strong> Commonly used in classification tasks (e.g., email spam detection) and regression tasks (e.g., predicting house prices).
        </p>
        <p>
          <strong>Unsupervised Learning:</strong>
          <br />
          <strong>Definition:</strong> A type of machine learning where the model is trained on unlabeled data. The objective is to find hidden patterns or intrinsic structures within the data.
          <br />
          <strong>Use Cases:</strong> Often used in clustering tasks (e.g., customer segmentation) and dimensionality reduction techniques (e.g., Principal Component Analysis).
        </p>
        <h4 className="mt-2">Machine Learning Algorithms</h4>
        <p>
          <strong>Decision Trees:</strong>
          <br />
          Definition: A tree-like model used for classification and regression tasks. It splits the data into branches based on feature values, leading to decision nodes and leaf nodes that represent outcomes.
        </p>
        <p>
          <strong>K-Nearest Neighbors (KNN):</strong>
          <br />
          Definition: A simple, non-parametric algorithm used for classification and regression. It classifies a data point based on how its neighbors are classified, determining the majority class among the k nearest neighbors.
        </p>
        <p>
          <strong>Support Vector Machines (SVM):</strong>
          <br />
          Definition: A powerful classification algorithm that finds the hyperplane that best separates different classes in the feature space. SVM is effective in high-dimensional spaces.
        </p>
        <h4 className="mt-2">Model Evaluation and Improvement</h4>
        <p>
          <strong>Evaluation Techniques:</strong>
          <br />
          <strong>Accuracy:</strong> The proportion of true results (both true positives and true negatives) among the total number of cases examined.
          <br />
          <strong>Precision:</strong> The ratio of true positives to the sum of true positives and false positives, indicating the accuracy of the positive predictions.
          <br />
          <strong>Recall (Sensitivity):</strong> The ratio of true positives to the sum of true positives and false negatives, measuring the model's ability to identify all relevant instances.
          <br />
          <strong>F1-Score:</strong> The harmonic mean of precision and recall, providing a single metric that balances both concerns.
        </p>
        <p>
          <strong>Improvement Strategies:</strong> Techniques like hyperparameter tuning, cross-validation, and feature engineering to enhance model performance.
        </p>
        <h4 className="mt-2">Practical Application</h4>
        <p>
          <strong>Project:</strong> Build a simple machine learning model using a dataset of your choice (e.g., Titanic survival data or Iris flower dataset) to apply your knowledge.
        </p>
        
      </div>
    </div>
  );
};

export default Material;
