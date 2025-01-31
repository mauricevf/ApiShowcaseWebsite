import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

function EditSong() {
    const { id } = useParams();  
    console.log(id);
    const [formData, setFormData] = useState({
        artist: '',
        song: '',
        album: '',
        genre: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch song data when component mounts or when id changes
    useEffect(() => {
        const fetchSongData = async () => {
            try {
                const response = await fetch(`http://145.24.223.71:8000/songs/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched song data:', data);
                    setFormData({
                        artist: data.artist || '',
                        song: data.song || '',
                        album: data.album || '',
                        genre: data.genre || '',
                    });
                } else {
                    console.error('Error fetching song data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchSongData();
    }, [id]);  // Refetch if the 'id' changes

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        console.log('Form Data being submitted:', formData);

        try {
            const response = await fetch(`http://145.24.223.71:8000/songs/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    artist: formData.artist,
                    song: formData.song,
                    album: formData.album,
                    genre: formData.genre,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Form submitted successfully:', data);
                window.location.href = '/';  // Redirect after successful submission
            } else {
                const errorData = await response.json();
                console.error('Error submitting form:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="artist">Artist:</label>
                    <input
                        type="text"
                        id="artist"
                        name="artist"
                        value={formData.artist || ''}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="song">Song:</label>
                    <input
                        type="text"
                        id="song"
                        name="song"
                        value={formData.song || ''}  
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="album">Album:</label>
                    <input
                        type="text"
                        id="album"
                        name="album"
                        value={formData.album || ''}  
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="genre">Genre:</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={formData.genre || ''}  
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">
                    {isSubmitting ? 'Verzenden...' : 'Verzenden'}
                </button>
                <button type="button" onClick={() => window.location.href = '/'}>
                    Back to Home
                </button>
            </form>
        </div>
    );
}

export default EditSong;
