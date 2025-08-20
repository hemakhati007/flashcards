
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './generateDeck.css'

const GenerateDeck = () => {

    const [generatedCards, setGeneratedCards] = useState([]);

    const [description, setDescription] = useState({
        title: "",
        prompt: "",
        count: "",
    });

    const [loading, setLoading] = useState(false);

    const navigate = new useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/users/generate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // if you need cookies/session
                    body: JSON.stringify(description),
                }
            );

            const data = await response.json();
           
            if (!response.ok) {
                setGeneratedCards([]);
                console.error("Failed to generate deck:", data.message || data);
            } else {
                console.log("Deck generated:", data);
                setGeneratedCards(data.flashcards);
                // optionally update your decks state to include new deck
            }

        } catch (err) {
            console.error("Error generating deck:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {

            const response = await fetch("http://localhost:5000/api/users/savedeck", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    title: description.title,
                    flashcards: generatedCards.map(fc => ({
                        question: fc.question,
                        answer: fc.answer
                    }))
                })
            });

            const savedDeck = await response.json();
            if (!response.ok) {
                console.error("Failed to save deck:", savedDeck.message || savedDeck);
            }
            else {
                console.log("Deck saved successfully:", savedDeck);
                // Optionally navigate to deck viewer:
                navigate(`/deck/${savedDeck.deck._id}`);
            }
        }
        catch (err) {
            console.error("Error saving deck:", err);
        }
      
    };
     // Initialize Swiper after the component mounts
        useEffect(() => {
            if (window.Swiper && generatedCards.length > 0) {
               new window.Swiper(".swiper", {
                    effect: "cards",
                    loop: false,
                    grabCursor: true,
                    initialSlide: 0,
                    mousewheel: {
                        invert:false,
                    },
                    // slidesPerView: 1,
                   // centeredSlides: true,
                    
                    
                    // Navigation buttons
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    },
    
                    // // Keyboard control
                    keyboard: {
                        enabled: true,
                        onlyInViewport: true,
                    },
    
                
                    
                });
    
                // return () => swiper.destroy(); // cleanup when component unmounts
            }
        }, [generatedCards]);
    
        // if (loading) return <p>Loading...</p>;


    const onChange = (e) => {
        setDescription({...description, [e.target.name]:e.target.value});
    }

    return (
        <div className='generate-container' /*onSubmit={onSubmit}*/>
            
            {generatedCards.length === 0 && (<h3 className='heading'>Generate Your Deck Of Card</h3>)}
            {/* {generatedCards.length > 0 && (<h3>preview of deck of card</h3>)} */}

            {/* Show form only if no cards have been generated yet */}
            {generatedCards.length === 0 && (
            <form className="form" onSubmit={handleSubmit}>
                    <input type="text" required placeholder="title" id="title" name="title"  value={description.title} onChange={onChange}  />
                <textarea
                    id="prompt"
                    name="prompt"
                    placeholder="Enter your prompt"
                    rows={3} // controls height
                    required
                    value={description.prompt} onChange={onChange} 
                />
                <input type="number" min={1} required placeholder="count" id="count" name="count" value={description.count} onChange={onChange}  />
                    <button type="submit" className='btn'>
                        {loading ? "Generating..." : "Generate"}
                    </button>
            </form>
            )}
            
            {/* Preview section */}
            {generatedCards && generatedCards.length > 0 && (
                <div className="deck-preview">
                    <h4 className='heading'>Preview Of Your Deck</h4>
                    <div className="swiper">
                        <div className="swiper-wrapper"> 
                    {generatedCards.map((card, index) => (
                        <div key={index} className="card-preview swiper-slide">
                            <p> {card.question}</p>
                            <p> {card.answer}</p>
                        </div>
                    ))}
                     </div>
                        {/* Navigation buttons */}
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-button-next"></div>
                    </div>

                    <button className='btn btn-success' onClick={handleSave}>Save</button>
                </div>
            )}

        </div>    
    )
}
export default GenerateDeck;