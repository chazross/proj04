import React, { useState, useEffect } from 'react';
import './insert.css';

function Insert() {
    const [questionText, setQuestionText] = useState('');
    const [answer, setAnswer] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state for category fetching

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3000/categories');
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data.categories || []);
                } else {
                    console.error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchCategories();
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoryId) {
            alert('Please choose a category');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question_text: questionText,
                    answer: answer,
                    category_id: categoryId,
                }),
            });
            if (response.ok) {
                alert('Question successfully added');
                setQuestionText('');
                setAnswer('');
                setCategoryId('');
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error submitting question:', error);
        }
    };

    return (
        <div className="insert-section">
            <h2 className="section-title">Create an Odd Book Question</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="I humbly invite you to pose your question within this space."
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Solution"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                />
                <div>
                    {loading ? (
                        <p>Loading categories...</p> // Show a loading message while categories are being fetched
                    ) : (
                        <select
                            className="category-select"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                        >
                            <option value="" disabled>
                                Kindly make your selection from the available categories.
                            </option>
                            {categories.map((category) => (
                                <option key={category.category_id} value={category.category_id}>
                                    {category.category_name}
                                </option>
                            ))}
                        </select>
                    )}
                    <button type="submit" className="add-question-button">
                        Submit your question
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Insert;
