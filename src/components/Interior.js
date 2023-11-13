import FBXModel from './FBXModel';

const Interior = () => {

    return (
        <FBXModel path={'/models/InteriorTest.fbx'} position={[0, 0, 0]} scale={[1, 1, 1]} />
    );
}

export default Interior;