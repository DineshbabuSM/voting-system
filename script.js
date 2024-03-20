const fetchPollingResult = async () => {
  const response = await fetch("https://voting-system-back-end.onrender.com/polling/pollingResult");
  const data = await response.json();
  displayResults(data);
  populatePartyOptions();
};

// Display voting results
function displayResults(results) {
  const table = document.createElement("table");
  const headerRow = table.insertRow();
  headerRow.innerHTML =
    "<th>Party Logo</th><th>Party Name</th><th>Party Id</th><th>Created on</th><th>Vote Count</th>";

  results.forEach((result) => {
    const row = table.insertRow();
    row.innerHTML = `<td> <img src=${result.PartyImage} style='border-radius:50%' height="60" width="60"> </td><td>${result.PartyName}</td><td>${result.PartyID}</td><td>${result.CreatedOn}</td><td>${result.totalVotes}</td>`;
  });

  document.getElementById("votingResults").appendChild(table);
}

// Populate party options for voting form
async function populatePartyOptions() {

    const partyList = await fetch("https://voting-system-back-end.onrender.com/partyList/party");
    const results = await partyList.json();
    
    const select = document.getElementById("party");

    results.forEach((result) => {
    const option = document.createElement("option");
    option.text = result.PartyName;
    option.value = result.PartyName;
    select.appendChild(option);
  });
}

// Handle party registration form submission
document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();
    // Collect form data
    const partyName = document.getElementById("partyName").value;
    const partyId = document.getElementById("partyId").value;
    const partyImage = document.getElementById("partyImage").value;

    let formData = {
      PartyName: partyName,
      PartyID: partyId,
      PartyImage: partyImage,
    };

    fetch("https://voting-system-back-end.onrender.com/partyList/partyRegister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          alert("Your party has registered successfully");
        } else {
          throw new Error(data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  });


// Handle polling form submission

const postPolling = () => {
  const partyName = document.getElementById("PartyName").value;
  const evId = document.getElementById("EvId").value;
  const votingId = document.getElementById("VotingId").value;

  let formData = {
    PartyName: partyName,
    VotingId: votingId,
    EVId: evId,
  };

  fetch("https://voting-system-back-end.onrender.com/polling", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.status === "success") {
        alert("Your vote has been casted successfully");
      } else {
        throw new Error(data.message);
      }
    })
    .catch((err) => {
      alert(err.message);
    });
};

document.getElementById("pollingForm").addEventListener("submit", function (event) {
    event.preventDefault();
    postPolling();
});

fetchPollingResult();
