import { supabase } from '../client';
import AgentForm from '../components/AgentForm';
import { useNavigate } from 'react-router-dom';

const CreateAgent = () =>{
    const navigate = useNavigate();
    async function handleCreate(values){
        console.log('Creating loadout with:', values);
        const {data, error} = await supabase
            .from('loadouts')
            .insert([{
                ...values
            }])
            .select()
            .single();
        
            if (error){
                console.error('Error creating loadout:', error);
                alert(`Error: ${error.message}`);
                return;
            }
            console.log('Created loadout:', data);
            navigate('/');
    }
    return(
        <div>
            <h2>Create New Agent</h2>
            <AgentForm onSubmit={handleCreate}/>
        </div>
    );
 };

export default CreateAgent;