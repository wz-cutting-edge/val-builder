import { useEffect, useState } from 'react';
import { supabase } from '../client';
import { Link } from 'react-router-dom';

const AgentSummary = () => {
    const [loadouts, setLoadouts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchLoadouts();
    }, []);

    async function fetchLoadouts() {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('loadouts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching loadouts:', error);
            alert(`Error: ${error.message}`);
        } else {
            setLoadouts(data || []);
        }
        setIsLoading(false);
    }

    return (
        <div className="summary-container">
            <div className="summary-header">
                <h2>All Agent Loadouts ({loadouts.length})</h2>
            </div>

            {loadouts.length === 0 ? (
                <div className="empty-state">
                    <p>No agent loadouts created yet.</p>
                    <Link to="/new" className="primary-button" style={{ display: 'inline-block' }}>
                        Create Your First Loadout
                    </Link>
                </div>
            ) : (
                <div className="loadouts-grid">
                    {loadouts.map(loadout => (
                        <div key={loadout.id} className="loadout-card">
                            <div className="loadout-card-header">
                                <div>
                                    <h3>
                                        <Link to={`/${loadout.id}`}>{loadout.player_name}</Link>
                                    </h3>
                                    <p className="loadout-info">
                                        <strong>Agent:</strong> {loadout.agent}<br />
                                        <strong>Primary:</strong> {loadout.primary_weapon}<br />
                                        <strong>Secondary:</strong> {loadout.secondary_weapon}
                                    </p>
                                    <p className="loadout-date">
                                        Created: {new Date(loadout.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <Link to={`/${loadout.id}/edit`} className="edit-button">Edit</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AgentSummary;
