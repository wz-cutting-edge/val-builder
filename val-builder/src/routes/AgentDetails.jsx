import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const AgentDetails = () => {
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

    if (isLoading) {
        return <div>Loading loadout details...</div>;
    }

    if (!loadout) {
        return <div>Loadout not found</div>;
    }

    return (
        <div className="detail-container">
            <div className="detail-card">
                <h2 className="detail-title">
                    {loadout.player_name}'s Loadout
                </h2>
                
                <div className="detail-grid">
                    <div className="detail-item">
                        <h3>Agent</h3>
                        <p>{loadout.agent}</p>
                    </div>

                    <div className="detail-item">
                        <h3>Primary Weapon</h3>
                        <p>{loadout.primary_weapon}</p>
                    </div>

                    <div className="detail-item">
                        <h3>Secondary Weapon</h3>
                        <p>{loadout.secondary_weapon}</p>
                    </div>
                </div>

                <div className="detail-info">
                    <h3>Loadout Information</h3>
                    <p><strong>Created:</strong> {new Date(loadout.created_at).toLocaleString()}</p>
                    <p><strong>Last Updated:</strong> {new Date(loadout.updated_at).toLocaleString()}</p>
                    <p><strong>Loadout ID:</strong> {loadout.id}</p>
                </div>

                <div className="detail-actions">
                    <Link to={`/${loadout.id}/edit`} className="primary-button">
                        Edit Loadout
                    </Link>
                    
                    <Link to="/" className="secondary-button">
                        Back to All Loadouts
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AgentDetails;
