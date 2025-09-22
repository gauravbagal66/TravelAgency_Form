// Auto-generate Traveller ID on page load
window.onload = function() {
  // Generate Traveller ID
  const timestamp = Date.now();
  const travelerId = 'TRV' + timestamp.toString().slice(-6);
  document.getElementById('travelerId').value = travelerId;

  // Set min date for Travel Date (today)
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('start').setAttribute('min', today);
  document.getElementById('return').setAttribute('min', today);
}

// Form submission
document.getElementById("travelForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const travelerId = document.getElementById("travelerId").value;
  const type = document.getElementById("type").value;
  const name = document.getElementById("name").value;
  const aadhar = document.getElementById("aadhar").value;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const start = document.getElementById("start").value;
  const ret = document.getElementById("return").value;
  const purpose = document.getElementById("purpose").value;

  // Additional check: Return date >= Travel date
  if (ret < start) {
    alert("Return Date cannot be earlier than Travel Date!");
    return;
  }

  const subject = `TravelRequest_${type}`;
  const body = `Dear Travel Desk,%0D%0A%0D%0A` +
    `I would like to request approval for a ${type.toLowerCase()} travel.%0D%0A%0D%0A` +
    `Traveller ID: ${travelerId}%0D%0A` +
    `Traveller Name: ${name}%0D%0A` +
    `Aadhar Card Number: ${aadhar}%0D%0A` +
    `From Location: ${from}%0D%0A` +
    `To Location: ${to}%0D%0A` +
    `Travel Date: ${start}%0D%0A` +
    `Return Date: ${ret}%0D%0A` +
    `Purpose of Travel: ${purpose}%0D%0A%0D%0A` +
    `Kindly process this request and forward it for approval.%0D%0A%0D%0A` +
    `Thanks & Regards,%0D%0A${name}%0D%0ATraveller`;

  window.location.href = `mailto:gauravbagal66@gmail.com?subject=${subject}&body=${body}`;
});
