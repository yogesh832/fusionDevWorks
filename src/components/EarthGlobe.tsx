import { FC, useRef, useMemo } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping, Vector3 } from "three";

const EarthGlobe: FC = () => {
  const globeRef = useRef<any>(null);

  // Create refs for orbiting dots
  const dotRefs = useRef<any[]>([]);

  const logoTexture = useLoader(
    TextureLoader,
    "https://fusiondevworks.com/lovable-uploads/78f498c2-7f04-4dac-853b-5c006f3941c4.png"
  );

  // Tile the logo texture
  logoTexture.wrapS = RepeatWrapping;
  logoTexture.wrapT = RepeatWrapping;
  logoTexture.repeat.set(6, 3);

  // Generate data for multiple orbiting dots
  const dots = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 30; i++) {
      temp.push({
        radius: 2 + Math.random() * 1.5,     // distance from globe center
        speed: 0.2 + Math.random(),          // orbit speed
        yOffset: -0.5 + Math.random(),       // vertical offset
        phase: Math.random() * Math.PI * 2,  // initial angle
      });
    }
    return temp;
  }, []);

  useFrame(({ clock }) => {
    // Rotate globe
    if (globeRef.current) globeRef.current.rotation.y += 0.003;

    // Animate dots
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      const { radius, speed, yOffset, phase } = dots[i];
      const t = clock.getElapsedTime() * speed + phase;
      dot.position.set(
        radius * Math.cos(t),
        yOffset * Math.sin(t * 2), // slight vertical motion
        radius * Math.sin(t)
      );
    });
  });

  return (
    <>
      {/* Globe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          map={logoTexture}
          metalness={0.4}
          roughness={0.4}
        />
      </mesh>

      {/* Orbiting dots */}
      {dots.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (dotRefs.current[i] = el)}
        >
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial
            emissive="#ff6b6b"
            emissiveIntensity={2}
            color="#ff6b6b"
          />
        </mesh>
      ))}
    </>
  );
};

export default EarthGlobe;
