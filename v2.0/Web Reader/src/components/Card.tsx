import React, { useState} from "react";

const Card = () => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const imgSrc = "https://imgs.search.brave.com/P55Vfs4-fOjDsgRbW1XF8T0Ri_bTInZY_ikfI_FXo5g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9leHRl/cm5hbC1wcmV2aWV3/LnJlZGQuaXQvcmhT/LWIydm5hdUNxa1Bn/ejFZZG5Lb3pWeEFt/dzV0U3hSRHZLaGVu/UDJTOC5qcGc_YXV0/bz13ZWJwJnM9ZjEx/Zjc2MGYwM2U1NGEy/OTU2YWQ2YTI5NDYz/MGUzYTkwZmJhYzg1/OQ"


    const getThumbnailStyle = (id: string): React.CSSProperties => ({
        height: "280px",
        width: "200px",
        margin: "0",
        padding: "0",
        cursor: "pointer",
        boxShadow: "5px 7px 5px rgba(0, 0, 0, 0.5)",
        transform: hoveredId === id ? "scale(1.05)" : "scale(1)",
        filter: hoveredId === id ? 'grayscale(100%) blur(0.8px)' : 'none',
        transition: "transform 0.3s ease-in-out, filter 0.2s ease-in-out",
      });


    return (
        <>
        <img src={imgSrc} alt="" style={getThumbnailStyle("1")}
                        onMouseEnter={() => setHoveredId("1")}
                        onMouseLeave={() => setHoveredId(null)}></img>
        </>
    );
}
 
export default Card;