import background from "../assets/background/auth.jpg";

export default function BackgroundImage() {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        opacity: "0.2",
        height: "100vh",
        position: "fixed",
        zIndex: "-1",
        top: "0",
        bottom: "0",
        right: "0",
        left: "0",
      }}
    ></div>
  );
}
