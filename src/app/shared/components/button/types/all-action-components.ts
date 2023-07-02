import { RemapToInstanceType } from '../../../types/remap-to-instance-type';
import { buttonActionTypes } from '../registrations';


export type AllActionComponents = RemapToInstanceType<typeof buttonActionTypes>;
