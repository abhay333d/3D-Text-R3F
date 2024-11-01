import {
  Center,
  OrbitControls,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { useRef, useState } from "react";

export default function Experience() {
  const [torusGeometry, setTorusGeometry] = useState();
  const [Textmaterial, setTextMaterial] = useState();
  const [Donutmaterial, setDonutMaterial] = useState();

  // 36220C_C6C391_8C844A_8B7B4C
  // 515151_DCDCDC_B7B7B7_9B9B9B
  const [matCapTexture1] = useMatcapTexture("6D1616_E6CDBA_DE2B24_230F0F", 256);
  const [matCapTexture2] = useMatcapTexture("660505_F2B090_DD4D37_AA1914", 256);

  const donutsGroup = useRef();

  useFrame((state, delta) => {
    for (const donut of donutsGroup.current.children) {
      donut.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
      <meshMatcapMaterial ref={setTextMaterial} matcap={matCapTexture1} />
      <meshMatcapMaterial ref={setDonutMaterial} matcap={matCapTexture2} />

      <Center>
        <Text3D
          material={Textmaterial}
          font={"./fonts/helvetiker_regular.typeface.json"}
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Abhay Suresh Dandge
          {/* <meshMatcapMaterial matcap={matCapTexture} /> */}
        </Text3D>
      </Center>
      <group ref={donutsGroup}>
        {[...Array(200)].map((value, index) => (
          <mesh
            geometry={torusGeometry}
            material={Donutmaterial}
            key={index}
            position={[
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 15,
            ]}
            scale={0.2 + Math.random() * 0.2}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          />
        ))}
      </group>
    </>
  );
}
