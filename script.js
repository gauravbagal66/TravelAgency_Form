// Auto-generate Traveller ID and set min dates
window.onload = function() {
  const timestamp = Date.now();
  const travelerId = 'TRV' + timestamp.toString().slice(-6);
  document.getElementById('travelerId').value = travelerId;

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

  if (ret < start) {
    alert("Return Date cannot be earlier than Travel Date!");
    return;
  }

  const subject = encodeURIComponent(`TravelRequest_${type}`);
  const body = encodeURIComponent(
    `Dear Travel Desk,\n\n` +
    `I would like to request approval for a ${type.toLowerCase()} travel.\n\n` +
    `Traveller ID: ${travelerId}\n` +
    `Traveller Name: ${name}\n` +
    `Aadhar Card Number: ${aadhar}\n` +
    `From Location: ${from}\n` +
    `To Location: ${to}\n` +
    `Travel Date: ${start}\n` +
    `Return Date: ${ret}\n` +
    `Purpose of Travel: ${purpose}\n\n` +
    `Kindly process this request and forward it for approval.\n\n` +
    `Thanks & Regards,\n${name}\nTraveller`
  );

  // Gmail compose link
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=gauravbagal66@gmail.com&su=${subject}&body=${body}`;
  window.open(gmailLink, '_blank');
});
