import { useState } from "react"
import { AGENTS, PRIMARY_WEAPON, SECONDARY_WEAPONS } from './valorant.js'


const AgentForm = ({onSubmit, initial = {} }) =>{
    const [values, setValues] =useState({
        player_name: initial.player_name || '',
        agent: initial.agent || AGENTS[0],
        pprimary_weapon: initial.primary_weapon || PRIMARY_WEAPONS[0],
        secondary_weapon: initial.secondary_weapon || SECONDARY_WEAPONS[0]
    });

    function handleChange(e) {
        setValues(v => ({...v, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(values);
    }

    return(
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px'}}>
            <div>
                <label htmlFor="player_name">Player Name (IGN)</label>
                <input
                    id="player_name"
                    name="player_name"
                    values={values.player_name}
                    onChange={handleChange}
                    placeholder="Enter your IGN"
                    required
                />
            </div>
            <div>
                <label htmlFor="agent">Agent:</label>
                <select
                    id="agent"
                    name="agent"
                    values={values.agent}
                    onChange={handleChange}
                >
                    {AGENTS.map(agent => (
                        <option key={agent} value={agent}>{agent}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="player_name">Primary Weapon:</label>
                <select
                    id="primary_weapon"
                    name="primary_weapon"
                    values={values.primary_weapon}
                    onChange={handleChange}
                >
                    {PRIMARY_WEAPONS.map(primary_weapon => (
                        <option key={primary_weapon} value={primary_weapon}>{primary_weapon}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="player_name">Secondary Weapon:</label>
                <select
                    id="secondary_weapon"
                    name="secondary_weapon"
                    values={values.secondary_weapon}
                    onChange={handleChange}
                >
                    {SECONDARY_WEAPONS.map(secondary_weapon => (
                        <option key={secondary_weapon} value={secondary_weapon}>{secondary_weapon}</option>
                    ))}
                </select>
            </div>

            <button type="submit">
                Save Loadout
            </button>
        </form>
    )
 }

export default AgentForm;