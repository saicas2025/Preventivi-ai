async function readFile() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) return alert("Carica un file!");

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(window.APP_CONFIG.BACKEND_URL + "/analyze", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  document.getElementById("risultato").innerText = JSON.stringify(data, null, 2);
}

async function calcola() {
  const body = {
    prezzoKg: document.getElementById("prezzoKg").value,
    prezzoOra: document.getElementById("prezzoOra").value,
    prezzoVerniciatura: document.getElementById("prezzoVerniciatura").value
  };

  const res = await fetch(window.APP_CONFIG.BACKEND_URL + "/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  document.getElementById("risultato").innerText = JSON.stringify(data, null, 2);
}

async function mandaMessaggio() {
  const msg = document.getElementById("chatInput").value;
  if (!msg) return;

  const res = await fetch(window.APP_CONFIG.BACKEND_URL + "/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg })
  });

  const data = await res.json();
  const chatOut = document.getElementById("chatOutput");
  chatOut.innerHTML += `<p><b>Tu:</b> ${msg}</p>`;
  chatOut.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;
}
