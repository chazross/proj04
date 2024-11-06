import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => { 
        const fetchCategories = async () => { //
            try {
                const response = await fetch('http://localhost:3000/categories');
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data.categories || []);
                } else {
                    console.error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchCategories();
    }, []);

    const fetchQuestions = async (categoryId, categoryName) => {
        try {
            const response = await fetch(`http://localhost:3000/questions/by-category?categoryId=${categoryId}`);
            const data = await response.json();
            setQuestions(data.questions || []);
            setSelectedCategory(categoryName);
        } catch (error) {
            console.error('Error fetching questions:', error);
            setQuestions([]);
        }
    };

    const deleteQuestion = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/questions/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setQuestions(questions.filter((question) => question.question_id !== id));
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
                            key={category.category_id}
                            onClick={() => fetchQuestions(category.category_id, category.category_name)}
                            className="category-button"
                        >
                            {category.category_name}
                        </button>
                    ))
                ) : (
                    <p>No categories available</p>
                )}
            </div>

            <div className="questions-section">
                {selectedCategory && <h3>Questions for {selectedCategory}</h3>}
                {questions.map((question) => (
                    <QuestionItem key={question.question_id} question={question} deleteQuestion={deleteQuestion} />
                ))}
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
                <p><strong>Q:</strong> {question.question_text}</p>
                <span>{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && (
                <div className="question-answer">
                    <p><strong>A:</strong> {question.answer}</p>
                    <button onClick={() => deleteQuestion(question.question_id)} className="delete-button">Delete</button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
