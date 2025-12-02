import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, useVideoTexture } from '@react-three/drei';
import { Model as Macbook14 } from './Macbook14';
import { Model as Macbook16 } from './Macbook16';
import useMacbookStore from './store';
import StudioLights from './studiolights';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

// Wrapper component to apply video texture to MacBook with smooth rotation
function MacbookWithTexture({ Model, scale, rotation, texture }) {
    const videoTexture = useVideoTexture(texture);
    const groupRef = useRef();
    const [logged, setLogged] = useState(false);
    const targetRotation = useRef(rotation);

    useEffect(() => {
        targetRotation.current = rotation;
    }, [rotation]);

    // Smooth interpolation of rotation
    useFrame(() => {
        if (groupRef.current) {
            // Lerp (linear interpolation) for smooth rotation
            groupRef.current.rotation.x = THREE.MathUtils.lerp(
                groupRef.current.rotation.x,
                targetRotation.current[0],
                0.1
            );
            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                targetRotation.current[1],
                0.1
            );
            groupRef.current.rotation.z = THREE.MathUtils.lerp(
                groupRef.current.rotation.z,
                targetRotation.current[2],
                0.1
            );
        }
    });

    useEffect(() => {
        if (groupRef.current && videoTexture) {
            // First, log ALL meshes and materials for debugging
            if (!logged) {
                console.log('=== DEBUGGING: ALL MACBOOK MESHES ===');
                groupRef.current.traverse((child) => {
                    if (child.isMesh) {
                        console.log('Mesh Name:', child.name, '| Material Name:', child.material?.name);
                    }
                });
                console.log('=== END MESH LIST ===');
                setLogged(true);
            }

            // Find the screen mesh and apply video texture
            groupRef.current.traverse((child) => {
                if (child.isMesh && child.material) {
                    const materialName = child.material.name || '';

                    // The screen uses this specific material
                    if (materialName === 'zhGRTuGrQoJflBD') {
                        console.log('✅ Applying texture to screen:', materialName);

                        // Clone material to avoid affecting other instances
                        child.material = child.material.clone();
                        child.material.map = videoTexture;
                        child.material.emissive = new THREE.Color(0xffffff);
                        child.material.emissiveMap = videoTexture;
                        child.material.emissiveIntensity = 1.5;
                        child.material.needsUpdate = true;
                    }
                }
            });
        }
    }, [videoTexture, logged]);

    return (
        <group ref={groupRef}>
            <Model scale={scale} />
        </group>
    );
}

const MacbookCanvas = ({ mode = 'product', rotation = [0, 0, 0] }) => {
    const { scale, texture } = useMacbookStore();
    const isFeatureMode = mode === 'features';

    // Choose which model to render based on scale
    const MacbookModel = scale === 0.06 ? Macbook14 : Macbook16;

    return (
        <Canvas frameloop="always" dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />

            {!isFeatureMode && (
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 2}
                    minDistance={5}
                    maxDistance={5}
                />
            )}

            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <spotLight position={[0, 5, 10]} angle={0.3} penumbra={1} intensity={1} />

            {isFeatureMode && texture ? (
                <MacbookWithTexture
                    Model={MacbookModel}
                    scale={scale}
                    rotation={rotation}
                    texture={texture}
                />
            ) : (
                <MacbookModel scale={scale} />
            )}

            <Environment preset="studio" />
            <StudioLights />
        </Canvas>
    );
};

export default MacbookCanvas;
