import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

function SongComponent() {
    const { id } = useParams();  
    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            if (!id) {
                console.error('No ID provided!');
                return;
            }

            try {
                const response = await fetch(`http://145.24.223.71:8000/songs/${id}`, { 
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setProduct(data);
                } else {
                    console.error('Error fetching the product:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        }

        fetchProduct();
    }, [id]); 

    return (
        <div>
            {product ? (
                <div>
                    <h1>{product.song}</h1> 
                    <p>Artist: {product.artist}</p>
                    <p>Album: {product.album}</p>
                    <p>Genre: {product.genre}</p>
                </div>
            ) : (
                <p>Loading product...</p>
            )}
            <div className="space-x-4">
                <button 
                    className="bg-red-500 text-white px-4 py-2 rounded" 
                    onClick={async () => {
                        try {
                            const response = await fetch(`http://145.24.223.71:8000/songs/${id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Accept': 'application/json',
                                }
                            });

                            if (response.ok) {
                                window.location.href = 'http://localhost:5173/';
                            } else {
                                console.error('Error deleting the product:', response.statusText);
                            }
                        } catch (error) {
                            console.error('Error deleting product:', error);
                        }
                    }}
                >
                    Delete
                </button>
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded" 
                    onClick={() => window.location.href = 'http://localhost:5173/'}
                >
                    Back to songs
                </button>
                <button 
                    className="bg-yellow-500 text-white px-4 py-2 rounded" 
                    onClick={() => window.location.href = `http://localhost:5173/songs/${id}/edit`}
                >
                    Edit
                </button>
            </div>
        </div>
    );
}

export default SongComponent;
