const topBarStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "5vh",
  width: "100vw",
  backgroundColor: "#242424",
  boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.5)",
  position: "relative",
};

const dividerText: React.CSSProperties = {
    margin: "auto"
}

interface DividerProps {
  section: string;
}

const Divider: React.FC<DividerProps> = ({section}) => {
  return <div style={topBarStyle}>
    <p style={dividerText}>{section}</p>
  </div>;
};

export default Divider;
