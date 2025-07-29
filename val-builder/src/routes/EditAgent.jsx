import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import AgentForm from '../components/AgentForm';

const EditAgent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loadout, setLoadout] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchLoadout();
    }, [id]);

    async function fetchLoadout() {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('loadouts')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching loadout:', error);
            alert(`Error: ${error.message}`);
            navigate('/');
        } else {
            setLoadout(data);
        }
        setIsLoading(false);
    }

    async function handleUpdate(values) {
        console.log('Updating loadout with:', values);
        
        const { data, error } = await supabase
            .from('loadouts')
            .update({
                ...values,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Error updating loadout:', error);
            alert(`Error: ${error.message}`);
            return;
        }

        console.log('Updated loadout:', data);
        navigate(`/${id}`); // Go back to detail page
    }

    async function handleDelete() {
        if (!confirm(`Are you sure you want to delete ${loadout.player_name}'s loadout? This action cannot be undone.`)) {
            return;
        }

        console.log('Deleting loadout:', id);

        const { error } = await supabase
            .from('loadouts')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting loadout:', error);
            alert(`Error: ${error.message}`);
            return;
        }

        console.log('Deleted loadout successfully');
        navigate('/'); // Go back to summary page
    }

    if (isLoading) {
        return <div>Loading loadout for editing...</div>;
    }

    if (!loadout) {
        return <div>Loadout not found</div>;
    }

    return (
        <div className="detail-container">
            <div className="detail-card">
                <h2 className="detail-title">Edit {loadout.player_name}'s Loadout</h2>
                
                <AgentForm 
                    onSubmit={handleUpdate} 
                    initial={loadout} 
                />
                
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <button 
                        onClick={handleDelete} 
                        className="delete-button"
                    >
                        Delete Loadout
                    </button>
                </div>
                
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <button 
                        onClick={() => navigate(`/${id}`)} 
                        className="secondary-button"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditAgent;
