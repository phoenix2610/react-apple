const StudioLights = () => {
    return (
        <group>
            <spotLight
                angle={0.15}
                position={[-2, 10, 5]}
                intensity={Math.PI * 0.2}
                decay={0}
            />

            <spotLight
                angle={0.15}
                position={[0, -25, 15]}
                intensity={Math.PI * 0.2}
                decay={0}
            />

            <spotLight
                angle={0.15}
                position={[0, 15, 8]}
                intensity={Math.PI * 1}
                decay={0.1}
            />
        </group>
    )
}

export default StudioLights
