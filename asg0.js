function main() {
    let canvas = document.getElementById("canvas");
    g = canvas.getContext("2d");
  
    g.translate(200, 200);
    g.scale(1, -1);
  }
  
  function clearCanvas() {
    g.clearRect(-200, -200, 400, 400);
  }
  
  function drawVector(v, color) {
    g.beginPath();
    g.moveTo(0, 0);
    g.lineTo(v.elements[0] * 20, v.elements[1] * 20);
    g.strokeStyle = color;
    g.stroke();
  }
  
  function handleDrawEvent() {
    clearCanvas();
  
    let v1 = new Vector3([
      parseFloat(document.getElementById("v1x").value),
      parseFloat(document.getElementById("v1y").value),
      0,
    ]);
    let v2 = new Vector3([
      parseFloat(document.getElementById("v2x").value),
      parseFloat(document.getElementById("v2y").value),
      0,
    ]);
  
    drawVector(v1, "red");
    drawVector(v2, "blue");
  }
  
  function handleDrawOperationEvent() {
    clearCanvas();
  
    const x1 = parseFloat(document.getElementById("v1x").value);
    const y1 = parseFloat(document.getElementById("v1y").value);
    const x2 = parseFloat(document.getElementById("v2x").value);
    const y2 = parseFloat(document.getElementById("v2y").value);
    const scalar = parseFloat(document.getElementById("scalar").value);
    const op = document.getElementById("operation").value;
  
    const v1 = new Vector3([x1, y1, 0]);
    const v2 = new Vector3([x2, y2, 0]);
  
    drawVector(v1, "red");
    drawVector(v2, "blue");
  
    let v3, v4;
  
    if (op === "add") {
      v3 = new Vector3(v1.elements);
      v3.add(v2);
      drawVector(v3, "green");
  
    } else if (op === "sub") {
      v3 = new Vector3(v1.elements);
      v3.sub(v2);
      drawVector(v3, "green");
  
    } else if (op === "mul") {
      if (isNaN(scalar)) {
        alert("Please enter a scalar value for multiplication.");
        return;
      }
      v3 = new Vector3(v1.elements);
      v4 = new Vector3(v2.elements);
      v3.mul(scalar);
      v4.mul(scalar);
      drawVector(v3, "green");
      drawVector(v4, "green");
  
    } else if (op === "div") {
      if (isNaN(scalar)) {
        alert("Please enter a scalar value for division.");
        return;
      }
      if (scalar === 0) {
        alert("Cannot divide by 0!");
        return;
      }
      v3 = new Vector3(v1.elements);
      v4 = new Vector3(v2.elements);
      v3.div(scalar);
      v4.div(scalar);
      drawVector(v3, "green");
      drawVector(v4, "green");
  
    } else if (op === "magnitude") {
      console.log("Magnitude of v1:", v1.magnitude().toFixed(2));
      console.log("Magnitude of v2:", v2.magnitude().toFixed(2));
  
    } else if (op === "normalize") {
      v3 = new Vector3(v1.elements);
      v4 = new Vector3(v2.elements);
      v3.normalize();
      v4.normalize();
      drawVector(v3, "green");
      drawVector(v4, "green");
  
    } else if (op === "angle") {
      const dot = Vector3.dot(v1, v2);
      const mag1 = v1.magnitude();
      const mag2 = v2.magnitude();
  
      if (mag1 === 0 || mag2 === 0) {
        console.log("Angle: undefined (one of the vectors is 0)");
        return;
      }
  
      let cosTheta = dot / (mag1 * mag2);
      cosTheta = Math.max(-1, Math.min(1, cosTheta));
      const angleRad = Math.acos(cosTheta);
      const angleDeg = angleRad * (180 / Math.PI);
  
      console.log("Angle:", angleDeg.toFixed(2));
  
    } else if (op === "area") {
      const cross = Vector3.cross(v1, v2);
      const area = cross.magnitude() / 2;
      console.log("Area of the triangle:", area.toFixed(2));
    }
  }
  
  main();
  