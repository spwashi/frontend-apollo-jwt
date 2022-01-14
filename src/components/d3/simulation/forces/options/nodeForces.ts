import {ForceCallbackParams} from '../types';
import {forceManyBody} from 'd3';
import {NodeDatum} from '../../../data/components/nodes/types';

export function nodeForces({forces, simulation}: ForceCallbackParams) {
    {
        const nodeForceStrength = forces.options.nodeCharge || 0;
        if (nodeForceStrength) {
            simulation = simulation
                .force('charge', forceManyBody<NodeDatum>()
                    .strength((d: NodeDatum) => (d?.forces?.electronegativity ?? 1) * nodeForceStrength/2));
        }
    }
    return simulation;
}