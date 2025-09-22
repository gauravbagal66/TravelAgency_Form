// Include SheetJS in HTML: <script src="https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js"></script>

window.onload = function() {
  const timestamp = Date.now();
  const travelerId = 'TRV' + timestamp.toString().slice(-6);
  document.getElementById('travelerId').value = travelerId;

  const today = new Date().toISOString().split('T')[0];
  document.getElementById('start').setAttribute('min', today);
  document.getElementById('return').setAttribute('min', today);
}

function generateExcel(travelerData) {
  const ws = XLSX.utils.json_to_sheet([travelerData]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "TravelRequest");
  XLSX.writeFile(wb, `${travelerData.TravellerID}.xlsx`);
}

document.getElementById("travelForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const travelerData = {
    TravellerID: document.getElementById("travelerId").value,
    Name: document.getElementById("name").value,
    Aadhar: document.getElementById("aadhar").value,
    TravelType: document.getElementById("type").value,
    From: document.getElementById("from").value,
    To: document.getElementById("to").value,
    TravelDate: document.getElementById("start").value,
    ReturnDate: document.getElementById("return").value,
    Purpose: document.getElementById("purpose").value
  };

  if (travelerData.ReturnDate < travelerData.TravelDate) {
    alert("Return Date cannot be earlier than Travel Date!");
    return;
  }

  // Generate Excel file
  generateExcel(travelerData);

  // Keep the previous mail body exactly as it was
  const subject = encodeURIComponent(`TravelRequest_${travelerData.TravelType}`);
  const body = encodeURIComponent(
    `Dear Travel Desk,\n\n` +
    `I would like to request approval for a ${travelerData.TravelType.toLowerCase()} business trip.\n\n` +
    `Traveller Name: ${travelerData.Name}\n` +
    `Aadhar Card Number: ${travelerData.Aadhar}\n` +
    `From Location: ${travelerData.From}\n` +
    `To Location: ${travelerData.To}\n` +
    `Travel Date: ${travelerData.TravelDate}\n` +
    `Return Date: ${travelerData.ReturnDate}\n` +
    `Purpose of Travel: ${travelerData.Purpose}\n\n` +
    `Kindly process this request and forward it for approval.\n\n` +
    `Thanks & Regards,\n${travelerData.Name}\nTraveller`
  );

  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=gauravbagal66@gmail.com&su=${subject}&body=${body}`;
  window.open(gmailLink, '_blank');

  // User manually attaches the Excel file
});
