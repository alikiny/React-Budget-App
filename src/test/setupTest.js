/* To set up enzyme with jest, first download enzyme, 
enzyme-adapter-react-xx, enzyme-to-json.
Add the jest configuration file to the src root, and add --config="..."
in the package.json, jest test. Then include this setup file in the 
jest.config.json file .  */


/* Without setting  SnapshotSerializers in the jest.config.jfon file,
the shallow test we gonna use latter only return an empty
ShallowWrapper{} in the snapshot file*/

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
     adapter: new Adapter() 
});