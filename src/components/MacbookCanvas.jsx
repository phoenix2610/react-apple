import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Model as Macbook14 } from './Macbook14';
import { Model as Macbook16 } from './Macbook16';
import useMacbookStore from './store';
import StudioLights from './studiolights';

const MacbookCanvas = () => {
    const { scale } = useMacbookStore();

    // Choose which model to render based on scale
    const MacbookModel = scale === 0.06 ? Macbook14 : Macbook16;

    return (
        <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2}
                minDistance={5}
                maxDistance={5}
            />

            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={1} />

            <MacbookModel scale={scale} />

            <Environment preset="studio" />
            <StudioLights />
        </Canvas>
    );
};

export default MacbookCanvas;
