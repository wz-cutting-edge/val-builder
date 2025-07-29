import { useEffect, useState } from 'react';
import { supabase } from '../client';
import { Link } from 'react-router-dom';

const AgentSummary = () =>{
    const [loadouts, setLoadouts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
        fetchLoadouts();
    },[]);

    async function fetchLoadouts() {
        setIsLoading(true);
        const {data, error} = await supabase
            .from('loadouts')
            .select('*')
            .order('created_at', {ascending:false});

        if (error) {
            console.error('Error fetching loadouts:', error);
            alert(`Error: ${error.message}`);
        } else {
            setLoadouts(data || []);
        }
        setIsLoading(false);
    }
    
    return(
        <div>
            <h2>All Agent Loadouts ({loadouts.length})</h2>
            
            {loadouts.length === 0 ? (
                <p>No loadouts created yet. <Link to="/new">Create your first one!</Link></p>
            ) : (
                <div>
                    {loadouts.map(loadout => (
                        <div key={loadout.id}>
                            <div>
                                <div>
                                    <h3>
                                        <Link to={`/${loadout.id}`}>{loadout.player_name}</Link>
                                    </h3>
                                    <p>
                                        <strong>Agent:</strong> {loadout.agent} | 
                                        <strong> Primary:</strong> {loadout.primary_weapon} | 
                                        <strong> Secondary:</strong> {loadout.secondary_weapon}
                                    </p>
                                    <p>
                                        Created: {new Date(loadout.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <Link to={`/${loadout.id}/edit`}>Edit</Link>
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