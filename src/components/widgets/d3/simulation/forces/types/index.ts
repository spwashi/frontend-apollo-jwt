import {Simulation} from 'd3';
import {NodeDatum} from '../../../data/components/nodes/types';
import {SimulationData} from '../../../data/types';
import {EdgeDatum} from '../../../data/components/edges/types';

type NumberRange = { max: number, min: number };

export type BoundingForceConfig = {
    width: number;
    height: number;
    x: NumberRange,
    y: NumberRange,
    option: number
};

export interface ForceConfiguration {
    key: any,
    options: {
        center?: number;
        internal?: boolean;
        nodeCharge?: number;
        edgeStrength?: number;
        velocityDecay?: number;
        bounding?: BoundingForceConfig
    };
    forces: Force[]
}

export interface ForceCallbackParams {
    forces  : ForceConfiguration;
    data: SimulationData;
    simulation: Simulation<NodeDatum, EdgeDatum>;
}

export type Force = (params: ForceCallbackParams) => Simulation<NodeDatum, undefined>;