import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [error, setError] = useState(''); 

    
    useEffect(() => { 
        const fetchCategories = async () => { //
            try {
                const response = await fetch('http://localhost:3003/allcategories');
                if (response.ok) {
              
                    const data = await response.json();
                    console.log(data)
                    setCategories(data || []);
                } else {
                    console.error('Failed to fetch categories');
                    setError(null)
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchCategories();
    }, []);

    const fetchQuestions = async (categoryId, categoryName) => {
        console.log(categoryId, categoryName);
        setError(null); // Reset any previous errors
        try {
            const response = await fetch(`http://localhost:3003/questions/category/${categoryId}`);
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                setQuestions(data || []);
                setSelectedCategory(categoryName);
            } else {
                setError(data.message || "Error fetching questions");
            }
        } catch (err) {
            setError("Failed to fetch questions. Please try again.");
        }
    };

    const deleteQuestion = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/questions/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setQuestions(questions.filter((question) => question.id !== id));
                setError('')
            } else {
                console.error('Failed to delete');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="dashboard">
            <h2>Good Day, User</h2>
            <p>Pick a topic.</p>
            <button className="logout-button" onClick={handleLogout}>Logout</button>

            <div className="categories">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <button
                            key={category.categoryID}
                            onClick={() => fetchQuestions(category.categoryID, category.categoryName)}
                            className="category-button"
                        >
                            {category.categoryName}
                        </button>
                    ))
                ) : (
                    <p>No categories available</p>
                )}
            </div>

            <div className="questions-section">
    {selectedCategory && <h3>Questions for {selectedCategory}</h3>}
    
    { questions.length > 0 ? (
        questions.map((question) => (
            <QuestionItem
                key={question.id}
                question={question}
                deleteQuestion={deleteQuestion}
            />
        ))
    ) : (
        <p>No questions added for this category.</p> // Display message if no questions
    )}
</div>
        </div>
    );
};

const QuestionItem = ({ question, deleteQuestion }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="question-item">
            <div className="question-header" onClick={toggleDropdown}>
                <p><strong>Q:</strong> {question.questionText}</p>
                <span>{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && (
                <div className="question-answer">
                    <p><strong>A:</strong> {question.answer}</p>
                    <button onClick={() => deleteQuestion(question.id)} className="delete-button">Delete</button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
