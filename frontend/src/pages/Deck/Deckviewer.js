import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import './deckviewer.css';
import { Mousewheel } from "swiper/modules";

const DeckViewer = () => {
   
    const { deckId, title } = useParams();  
    console.log(title);
    
    const [flashcards, setflashcards] = useState([]);

    const [loading, setLoading] = useState(true);

    const [progress, setProgress] = useState({ correct: 0, wrong: 0 });


    useEffect(() => {
        const fetchCards = async() => {
            
            try {
                const response = await fetch(
                    `http://localhost:5000/api/users/deck/${deckId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include",

                    }
                );


                if (!response.ok) {
                    console.log("Authentication failed");
                    setflashcards([]);   // just clear user
                    return;
                }
                const data = await response.json();

                // Now check if the JSON has an _id (your user object)
                if (!data || !data.success) {
                    console.warn("cant find the deck:", data);
                    setflashcards([]);
                    return;
                }
                console.log(data);
                setflashcards(data.flashcards);
                

            }
            catch (err) {

                console.log("profile load error", err);

            }
            finally {
                setLoading(false);
            }
        };
        fetchCards();

    }, [deckId])


    // Initialize Swiper after the component mounts
    useEffect(() => {
        if (window.Swiper && flashcards.length > 0) {
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
    }, [flashcards]);

    if (loading) return <p>Loading...</p>;
     

    return (
        <div className="cards-container">
           
            {flashcards && flashcards.length > 0 ? (
                <h3>flashcards.title</h3>) : (
               <h3> </h3>
            ) }
            
            <div className="swiper">
                <div className="swiper-wrapper"> 
                      
                    {flashcards && flashcards.length > 0 ? (
                        flashcards.map((card) => (
                            <div key={card._id} className="swiper-slide">
                            <h2>{card.question}</h2>
                            <p>{card.answer}</p>
                    </div>
                        ))
                    ) : (
                        <p>No flashcards yet.</p>
                    )}

                </div>
                {/* Navigation buttons */}
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </div>

            
            
        </div>
    )
};
export default DeckViewer;