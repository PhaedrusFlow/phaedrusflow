// Kyber/ML-KEM visualization using D3.js with Alice and Bob
const svg = d3.select("#visualization")
  .append("svg")
  .attr("width", 960)
  .attr("height", 600);

  {id: "alice", name: "Alice", x: 150, y: 150},
  {id: "bob", name: "Bob", x: 800, y: 450}
];

const nodes = [
  {id: "aliceKeyGen", label: "KeyGen()", x: 150, y: 250, type: "process", owner: "alice"},
  {id: "alicePubKey", label: "Public Key (pk)", x: 300, y: 200, type: "key", owner: "alice"},
  {id: "alicePrivKey", label: "Private Key (sk)", x: 150, y: 350, type: "key", owner: "alice"},
  {id: "bobEncap", label: "Encapsulate(pk)", x: 600, y: 350, type: "process", owner: "bob"},
  {id: "bobCiphertext", label: "Ciphertext (ct)", x: 450, y: 400, type: "data", owner: "bob"},
  {id: "bobSharedSecret", label: "Shared Secret (ss)", x: 750, y: 350, type: "secret", owner: "bob"},
  {id: "aliceDecap", label: "Decapsulate(sk, ct)", x: 300, y: 450, type: "process", owner: "alice"},
  {id: "aliceSharedSecret", label: "Shared Secret (ss)", x: 150, y: 500, type: "secret", owner: "alice"}
];

// Define links between nodes as message exchanges
const links = [
  {source: "aliceKeyGen", target: "alicePubKey", label: "1. Generate key pair"},
  {source: "aliceKeyGen", target: "alicePrivKey", label: "1. Generate key pair"},
  {source: "alicePubKey", target: "bobEncap", label: "2. Send public key", animate: true},
  {source: "bobEncap", target: "bobCiphertext", label: "3. Generate ciphertext"},
  {source: "bobEncap", target: "bobSharedSecret", label: "3. Derive shared secret"},
  {source: "bobCiphertext", target: "aliceDecap", label: "4. Send ciphertext", animate: true},
  {source: "alicePrivKey", target: "aliceDecap", label: "5. Use private key"},
  {source: "aliceDecap", target: "aliceSharedSecret", label: "5. Recover same shared secret"}
];

const characterGroups = svg.selectAll(".character")
  .data(characters)
  .enter()
  .append("g")
  .attr("class", "character")
  .attr("transform", d => `translate(${d.x},${d.y})`);

characterGroups.append("circle")
  .attr("r", 50)
  .attr("fill", d => d.id === "alice" ? "#f9a8d4" : "#93c5fd")
  .attr("stroke", "#000")
  .attr("stroke-width", 2);

characterGroups.append("text")
  .attr("text-anchor", "middle")
  .attr("dy", ".35em")
  .text(d => d.name)
  .attr("fill", "#000")
  .style("font-size", "18px")
  .style("font-weight", "bold");

svg.selectAll(".link")
  .data(links)
  .enter()
  .append("path")
  .attr("class", d => `link ${d.animate ? "animated-link" : ""}`)
  .attr("id", d => `link-${d.source}-${d.target}`)
  .attr("d", d => {
    const sourceNode = nodes.find(node => node.id === d.source);
    const targetNode = nodes.find(node => node.id === d.target);
    return `M${sourceNode.x},${sourceNode.y}L${targetNode.x},${targetNode.y}`;
  })
  .attr("stroke", d => d.animate ? "#ff5500" : "#999")
  .attr("stroke-width", 2)
  .attr("stroke-dasharray", d => d.animate ? "10,5" : "none");

svg.selectAll(".link-label")
  .data(links)
  .enter()
  .append("text")
  .attr("class", "link-label")
  .attr("x", d => {
    const sourceNode = nodes.find(node => node.id === d.source);
    const targetNode = nodes.find(node => node.id === d.target);
    return (sourceNode.x + targetNode.x) / 2;
  })
  .attr("y", d => {
    const sourceNode = nodes.find(node => node.id === d.source);
    const targetNode = nodes.find(node => node.id === d.target);
    return (sourceNode.y + targetNode.y) / 2 - 10;
  })
  .text(d => d.label)
  .attr("text-anchor", "middle")
  .attr("fill", "#000")
  .attr("background", "#fff")
  .style("font-size", "12px");

const nodeGroups = svg.selectAll(".node")
  .data(nodes)
  .enter()
  .append("g")
  .attr("class", "node")
  .attr("transform", d => `translate(${d.x},${d.y})`);

nodeGroups.append("circle")
  .attr("r", 30)
  .attr("fill", d => {
    const ownerColor = d.owner === "alice" ? 0 : 120; // Hue: 0 for Alice (red), 120 for Bob (green)
    const typeOpacity = {
      "process": 0.7,
      "key": 0.9,
      "data": 0.6,
      "secret": 1.0
    };
    return `hsla(${ownerColor}, 100%, 50%, ${typeOpacity[d.type]})`;
  })
  .attr("stroke", "#333")
  .attr("stroke-width", 1);

nodeGroups.append("text")
  .attr("text-anchor", "middle")
  .attr("dy", ".35em")
  .text(d => d.label)
  .attr("fill", "white")
  .style("font-size", "10px");

nodeGroups.append("title")
  .text(d => `${d.label} (${d.owner === "alice" ? "Alice" : "Bob"})`);

  .append("animate")
  .attr("attributeName", "stroke-dashoffset")
  .attr("values", "0;15")
  .attr("dur", "1s")
  .attr("repeatCount", "indefinite");

svg.append("text")
  .attr("x", 480)
  .attr("y", 50)
  .attr("text-anchor", "middle")
  .text("ML-KEM Key Exchange Between Alice and Bob")
  .style("font-size", "20px")
  .style("font-weight", "bold");

svg.append("text")
  .attr("x", 480)
  .attr("y", 80)
  .attr("text-anchor", "middle")
  .text("Post-Quantum Cryptography for Secure Communication")
  .style("font-size", "16px");

const legend = svg.append("g")
  .attr("transform", "translate(750, 100)");

const legendItems = [
  {color: "hsla(0, 100%, 50%, 0.9)", label: "Alice's Keys"},
  {color: "hsla(120, 100%, 50%, 0.9)", label: "Bob's Keys"},
  {color: "hsla(0, 100%, 50%, 1.0)", label: "Alice's Secret"},
  {color: "hsla(120, 100%, 50%, 1.0)", label: "Bob's Secret"}
];

legend.selectAll("rect")
  .data(legendItems)
  .enter()
  .append("rect")
  .attr("x", 0)
  .attr("y", (d, i) => i * 25)
  .attr("width", 15)
  .attr("height", 15)
  .attr("fill", d => d.color);

legend.selectAll("text")
  .data(legendItems)
  .enter()
  .append("text")
  .attr("x", 25)
  .attr("y", (d, i) => i * 25 + 12)
  .text(d => d.label)
  .style("font-size", "12px");

